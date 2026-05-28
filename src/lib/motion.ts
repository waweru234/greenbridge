// Lightweight local wrapper re-exporting the motion utilities used across the site.
// This avoids importing "framer-motion" directly in components and gives a single
// import path '@/lib/motion' used in multiple files.

export { motion } from "framer-motion";
export { useInView } from "framer-motion";
export { useMotionValue, animate } from "framer-motion";
export { useScroll, useTransform } from "framer-motion";
