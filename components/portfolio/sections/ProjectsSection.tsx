"use client";

import Image from "next/image";

// 1. 在类型定义中新增了可选的 link 字段
type Project = {
  title: string;
  role: string;
  output: string[];
  detailImages: string[];
  link?: string; 
};

// 2. 我帮你把示例数据改成了 AI Earth，并加入了你的专属链接
const project: Project = {
  title: "AI Earth",
  role: "视觉系统 / 版式与交互 / 前端实现", // 你可以替换成你在 AI Earth 的真实角色
  output: [
    "双页书本布局与滚动策略（左图固定 + 右文可滚动）", // 这里记得替换成 AI Earth 的真实项目产出
    "页签导航与翻页式过渡动画",
    "组件化排版模板：标题、摘要、时间轴与卡片",
  ],
  detailImages: [
    "/images/project-detail-1.svg",
    "/images/project-detail-2.svg",
    "/images/project-detail-3.svg",
  ],
  link: "https://engine-aiearth.aliyun.com/#/", // 👈 你的 AI Earth 在线链接在这里
};

export default function ProjectsSection() {
  return (
    <div className="max-w-prose">
      <h2 className="font-serif text-[28px] md:text-[34px] text-[#333333]">
        精选项目
      </h2>

      <p className="mt-4 font-sans text-base leading-7 text-[#333333]/80">
        把“阅读感”做成交互系统：排版先行、动画克制、细节可追溯。
        下面是 AI Earth 项目的展示内容。
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 bg-[#f3f1ea] p-5">
        {/* 3. 在标题旁边增加了一个美观的在线体验按钮 */}
        <div className="flex items-center justify-between">
          <div className="font-serif text-xl text-[#333333]">{project.title}</div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1 font-sans text-sm text-[#333333] transition-colors hover:bg-black/5"
            >
              🌐 在线体验
            </a>
          )}
        </div>
        
        <div className="mt-1 font-sans text-sm text-[#333333]/80">
          角色：{project.role}
        </div>

        <ul className="mt-4 space-y-2 font-sans text-sm md:text-base text-[#333333]/80 list-disc pl-5">
          {project.output.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <div className="font-serif text-xl text-[#333333]">细节图（示例）</div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.detailImages.map((src, idx) => (
            <div
              key={src}
              className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#f9f8f6]"
            >
              <div className="relative h-[210px] md:h-[260px]">
                <Image
                  src={src}
                  alt={`项目细节 ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
