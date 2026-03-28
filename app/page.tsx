"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookShell from "@/components/portfolio/BookShell";
import { portfolioPages, PageId } from "@/components/portfolio/bookData";
import { useRouter } from "next/navigation"; // 👈 引入路由

// ==========================================
// 全局项目数据
// ==========================================
const projectsData = [
  { 
    name: "AI Scan 一体式三维扫描仪", 
    time: "2025 - 2026", 
    tags: "智能硬件 / 3D扫描", 
    form: "软硬一体化产品", 
    canvasRoute: "/projects/ai-scan", 
    images: [] 
  },
  { 
    name: "X800 Vision 扫描系统", 
    time: "2024 - 2025", 
    tags: "工业视觉 / 系统设计", 
    form: "桌面端软件", 
    canvasRoute: "/projects/x800", // 👈 新增路由
    images: [] // 👈 清空旧画廊图片
  },
  { 
    name: "AI Earth 任务流平台", 
    time: "2022 - 2024", 
    tags: "遥感AI / B端平台", 
    form: "Web端 SaaS", 
    link: "https://engine-aiearth.aliyun.com/#/", 
    canvasRoute: "/projects/ai-earth", // 👈 新增路由
    images: [] // 👈 清空旧画廊图片
  },
  { 
    name: "小蛮驴电力巡检系统", 
    time: "2021 - 2024", 
    tags: "自动驾驶 / 巡检系统", 
    form: "移动端 / 大屏中控", 
    canvasRoute: "/projects/xmanlv", // 👈 新增路由
    images: [] // 👈 清空旧画廊图片
  }
];


// ==========================================
// 🌟 核心交互组件：墨水印刷显现特效
// ==========================================
function InkRevealText({ line1, line2, line2Class = "", delay = 0 }: { line1: string, line2: string, line2Class?: string, delay?: number }) {
  const wipeVariants: any = {
    hidden: { clipPath: "inset(0 100% 0 0)", filter: "blur(4px)", opacity: 0 },
    visible: { 
      clipPath: "inset(0 0% 0 0)", 
      filter: "blur(0px)", 
      opacity: 1, 
      transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={{ visible: { transition: { staggerChildren: 0.3, delayChildren: delay } } } as any}
      className="cursor-default"
    >
      <motion.div variants={wipeVariants} whileHover={{ x: 4, transition: { duration: 0.4 } }} className="inline-block">
        {line1}
      </motion.div>
      <br />
      <motion.div variants={wipeVariants} whileHover={{ x: 4, transition: { duration: 0.4 } }} className={`inline-block ${line2Class}`}>
        {line2}
      </motion.div>
    </motion.div>
  );
}

// 1. 首页 (Home)
function HomePage() {
  return (
    <div className="flex flex-col h-full max-w-md relative">
      <div className="flex-1 flex flex-col justify-center -mt-[180px]">
        <div className="mb-14">
          <span className="block text-[9px] text-neutral-400 tracking-[0.4em] uppercase mb-6 font-mono">Qin Yangkai / @晓晓</span>
          <h1 className="text-[38px] md:text-[44px] font-light text-neutral-900 leading-[1.3] tracking-widest font-sans">
            <InkRevealText line1="解构复杂业务" line2="重塑数字体验" line2Class="text-neutral-400" delay={0.6} />
          </h1>
        </div>
        <div className="text-[11px] text-neutral-600 leading-[2] tracking-wide">
          <p className="max-w-[280px] text-justify">拥有逾 6 年全链路设计经验的交互与体验设计师。专注 B端平台、AI 产品体验与智能硬件。</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <div className="font-mono text-neutral-400 text-[10px] tracking-widest uppercase mb-4">Hangzhou</div>
        <div className="text-[9px] tracking-[0.3em] text-neutral-900 flex items-center gap-6 uppercase font-medium">
          <span className="w-8 h-[1px] bg-neutral-900"></span>
          交互设计 / 体验重塑 / 业务解构
        </div>
      </div>
    </div>
  );
}

// 2. 档案 (Profile)
function ProfilePage() {
  const skills = ["AI产品体验", "复杂B端", "多端协同", "设计系统&验证", "Figma", "AIGC", "Protopie", "Stitch", "Comfyui"];
  return (
    <div className="flex flex-col h-full relative">
      <div>
        <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-10">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-neutral-900 uppercase">个人档案 / PROFILE</h2>
          <span className="text-[9px] text-neutral-400 font-mono">01</span>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <div className="text-[8px] text-neutral-400 tracking-[0.3em] uppercase mb-4">基本信息 / Info</div>
            <div className="text-[11px] text-neutral-900 tracking-widest leading-[2]">
              <span className="font-mono">29</span> 岁<br/>山西晋城人<br/>现居 浙江杭州<br/>太原科技大学<br/>本科 工业设计
            </div>
          </div>
          <div>
            <div className="text-[8px] text-neutral-400 tracking-[0.3em] uppercase mb-4">日常轨迹 / Hobbies</div>
            <div className="text-[11px] text-neutral-900 tracking-widest leading-[2]">阅读<br/>跑步<br/>书写</div>
          </div>
          <div className="col-span-2">
            <div className="text-[8px] text-neutral-400 tracking-[0.3em] uppercase mb-4">综述 / Summary</div>
            <div className="text-[11px] text-neutral-600 tracking-wide leading-[2] max-w-[95%] text-justify">
              <p>一名工作经验超过 6 年的交互/体验设计师。擅长解构复杂业务，抽象设计点，最终以设计手段解决实际业务问题。</p>
              <p className="mt-2 text-neutral-700">擅长从复杂流程里抽关键任务链路，梳理用户真正卡点、状态和异常，通过交互、视觉层级和机制设计把产品做得可理解、可执行。</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full pt-6 border-t border-neutral-200">
        <h3 className="text-[8px] text-neutral-400 tracking-[0.3em] uppercase mb-4">核心能力 / Skills</h3>
        <div className="text-[11px] text-neutral-900 tracking-widest leading-[2.5] flex flex-wrap">
          {skills.map((skill, index) => (
            <span key={skill} className="whitespace-nowrap">
              {skill}
              {index < skills.length - 1 && <span className="mx-3 text-neutral-300 font-light">/</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. 履历 (Experience)
function ExperiencePage() {
  const experiences = [
    { time: "2024.09 - 2026.02", company: "科大讯飞工业智能", role: "交互设计", location: "杭州", desc: "负责工业智能领域核心产品的交互架构与体验设计，推动复杂工业场景的数字化与智能化转型。" },
    { time: "2020.11 - 2024.09", company: "阿里达摩院 (博彦)", role: "资深体验设计", location: "杭州", desc: "深入参与前沿 AI 产品与智能硬件的全链路设计，主导复杂业务逻辑的解构与体验重塑。" },
    { time: "2019.06 - 2020.07", company: "乐歌科技", role: "交互设计师", location: "宁波", desc: "负责智能办公与健康硬件产品的交互设计，探索人机工程学在日常办公场景中的应用。" },
    { time: "2018.08 - 2018.12", company: "徐工科技", role: "工业设计师", location: "徐州", desc: "参与重型机械与工业设备的早期形态与人机交互探索，奠定扎实的工业与硬件设计基础。" },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-10">
        <h2 className="text-[10px] font-bold tracking-[0.4em] text-neutral-900 uppercase">工作履历 / EXPERIENCE</h2>
        <span className="text-[9px] text-neutral-400 font-mono">02</span>
      </div>
      <div className="flex flex-col gap-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="group relative pl-6 border-l border-neutral-200 hover:border-neutral-900 transition-colors duration-500 ease-out">
            <div className="absolute -left-[3px] top-[6px] w-1.5 h-1.5 rounded-full bg-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="flex justify-between items-baseline mb-2.5">
              <div className="text-[13px] text-neutral-900 font-medium tracking-widest">{exp.company}</div>
              <div className="text-[9px] text-neutral-400 tracking-[0.15em] font-mono">{exp.time}</div>
            </div>
            <div className="flex items-center mb-3">
              <span className="px-2 py-[4px] bg-neutral-100/80 border border-neutral-200 text-neutral-900 rounded-sm text-[9px] tracking-widest leading-none uppercase">{exp.role}</span>
              <span className="mx-3 text-neutral-300 text-[10px]">|</span> 
              <span className="text-[10px] text-neutral-600 tracking-widest uppercase">{exp.location}</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-[2] tracking-wide max-w-[95%] text-justify">{exp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. 项目 (Projects) - 👈 核心修改区
// ==========================================
function ProjectsPage({ onSelectProject }: { onSelectProject: (proj: any) => void }) {
  const router = useRouter(); // 引入路由

  return (
    <div className="flex flex-col h-full relative z-10">
      <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-8">
        <h2 className="text-[10px] font-bold tracking-[0.4em] text-neutral-900 uppercase">精选项目 / SELECTED WORKS</h2>
        <span className="text-[9px] text-neutral-400 font-mono">03</span>
      </div>
      <div className="flex flex-col">
        {projectsData.map((proj, idx) => (
          <div 
            key={idx} 
            onClick={() => {
              // 👈 核心2：判断如果有 canvasRoute，就跳转到新页面；否则打开旧画廊
              if (proj.canvasRoute) {
                router.push(proj.canvasRoute);
              } else {
                onSelectProject(proj);
              }
            }} 
            className="py-5 border-b border-neutral-200/60 group hover:bg-neutral-50/50 transition-all duration-500 ease-out px-2 -mx-2 cursor-pointer"
          >
            <div className="flex justify-between items-baseline mb-2">
              <div className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                <h3 className="text-[13px] font-medium text-neutral-900 tracking-widest">{proj.name}</h3>
                {proj.link && (
                  <a 
                    href={proj.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} 
                    className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-2 py-0.5 text-[9px] text-neutral-600 hover:bg-neutral-900 hover:text-white transition-colors"
                  >
                    🌐 在线体验
                  </a>
                )}
              </div>
              <span className="text-[9px] text-neutral-400 font-mono tracking-[0.1em]">{proj.time}</span>
            </div>
            <div className="text-[10px] text-neutral-600 tracking-widest flex items-center group-hover:translate-x-2 transition-transform duration-500 ease-out delay-75">
              <span className="w-1 h-1 bg-neutral-400 rounded-full mr-3 group-hover:bg-neutral-900 transition-colors duration-500"></span>
              {proj.tags} <span className="mx-3 text-neutral-300 font-light">/</span> {proj.form}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. 结语 (Contact)
function ContactPage() {
  return (
    <div className="flex flex-col h-full max-w-md relative">
      <div className="pt-16">
        <h2 className="text-[32px] md:text-[38px] font-light text-neutral-900 leading-[1.4] tracking-widest">
          <InkRevealText line1="在像素之外，" line2="期待与您的真实连接" line2Class="text-neutral-400 italic" delay={0.2} />
        </h2>
      </div>
      <div className="absolute bottom-24 left-0 w-full flex flex-col gap-6 border-t border-neutral-200 pt-8">
        <div className="flex items-center group">
          <span className="w-28 text-[8px] text-neutral-400 tracking-[0.4em] uppercase font-bold">Phone</span>
          <span className="text-[13px] text-neutral-900 tracking-[0.2em] font-mono group-hover:translate-x-3 transition-transform duration-500 ease-out">195 2154 7884</span>
        </div>
        <div className="flex items-center group">
          <span className="w-28 text-[8px] text-neutral-400 tracking-[0.4em] uppercase font-bold">WeChat</span>
          <span className="text-[13px] text-neutral-900 tracking-[0.2em] font-mono group-hover:translate-x-3 transition-transform duration-500 ease-out">lbpdbqdl</span>
        </div>
        <div className="flex items-center group">
          <span className="w-28 text-[8px] text-neutral-400 tracking-[0.4em] uppercase font-bold">Email</span>
          <a href="mailto:tayloversme@outlook.com" className="text-[12px] text-neutral-900 tracking-[0.1em] font-mono hover:text-neutral-400 transition-colors duration-500 ease-out group-hover:translate-x-3">tayloversme@outlook.com</a>
        </div>
      </div>
    </div>
  );
}

// 全屏多图画廊组件 (保持不变)
function FullscreenGallery({ project, onClose }: { project: any, onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasImages = project.images && project.images.length > 0;

  const handleNext = (e: React.MouseEvent) => { e.stopPropagation(); if (hasImages) setCurrentIndex((prev) => (prev + 1) % project.images.length); };
  const handlePrev = (e: React.MouseEvent) => { e.stopPropagation(); if (hasImages) setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111111]/95 backdrop-blur-2xl cursor-zoom-out" onClick={onClose}>
      <div className="absolute top-8 left-10 right-10 flex justify-between items-center text-white/40 z-50 pointer-events-none">
        <div className="text-[12px] tracking-[0.3em] font-mono">{hasImages ? `${String(currentIndex + 1).padStart(2, '0')} / ${String(project.images.length).padStart(2, '0')}` : "00 / 00"}</div>
        <div className="hover:text-white flex items-center gap-4 transition-colors tracking-[0.3em] text-[11px] uppercase pointer-events-auto cursor-pointer" onClick={onClose}>
          <span>Close</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"></path></svg>
        </div>
      </div>
      {hasImages && project.images.length > 1 && (
        <>
          <button onClick={handlePrev} className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300 z-50 pointer-events-auto"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6"/></svg></button>
          <button onClick={handleNext} className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/5 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300 z-50 pointer-events-auto"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6"/></svg></button>
        </>
      )}
      <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative w-[80vw] max-w-[1280px] h-[70vh] flex items-center justify-center cursor-default" onClick={(e) => e.stopPropagation()}>
        {hasImages ? (
          <AnimatePresence mode="wait">
            <motion.img key={currentIndex} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} src={project.images[currentIndex]} alt={`${project.name} - ${currentIndex + 1}`} className="max-w-full max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
          </AnimatePresence>
        ) : (
          <div className="text-white/20 tracking-[0.3em] text-sm uppercase font-mono border border-white/10 px-8 py-4 rounded-sm">Images Coming Soon</div>
        )}
      </motion.div>
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-50">
        <div className="flex items-center gap-4 mb-4 pointer-events-auto">
          <h3 className="text-white text-2xl md:text-[28px] font-light tracking-widest">{project.name}</h3>
          {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-widest inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white hover:bg-white hover:text-black transition-all">🌐 在线体验</a>}
        </div>
        <div className="text-white/50 text-[10px] md:text-[11px] tracking-[0.2em] flex items-center gap-4 uppercase">
          <span className="font-mono">{project.time}</span><span className="w-1 h-1 bg-white/20 rounded-full"></span><span>{project.tags}</span><span className="w-1 h-1 bg-white/20 rounded-full"></span><span>{project.form}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 主页面组合
// ==========================================
export default function PortfolioMainPage() {
  const [activeId, setActiveId] = useState<PageId>("home");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // 👈 核心3：监听 URL 参数，如果是从画布返回的，自动翻到“精选项目”页
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("tab") === "projects") {
        setActiveId("projects");
      }
    }
  }, []);

  const getLeftPageContent = (id: PageId) => {
    switch (id) {
      case "home": return { src: "/images/left-1.JPG", caption: "形式追随实质 / Form Follows Substance" };
      case "profile": return { src: "/images/left-2.JPG", caption: "秩序与留白 / Order & Space" };
      case "experience": return { src: "/images/left-3.JPG", caption: "业务解构与体验重塑 / 2018 - 2026" };
      case "projects": return { src: "/images/left-4.JPG", caption: "软硬一体与全链路设计 / Selected Works" };
      case "contact": return { src: "/images/left-5.JPG", caption: "期待回音 / Get in Touch" };
      default: return { src: "", caption: "" };
    }
  };

  const currentLeftContent = getLeftPageContent(activeId);

  return (
    <main className="min-h-screen bg-[#d5d3ce] flex items-center justify-center py-10 overflow-hidden relative">
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.12] mix-blend-color-burn" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      <div className="-translate-x-[20px]">
        <BookShell pages={portfolioPages} activeId={activeId} onChange={setActiveId} leftImageSrc={currentLeftContent.src} leftCaption={currentLeftContent.caption}>
          {activeId === "home" && <HomePage />}
          {activeId === "profile" && <ProfilePage />}
          {activeId === "experience" && <ExperiencePage />}
          {activeId === "projects" && <ProjectsPage onSelectProject={setSelectedProject} />}
          {activeId === "contact" && <ContactPage />}
        </BookShell>
      </div>
      <AnimatePresence>
        {selectedProject && <FullscreenGallery project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </main>
  );
}
