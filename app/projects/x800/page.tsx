'use client';

import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const CANVAS_WIDTH = 10000; 
const CANVAS_HEIGHT = 7000;
const NODE_WIDTH = 1440;
const NODE_HEIGHT = 810;

// 🛠 X800 修正版：6个节点，双分支结构
const nodes = [
  { 
    id: 'n1', title: '1. 项目背景', imgSrc: '/images/x800/X800-01.webp', x: 600, y: 3000, 
    tags: [{ title: '黑盒交付链路', content: '- 用户：交付/现场人员\n- 场景：安装、连接、扫描、交付\n- 问题：状态隐性 / 离屏断裂 / 资产失序 / 排障靠经验\n- 目标：稳定交付、减少试错、形成SOP' }] 
  },
  { 
    id: 'n2', title: '2. 问题定位', imgSrc: '/images/x800/X800-02.webp', x: 2400, y: 3000, 
    tags: [{ title: '关键断点失控', content: '- 前置状态缺失\n- 离屏操作不可控\n- 工程资产无治理\n- 排障口径不统一' }] 
  },
  { 
    id: 'n3', title: '3. 核心机制', imgSrc: '/images/x800/X800-03.webp', x: 4200, y: 3000, 
    tags: [{ title: '从黑盒到可控', content: '- 状态可知\n- 动作可执行\n- 工程可恢复\n- 离屏可控' }] 
  },
  
  // 两个并列策略分支
  { 
    id: 'n4', title: '4. 风险前置校验 (上分支)', imgSrc: '/images/x800/X800-04.webp', x: 6000, y: 2000, 
    tags: [{ title: '状态边界', content: '- 安装即校验\n- 强制卡口\n- 配置绑定\n- 状态映射动作' }] 
  },
  { 
    id: 'n5', title: '5. 工程治理与离屏交互 (下分支)', imgSrc: '/images/x800/X800-05.webp', x: 6000, y: 4000, 
    // 🌟 这里放置了两个标签，它们会整齐地堆叠在节点上方
    tags: [
      { title: '资产边界', content: '- 工程树重组\n- 故障点记忆\n- 中断恢复\n- 自动保存' },
      { title: '交互边界', content: '- 按键映射\n- 提示分级\n- 动作绑定\n- 远距反馈' }
    ] 
  },
  
  // 汇集到最终结果 (第6页)
  { 
    id: 'n6', title: '6. 成效回证', imgSrc: '/images/x800/X800-06.webp', x: 7800, y: 3000, 
    tags: [{ title: '机制到结果', content: '- 首次连接授权通过率 69%\n- 离屏操作覆盖率 71%\n- 系统交付时长 39min\n- 设计机制 → 过程信号 → 结果指标' }] 
  },
];

// 双分支的连线逻辑
const edges = [
  { from: 'n1', to: 'n2' }, 
  { from: 'n2', to: 'n3' },
  { from: 'n3', to: 'n4' }, 
  { from: 'n3', to: 'n5' }, 
  { from: 'n4', to: 'n6' }, 
  { from: 'n5', to: 'n6' }
];

// 向上弹出的气泡组件保持不变
const TalkTag = ({ tag }: { tag: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative z-50 mb-4 cursor-pointer" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white/90 text-xl px-6 py-3 rounded-full transition-colors flex items-center gap-3 w-max shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>{tag.title}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 10 }} 
            className="absolute bottom-full left-0 mb-4 w-96 bg-gray-800 border border-gray-600 p-6 rounded-xl shadow-2xl z-50"
          >
            <p className="text-gray-200 text-base leading-loose whitespace-pre-line">{tag.content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function InteractiveCanvas() {
  const router = useRouter();
  
  const drawStepLine = (fromNode: any, toNode: any) => {
    const startX = fromNode.x + NODE_WIDTH, startY = fromNode.y + NODE_HEIGHT / 2, endX = toNode.x, endY = toNode.y + NODE_HEIGHT / 2, midX = startX + (endX - startX) / 2;
    return `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
  };
  
  const TARGET_SCALE = 0.6; 
  const OVERVIEW_SCALE = 0.15; 

  return (
    <div className="w-full h-screen bg-[#111111] overflow-hidden relative select-none">
      <TransformWrapper minScale={0.05} maxScale={2} wheel={{ step: 0.08 }} pinch={{ step: 5 }} doubleClick={{ disabled: true }} limitToBounds={false} panning={{ velocityDisabled: true }} onInit={(ref) => { ref.zoomToElement('node-n1', TARGET_SCALE, 0); }}>
        {({ zoomToElement }) => (
          <>
            <div className="absolute top-8 left-8 z-50 flex items-center gap-3">
              <button onClick={() => router.push('/?tab=projects')} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-lg shadow-lg transition-all flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> 返回项目列表
              </button>
              <button onClick={() => zoomToElement('node-n1', TARGET_SCALE, 800)} title="回到起点" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white p-2.5 rounded-lg shadow-lg transition-all flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
              <button onClick={() => zoomToElement('overview-center', OVERVIEW_SCALE, 800)} title="全局概览" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white p-2.5 rounded-lg shadow-lg transition-all flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
              </button>
            </div>
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%', cursor: 'grab' }}>
              <div style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }} className="relative">
                {/* 调整了 6 节点的全局概览中心点 */}
                <div id="overview-center" className="absolute pointer-events-none" style={{ left: 4920, top: 3405, width: 1, height: 1 }} />

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs><marker id="arrowhead" markerWidth="15" markerHeight="10.5" refX="13.5" refY="5.25" orient="auto"><polygon points="0 0, 15 5.25, 0 10.5" fill="#4B5563" /></marker></defs>
                  {edges.map((edge, i) => {
                    const fromNode = nodes.find(n => n.id === edge.from), toNode = nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;
                    return <path key={i} d={drawStepLine(fromNode, toNode)} fill="none" stroke="#4B5563" strokeWidth="4" markerEnd="url(#arrowhead)" className="opacity-60" />;
                  })}
                </svg>
                {nodes.map((node) => (
                  <div key={node.id} id={`node-${node.id}`} className="absolute flex flex-col items-center" style={{ left: node.x, top: node.y, width: NODE_WIDTH }}>
                    {/* 🌟 优化了标签容器，支持多个标签堆叠显示 */}
                    <div className="absolute bottom-full left-0 mb-4 flex flex-col items-start">
                      {node.tags.map((tag, i) => <TalkTag key={i} tag={tag} />)}
                    </div>
                    <div onClick={() => zoomToElement(`node-${node.id}`, TARGET_SCALE, 800)} className="w-full h-[810px] bg-gray-800 border-2 border-gray-700 rounded-xl flex items-center justify-center shadow-2xl overflow-hidden transition-transform hover:scale-[1.01] hover:border-gray-500 cursor-pointer">
                      <img src={node.imgSrc} alt={node.title} draggable={false} className="w-full h-full object-cover select-none pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
