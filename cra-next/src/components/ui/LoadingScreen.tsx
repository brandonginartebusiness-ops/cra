"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("cra_loaded");
    if (!seen) {
      sessionStorage.setItem("cra_loaded", "1");
      // First-visit-only init; runs at most once per session.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ pointerEvents: "none", backgroundColor: "#1a1a2e" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src="/brand_assets/logo.png"
              alt="Claim Remedy Adjusters"
              width={240}
              height={72}
              style={{ height: 72, width: "auto" }}
              priority
            />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="mt-6 w-72 h-[4px] bg-white/15 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              onAnimationComplete={() => {
                setTimeout(() => setVisible(false), 50);
              }}
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #2563eb 0%, #0d9488 100%)",
                boxShadow: "0 0 12px rgba(37,99,235,0.4), 0 0 24px rgba(13,148,136,0.3)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
