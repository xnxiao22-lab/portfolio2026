"use client";

const items = [
  {
    period: "2025 - 现在",
    title: "产品视觉与交互设计师（独立/团队）",
    desc: [
      "负责作品集与产品界面视觉系统搭建：字体层级、间距、组件规范。",
      "与前端协作落地：用可复用组件保证一致性与可维护性。",
      "推动交互细节：状态、反馈、过渡节奏与可用性优化。",
    ],
  },
  {
    period: "2023 - 2025",
    title: "UI/UX 设计（品牌与互联网产品）",
    desc: [
      "从用户需求出发完成信息架构与原型设计。",
      "构建版式与视觉语言，形成可扩展的设计规范。",
      "对关键页面进行迭代：可读性、层级与交互路径优化。",
    ],
  },
  {
    period: "2021 - 2023",
    title: "平面/版式设计（活动与出版）",
    desc: [
      "探索衬线/无衬线组合在长内容排版中的表现。",
      "以杂志风格进行网格与对齐规则的训练。",
      "将排版思想迁移到界面布局与组件层级。",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <div className="max-w-prose">
      <h2 className="font-serif text-[28px] md:text-[34px] text-[#333333]">
        工作经历
      </h2>
      <p className="mt-4 font-sans text-base leading-7 text-[#333333]/80">
        我更重视“经验如何转化为规则”：规则让团队更快对齐，细节让作品更有质感。
      </p>

      <div className="mt-8 relative pl-6">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-black/10" />
        <div className="space-y-8">
          {items.map((it, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-1.5 top-2 h-3.5 w-3.5 rounded-full bg-[#333333]" />
              <div className="font-sans text-xs md:text-sm text-[#333333]/70">
                {it.period}
              </div>
              <div className="mt-1 font-serif text-lg md:text-xl text-[#333333]">
                {it.title}
              </div>
              <ul className="mt-3 space-y-2 font-sans text-sm md:text-base text-[#333333]/80">
                {it.desc.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {idx !== items.length - 1 && (
                <div className="mt-6 h-px w-full bg-black/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

