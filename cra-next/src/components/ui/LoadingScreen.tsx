"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("cra_loaded");
    if (!seen) {
      sessionStorage.setItem("cra_loaded", "1");
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
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ pointerEvents: "none" }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand_assets/logo.png"
              alt="Claim Remedy Adjusters"
              style={{ height: 72, width: "auto" }}
            />
          </motion.div>

          {/* Progress bar — enlarged */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="mt-12 w-72 h-[4px] bg-[#e5e5e7] rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
              onAnimationComplete={() => {
                setTimeout(() => setVisible(false), 120);
              }}
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #3b82f6 0%, #0d9488 100%)",
                boxShadow: "0 0 12px rgba(59,130,246,0.5), 0 0 24px rgba(13,148,136,0.3)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
