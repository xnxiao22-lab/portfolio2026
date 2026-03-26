"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import type { PageId, PortfolioPage } from "./bookData";

export default function MobileNav({
  pages,
  activeId,
  onChange,
}: {
  pages: PortfolioPage[];
  activeId: PageId;
  onChange: (id: PageId) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownId = useId();

  return (
    <div className="md:hidden absolute left-4 right-4 top-4 z-30">
      <div className="flex items-center justify-between rounded-2xl bg-[#f9f8f6]/70 px-3 py-2 shadow-sm ring-1 ring-black/10 backdrop-blur">
        <div className="min-w-0">
          <div className="text-sm font-sans text-[#333333]">导航</div>
          <div className="truncate text-xs text-[#333333]/80">
            当前：{pages.find((p) => p.id === activeId)?.label}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-[#f9f8f6]/90"
          aria-expanded={open}
          aria-controls={dropdownId}
        >
          <span className="sr-only">打开菜单</span>
          <div className="h-4 w-4 relative">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-[#333] rounded-full" />
            <div className="absolute left-0 top-1.5 h-[2px] w-full bg-[#333] rounded-full" />
            <div className="absolute left-0 top-3 h-[2px] w-full bg-[#333] rounded-full" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={dropdownId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="mt-2 rounded-2xl bg-[#f9f8f6] ring-1 ring-black/10 shadow-sm overflow-hidden"
          >
            {pages.map((p) => {
              const active = p.id === activeId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onChange(p.id);
                    setOpen(false);
                  }}
                  className={[
                    "w-full text-left px-4 py-3 border-b border-black/5 last:border-b-0",
                    active
                      ? "bg-[#333333] text-[#f9f8f6]"
                      : "bg-[#f9f8f6] text-[#333333] hover:bg-[#f3f2ee]",
                  ].join(" ")}
                >
                  <div className="font-serif text-base">{p.label}</div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

