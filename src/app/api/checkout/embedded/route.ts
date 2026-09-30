import { handleCheckoutRequest } from "@/lib/stripe-checkout";

// Embedded checkout. The body is { productId }; see lib/stripe-checkout.ts.
export function POST(request: Request) {
    return handleCheckoutRequest(request, true);
}
