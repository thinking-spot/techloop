import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = envFile.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
        acc[key.trim()] = value.replace(/['"]/g, '').trim();
    }
    return acc;
}, {});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const serviceRoleKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase URL or Service Role Key");
    process.exit(1);
}

async function revertFlatPricing() {
    console.log("Reverting all product prices to 4800 cents...");

    const response = await fetch(`${supabaseUrl}/rest/v1/products?monthly_price=eq.4200`, {
        method: 'PATCH',
        headers: {
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ monthly_price: 4800 })
    });

    if (!response.ok) {
        const err = await response.text();
        console.error("Error updating products:", err);
    } else {
        console.log(`Successfully updated products to 4800 cents.`);
    }
}

revertFlatPricing().catch(console.error);
