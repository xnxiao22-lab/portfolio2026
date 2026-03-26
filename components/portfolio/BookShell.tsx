"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { PageId, PortfolioPage } from "./bookData";

interface BookShellProps {
  children: ReactNode;
  pages: PortfolioPage[];
  activeId: PageId;
  onChange: (id: PageId) => void;
  leftImageSrc?: string;
  leftCaption?: string;
}

export default function BookShell({
  children,
  pages,
  activeId,
  onChange,
  leftImageSrc,
  leftCaption,
}: BookShellProps) {
  const cinematicEase = [0.16, 1, 0.3, 1];
  
  const activeIndex = pages.findIndex((p) => p.id === activeId);
  const pageNumber = `第 0${activeIndex + 1 > 0 ? activeIndex + 1 : 1} 页`;

  return (
    <motion.div 
      initial={{ clipPath: "inset(-20% 50% -20% 50%)", opacity: 0, scale: 0.92, y: 30 }}
      animate={{ clipPath: "inset(-20% -10% -20% -10%)", opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.8, ease: cinematicEase }}
      className="relative w-[calc(94vw-80px)] max-w-[1520px] h-[88vh] min-h-[680px] mx-auto flex items-center justify-center"
    >
      {/* 封底 */}
      <div className="absolute inset-0 bg-[#e4e2dd] rounded-r-xl rounded-l-md shadow-[0_30px_60px_rgba(0,0,0,0.25)] border border-black/[0.03] z-0">
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/10 via-white/60 to-transparent rounded-l-md" />
      </div>

      {/* 书签 */}
      <div className="absolute top-[15%] left-full flex flex-col items-start z-0">
        {pages.map((page, index) => {
          const isActive = activeId === page.id;
          return (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.8, ease: cinematicEase }}
              className="relative transition-all duration-300"
              style={{
                marginTop: index === 0 ? "0px" : "-16px",
                zIndex: isActive ? 50 : pages.length - index,
                filter: isActive 
                  ? "drop-shadow(-4px 4px 12px rgba(0,0,0,0.5))" 
                  : "drop-shadow(0px -1px 1px rgba(255,255,255,0.12)) drop-shadow(0px 4px 6px rgba(0,0,0,0.6))"
              }}
            >
                            <motion.button
                onClick={() => onChange(page.id)}
                className={`min-h-[96px] py-5 flex items-center justify-center text-[12px] tracking-[0.2em] transition-all duration-300 ease-out ${
                  isActive 
                    ? "w-[56px] bg-[#3a3a3a] text-neutral-100" // 👈 宽度从 64px 缩小到 56px
                    : "w-[40px] bg-[#242424] text-neutral-500 hover:bg-[#2c2c2c]" // 👈 宽度从 48px 缩小到 40px
                }`}
                style={{ 
                  writingMode: "vertical-rl", 
                  textOrientation: "upright",
                  clipPath: "polygon(0 0, 100% 8px, 100% calc(100% - 8px), 0 100%)"
                }}
              >
                <span className="mr-1">{page.label}</span>
              </motion.button>

            </motion.div>
          );
        })}
      </div>

      {/* 内页 */}
      <div className="absolute top-2 bottom-2 left-2 right-3 bg-[#F9F8F6] rounded-r-lg rounded-l-sm flex z-10 shadow-inner overflow-hidden">
        
        <div className="absolute left-1/2 top-0 bottom-0 w-16 -ml-8 bg-gradient-to-r from-transparent via-black/[0.12] to-transparent pointer-events-none z-20" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/[0.08] z-20" />

        {/* 左页 */}
        <div className="w-1/2 h-full relative p-12 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.6, duration: 1.4, ease: cinematicEase }}
            className="w-full h-full flex flex-col justify-center items-center relative"
          >
            <div className="absolute top-0 left-0 text-[10px] tracking-widest text-neutral-400">晓晓</div>
            <div className="absolute top-0 right-0 text-[10px] tracking-widest text-neutral-400">2026/03</div>
            
            <div className="absolute bottom-0 left-0 text-[10px] tracking-widest text-neutral-400">{pageNumber}</div>
            <div className="absolute bottom-0 right-0 text-[10px] tracking-widest text-neutral-400">
              {leftCaption || "在哪里 想法 & 纸上会议"}
            </div>

            {leftImageSrc ? (
              // 🌟 核心修改区：票根样式容器
              // 1. 宽度变瘦 (w-[64%])，高度拉长 (h-[76%])
              // 2. 使用 drop-shadow 替代 box-shadow (因为 mask 会裁剪掉普通的 box-shadow)
              <div 
                className="relative w-[64%] h-[76%] flex-shrink-0 group"
                style={{ filter: "drop-shadow(0px 12px 24px rgba(0,0,0,0.08))" }}
              >
                {/* 遮罩层：利用径向渐变生成上下打孔的锯齿边缘 */}
                <div 
                  className="w-full h-full bg-white p-4 pb-14 flex flex-col relative transition-transform duration-700 ease-out group-hover:-translate-y-2"
                  style={{
                    WebkitMaskImage: `
                      radial-gradient(circle at 10px 0px, transparent 5px, black 5.5px),
                      radial-gradient(circle at 10px 100%, transparent 5px, black 5.5px),
                      linear-gradient(black, black)
                    `,
                    WebkitMaskSize: "20px 10px, 20px 10px, 100% calc(100% - 20px)",
                    WebkitMaskPosition: "top, bottom, center",
                    WebkitMaskRepeat: "repeat-x, repeat-x, no-repeat",
                    maskImage: `
                      radial-gradient(circle at 10px 0px, transparent 5px, black 5.5px),
                      radial-gradient(circle at 10px 100%, transparent 5px, black 5.5px),
                      linear-gradient(black, black)
                    `,
                    maskSize: "20px 10px, 20px 10px, 100% calc(100% - 20px)",
                    maskPosition: "top, bottom, center",
                    maskRepeat: "repeat-x, repeat-x, no-repeat",
                  }}
                >
                  {/* 内层图片容器：加了一圈极细的边框提升精致感 */}
                  <div className="w-full h-full border border-neutral-200/60 p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={leftImageSrc} 
                      alt="Left Page Content" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    />
                  </div>

                  {/* 票根底部装饰元素 */}
                  <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end border-t border-dashed border-neutral-300 pt-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[7px] font-mono text-neutral-400 tracking-[0.2em] uppercase">Date</span>
                      <span className="text-[9px] font-mono text-neutral-900 tracking-widest">2026.03</span>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                      <span className="text-[7px] font-mono text-neutral-400 tracking-[0.2em] uppercase">No.</span>
                      <span className="text-[9px] font-mono text-neutral-900 tracking-widest">00{activeIndex + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-[64%] h-[76%] border border-dashed border-neutral-300 flex items-center justify-center text-neutral-400 text-sm flex-shrink-0">
                [ Image Placeholder ]
              </div>
            )}
          </motion.div>
        </div>

        {/* 右页 */}
        <div className="w-1/2 h-full relative p-12 overflow-hidden bg-gradient-to-l from-[#F9F8F6] to-[#f4f3f0]">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 1.4, ease: cinematicEase }}
            className="w-full h-full relative"
          >
            <div className="absolute top-0 left-0 text-[10px] tracking-widest text-neutral-400 z-10">
              个人作品集
            </div>
            
            <div className="pt-16 h-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full absolute inset-0 pt-16"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
