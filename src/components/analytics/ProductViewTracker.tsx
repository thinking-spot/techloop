"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires a product_view event once per page view. Renders nothing. */
export default function ProductViewTracker({ deviceId }: { deviceId: string }) {
    useEffect(() => {
        track("product_view", { device_id: deviceId });
    }, [deviceId]);

    return null;
}
