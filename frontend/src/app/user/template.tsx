'use client';

import { motion } from 'motion/react';

/**
 * Templates remount on navigation, which gives each page a short fade-in as
 * it takes over — enough to feel continuous without delaying the content.
 */
export default function UserTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
