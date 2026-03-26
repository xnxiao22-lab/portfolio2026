"use client";

const skills = [
  "信息架构（IA）",
  "视觉系统与版式设计",
  "交互原型与可用性评估",
  "前端实现（Next.js / Tailwind）",
  "设计规范与组件化交付",
];

export default function AboutSection() {
  return (
    <div className="max-w-prose">
      <h2 className="font-serif text-[28px] md:text-[34px] text-[#333333]">
        关于我
      </h2>

      <p className="mt-4 font-sans text-base leading-7 text-[#333333]/80">
        我是一名同时关注“画面”和“系统”的设计师。我的工作习惯是先建立
        规则（版式网格、字体层级、交互状态），再用细节把规则“变得好看”，
        最终让作品能稳定地复用与扩展。
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 bg-[#f3f1ea] p-5">
        <div className="font-serif text-xl text-[#333333]">技能清单</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-black/10 bg-[#f9f8f6] px-3 py-1 text-xs font-sans text-[#333333]/80"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="font-serif text-xl text-[#333333]">工作方式</h3>
        <ol className="space-y-2 font-sans text-sm md:text-base text-[#333333]/80 list-decimal pl-5">
          <li>先写清楚目标与约束，然后做小范围验证。</li>
          <li>用组件化思维保证视觉一致性与开发协作效率。</li>
          <li>用动画和排版“引导注意力”，而不是堆叠效果。</li>
        </ol>
      </div>
    </div>
  );
}

