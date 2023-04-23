export default function WhatIsFlowershow() {
  return (
    <div className="py-10 sm:px-2 lg:relative lg:px-0" id="overview">
      <div className="prose dark:prose-invert mx-auto max-w-6xl px-4 lg:max-w-6xl lg:px-8 xl:px-12">
        <h2 className="text-center">What is Flowershow?</h2>
        <p>
          Flowershow is an open-source tool for easily converting your markdown
          files into an elegant website. It's built on a standard, modern web
          stack – React, Next.js, and Tailwind and shipped with a basic default
          theme to get you started with just a few clicks.
        </p>
        <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
            <div className="relative overflow-hidden rounded-xl p-6">
              <img
                src="/assets/images/obsidian_icon.png"
                alt=""
                className="h-12 w-auto"
              />
              <h2 className="mt-4 font-display text-base text-primary dark:text-primary-dark">
                Crafted for Obsidian
              </h2>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                Works with your existing Obsidian notes out of the box. No need
                to modify the syntax or change file layout. Not an obsidian fan?
                Flowershow will work with any CommonMark or GFM markdown files.
              </p>
            </div>
          </div>

          <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
            <div className="relative overflow-hidden rounded-xl p-6">
              <img
                src="/assets/images/park.png"
                alt=""
                className="h-12 w-auto"
              />
              <h2 className="mt-4 font-display text-base text-primary dark:text-primary-dark">
                Elegant & Functional
              </h2>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                Clean and elegant default theme with dark and light mode, hero,
                navbar, backlinks section and support for internal links,
                backlinks, math, mermaid, callouts and more.
              </p>
            </div>
          </div>

          <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
            <div className="relative overflow-hidden rounded-xl p-6">
              <img
                src="/assets/images/farming.png"
                alt=""
                className="h-12 w-auto"
              />
              <h2 className="mt-4 font-display text-base text-primary dark:text-primary-dark">
                Customize and extend (if that’s your thing!)
              </h2>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                Want to spice things up? Flowershow is easy to extend, tweak and
                customize and is built on standard, modern web stack – React,
                NextJS and Tailwind.
              </p>
            </div>
          </div>

          <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
            <div className="relative overflow-hidden rounded-xl p-6">
              <img
                src="/assets/images/data.png"
                alt=""
                className="h-12 w-auto"
              />
              <h2 className="mt-4 font-display text-base text-primary dark:text-primary-dark">
                Backed by an experienced team
              </h2>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                We’ve been building content and data driven products for over a
                decade, and we’re passionate about sharing knowledge and ideas
                with others. We love markdown as much as we love open-source (a
                lot!).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
