"use client";

import Image from "next/image";

type Project = {
  title: string;
  role: string;
  output: string[];
  detailImages: string[];
};

const project: Project = {
  title: "打开的书页：作品集系统",
  role: "视觉系统 / 版式与交互 / 前端实现",
  output: [
    "双页书本布局与滚动策略（左图固定 + 右文可滚动）",
    "页签导航与翻页式过渡动画",
    "组件化排版模板：标题、摘要、时间轴与卡片",
  ],
  detailImages: [
    "/images/project-detail-1.svg",
    "/images/project-detail-2.svg",
    "/images/project-detail-3.svg",
  ],
};

export default function ProjectsSection() {
  return (
    <div className="max-w-prose">
      <h2 className="font-serif text-[28px] md:text-[34px] text-[#333333]">
        精选项目
      </h2>

      <p className="mt-4 font-sans text-base leading-7 text-[#333333]/80">
        把“阅读感”做成交互系统：排版先行、动画克制、细节可追溯。
        下面是一个示例项目的结构占位内容（你可以替换成真实案例）。
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 bg-[#f3f1ea] p-5">
        <div className="font-serif text-xl text-[#333333]">{project.title}</div>
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

