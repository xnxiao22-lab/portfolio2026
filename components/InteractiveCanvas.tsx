'use client';

import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const CANVAS_WIDTH = 12000;
const CANVAS_HEIGHT = 7000;
const NODE_WIDTH = 1440;
const NODE_HEIGHT = 810;

// 🌟 注入了真实文案的节点配置
const nodes = [
  { 
    id: 'n1', title: '1. 项目背景', imgSrc: '/images/ai-scan/AI Scan-01.webp', x: 600, y: 3000, 
    tags: [{ title: '业务痛点', content: '谁：轻极客用户\n做什么：完整扫描输出模型\n卡在哪：不懂参数、判断不了好坏、不能应用结果\n设计目标：更顺畅完成首扫，并得到结果' }] 
  },
  { 
    id: 'n2', title: '2. 洞察与定位', imgSrc: '/images/ai-scan/AI Scan-02.webp', x: 2400, y: 3000, 
    tags: [{ title: '问题定位', content: '观察方式：启发式评估、认知走查、小样本任务测试\n定位方法：任务链路分阶段、拆节点、聚焦断点难点\n问题分布：扫描前、中、后' }] 
  },
  { 
    id: 'n3', title: '3. 核心推导', imgSrc: '/images/ai-scan/AI Scan-03.webp', x: 4200, y: 3000, 
    tags: [{ title: '设计策略', content: '用户决策点：物体是什么、想要什么效果、扫完怎么用\n系统表达方式：参数、异常反馈、格式\n根因：用户和系统间缺少可解释映射\n设计方向：参数 → 模式、黑盒过程 → 可感知反馈、跨端输出 → 快速预览' }] 
  },
  
  // 中间的三个并列分支
  { 
    id: 'n4', title: '4. 视觉重构 (上分支)', imgSrc: '/images/ai-scan/AI Scan-04.webp', x: 6000, y: 1500, 
    tags: [{ title: '猜参数到选模式', content: '问题：不理解\n设计手段：模式入口 / 参数收敛 / 状态常驻\n作用：降低门槛、提升首次选择准确率' }] 
  },
  { 
    id: 'n5', title: '5. 交互深度 (中分支)', imgSrc: '/images/ai-scan/AI Scan-05.webp', x: 6000, y: 3000, 
    tags: [{ title: '过程反馈设计', content: '问题：原本没有判断信息\n设计手段：质量可视化 / 提示分级 / 初始引导\n作用：降低试错成本，提升过程可控感' }] 
  },
  { 
    id: 'n6', title: '6. 极端场景 (下分支)', imgSrc: '/images/ai-scan/AI Scan-06.webp', x: 6000, y: 4500, 
    tags: [{ title: '修正与继续', content: '问题：返工重\n设计手段：风险定位 / 指向补扫 / 历史回退\n作用：降低返工成本，提升恢复效率' }] 
  },
  
  // 汇集与结尾
  { 
    id: 'n7', title: '7. 状态流转', imgSrc: '/images/ai-scan/AI Scan-07.webp', x: 7800, y: 3000, 
    tags: [{ title: '端侧闭环输出', content: '问题：不好应用\n设计手段：AI预览 / AR预览 / 轻量输出\n作用：缩短结果确认路径，降低输出门槛' }] 
  },
  { 
    id: 'n8', title: '8. 数据回证', imgSrc: '/images/ai-scan/AI Scan-08.webp', x: 9600, y: 3000, 
    tags: [{ title: '业务价值', content: '扫描前：易开始\n扫描中：易判断与修正\n扫描后：易确认与输出\n意义：明确设计与业务结果联系' }] 
  },
];

// 连线关系保持不变
const edges = [
  { from: 'n1', to: 'n2' }, 
  { from: 'n2', to: 'n3' },
  { from: 'n3', to: 'n4' }, 
  { from: 'n3', to: 'n5' }, 
  { from: 'n3', to: 'n6' },
  { from: 'n4', to: 'n7' }, 
  { from: 'n5', to: 'n7' }, 
  { from: 'n6', to: 'n7' },
  { from: 'n7', to: 'n8' }
];

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
                <div id="overview-center" className="absolute pointer-events-none" style={{ left: 5820, top: 3405, width: 1, height: 1 }} />

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
                    <div className="absolute -top-20 left-0 flex flex-col items-start">{node.tags.slice(0, 1).map((tag, i) => <TalkTag key={i} tag={tag} />)}</div>
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
