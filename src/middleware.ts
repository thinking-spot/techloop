import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/utils/supabase/middleware"
import { gateRequest } from "@/lib/launch-gate"
import { LAUNCH_MODE } from "@/lib/site-config"

export async function middleware(request: NextRequest) {
    // While in waitlist mode, rental-only pages send visitors to /waitlist and
    // the checkout API refuses to run. See lib/launch-gate.ts.
    const gate = gateRequest(request.nextUrl.pathname, LAUNCH_MODE)

    if (gate.action === "redirect") {
        const url = request.nextUrl.clone()
        url.pathname = gate.to
        url.search = ""
        // 307: temporary, because this flips when the site goes live.
        return NextResponse.redirect(url, 307)
    }

    if (gate.action === "unavailable") {
        return NextResponse.json(
            { error: "Rentals are not open yet. Join the waitlist at /waitlist." },
            { status: 503, headers: { "Retry-After": "86400" } }
        )
    }

    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
