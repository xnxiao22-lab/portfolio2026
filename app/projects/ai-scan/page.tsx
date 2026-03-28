import InteractiveCanvas from '@/components/InteractiveCanvas';

export default function AIScanProjectPage() {
  return (
    <main className="w-full h-screen bg-[#111111] overflow-hidden">
      {/* 这里就是引入我们刚才写好的白板组件 */}
      <InteractiveCanvas />
    </main>
  );
}
