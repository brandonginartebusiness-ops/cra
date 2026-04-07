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
          style={{ pointerEvents: "none", backgroundColor: "#1a1a1f" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
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
            className="mt-6 w-72 h-[4px] bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
              onAnimationComplete={() => {
                setTimeout(() => setVisible(false), 120);
              }}
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)",
                boxShadow: "0 0 12px rgba(96,165,250,0.5), 0 0 24px rgba(37,99,235,0.4)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
