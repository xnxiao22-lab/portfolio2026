"use client";

import { motion } from "framer-motion";

export default function HomeSection() {
  return (
    <motion.div 
      className="h-full flex flex-col justify-center pb-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* 主标题：统一字体、错落排版 */}
      <h1 className="text-4xl md:text-5xl font-serif leading-snug text-neutral-800 mb-16 tracking-wide">
        <span className="text-neutral-400 font-light">纸上创意与</span><br />
        灵感的交汇之处
      </h1>

      {/* 正文与引言对比布局 */}
      <div className="flex gap-12 items-start">
        <div className="max-w-[260px]">
          <p className="text-sm leading-relaxed text-neutral-500 mb-6">
            一个运用物理原理构建的数字空间。探索编辑设计与互动式网络体验之间的界限。
          </p>
          <p className="text-sm font-bold tracking-widest text-neutral-800">
            库存
          </p>
        </div>
        
        <p className="text-sm font-serif italic text-neutral-400 mt-1">
          形式，实质。
        </p>
      </div>
    </motion.div>
  );
}
