"use client";

import { motion } from "framer-motion";
import type { PageId, PortfolioPage } from "./bookData";

export default function PageTabs({
  pages,
  activeId,
  onChange,
}: {
  pages: PortfolioPage[];
  activeId: PageId;
  onChange: (id: PageId) => void;
}) {
  return (
    <div className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-30 gap-2">
      <div className="flex flex-col gap-2">
        {pages.map((p) => {
          const active = p.id === activeId;
          return (
            <motion.button
              key={p.id}
              type="button"
              layout
              onClick={() => onChange(p.id)}
              animate={{ x: active ? 10 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={[
                "w-[46px] rounded-full border px-2 py-4 text-left shadow-sm transition-colors",
                active
                  ? "border-black/15 bg-[#333333] text-[#f9f8f6]"
                  : "border-black/10 bg-[#f9f8f6]/75 text-[#333333] hover:bg-[#f9f8f6]/95",
              ].join(" ")}
            >
              <div
                className="text-[11px] font-sans"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {p.label}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

