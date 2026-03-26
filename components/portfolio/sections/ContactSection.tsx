"use client";

import { useState } from "react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div className="max-w-prose">
      <h2 className="font-serif text-[28px] md:text-[34px] text-[#333333]">
        联系我
      </h2>
      <p className="mt-4 font-sans text-base leading-7 text-[#333333]/80">
        你可以通过邮箱或社交平台联系我。表单是演示用途：提交后不会真的发到服务端。
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-black/10 bg-[#f3f1ea] p-5">
          <div className="font-serif text-xl text-[#333333]">邮箱</div>
          <a
            href="mailto:hello@example.com"
            className="mt-3 inline-flex font-sans text-sm md:text-base text-[#333333]/90 hover:underline underline-offset-4"
          >
            hello@example.com
          </a>

          <div className="mt-5 font-serif text-xl text-[#333333]">社交</div>
          <div className="mt-3 space-y-2 font-sans text-sm md:text-base text-[#333333]/80">
            <a className="block hover:text-[#333333]" href="#">
              Behance（占位）
            </a>
            <a className="block hover:text-[#333333]" href="#">
              Dribbble（占位）
            </a>
            <a className="block hover:text-[#333333]" href="#">
              LinkedIn（占位）
            </a>
          </div>
        </div>

        <form
          className="rounded-2xl border border-black/10 bg-[#f9f8f6] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("已收到（演示）：我会在真实项目中接入后端或表单服务。");
          }}
        >
          <div className="font-serif text-xl text-[#333333]">极简联系表单</div>

          <div className="mt-4 space-y-3">
            <label className="block">
              <div className="text-xs font-sans text-[#333333]/70 mb-1">姓名</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/15"
                placeholder="你的名字"
              />
            </label>

            <label className="block">
              <div className="text-xs font-sans text-[#333333]/70 mb-1">邮箱</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/15"
                placeholder="name@example.com"
              />
            </label>

            <label className="block">
              <div className="text-xs font-sans text-[#333333]/70 mb-1">内容</div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full resize-none rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/15"
                placeholder="写下你的需求或想法…"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#333333] px-5 py-3 font-sans text-sm text-[#f9f8f6] hover:opacity-95 transition-opacity"
          >
            发送（演示）
          </button>

          {status && (
            <div className="mt-3 text-xs font-sans text-[#333333]/70">{status}</div>
          )}
        </form>
      </div>
    </div>
  );
}

