'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

/** Hairline FAQ list — one panel open at a time, height animated. */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 text-left group"
            >
              <span
                className="text-base sm:text-lg font-semibold transition-colors duration-300"
                style={{ color: isOpen ? 'var(--primary-color)' : undefined }}
              >
                {item.question}
              </span>
              <span
                className="shrink-0 w-9 h-9 rounded-full border border-[var(--hairline-strong)] grid place-items-center transition-all duration-300 group-hover:border-[var(--primary-color)]"
                style={{
                  backgroundColor: isOpen ? 'var(--primary-color)' : 'transparent',
                  color: isOpen ? 'var(--text-on-primary)' : 'inherit',
                }}
              >
                <Plus
                  className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  aria-hidden="true"
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pr-12 text-sm sm:text-base leading-relaxed text-[var(--ink-muted)]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
