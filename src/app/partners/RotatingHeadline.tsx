"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PHRASES = [
    "Ecosystem-as-a-Service",
    "Distribution-as-a-Service",
    "Device-as-a-Service"
];

export default function RotatingHeadline() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % PHRASES.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="block h-[1.2em] overflow-hidden relative text-[#3DA9FC]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="block absolute top-0 left-0 right-0 w-full"
                >
                    {PHRASES[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
