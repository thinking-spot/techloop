// app/api/revalidate/route.ts
// Called by a Supabase Database Webhook when content is published.
// Set up: Supabase Dashboard → Database → Webhooks → create webhook
//   Table: content_job_pages (and repeat for device/blog tables)
//   Events: UPDATE (when published = true)
//   HTTP Method: POST
//   URL: https://trytechloop.com/api/revalidate
//   Headers: x-revalidation-secret: [your REVALIDATION_SECRET env var]
//
// This makes publish-to-live < 5 seconds, with no Vercel deploy required.

import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

const CONTENT_TYPE_PATHS: Record<string, (slug: string) => string> = {
  content_job_pages: (slug) => `/for/${slug}`,
  content_device_pages: (slug) => `/rent/${slug}`,
  content_blog_posts: (slug) => `/blog/${slug}`,
}

export async function POST(req: NextRequest) {
  // Validate secret
  const secret = req.headers.get('x-revalidation-secret')
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { table?: string; record?: { slug?: string; published?: boolean } }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { table, record } = body

  // Only revalidate published content
  if (!record?.published || !record?.slug || !table) {
    return Response.json({ skipped: true, reason: 'Not published or missing data' })
  }

  const pathFn = CONTENT_TYPE_PATHS[table]
  if (!pathFn) {
    return Response.json({ error: `Unknown table: ${table}` }, { status: 400 })
  }

  const path = pathFn(record.slug)
  revalidatePath(path)

  console.log(`[revalidate] ${path}`)

  return Response.json({
    revalidated: true,
    path,
    timestamp: new Date().toISOString(),
  })
}
