---
layout: unstyled
---

<div className="overflow-hidden -mb-32 mt-[-4.5rem] pb-32 pt-[4.5rem] lg:mt-[-4.75rem] lg:pt-[4.75rem]">
  <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
      <div className="relative mb-10 lg:mb-0 md:text-center lg:text-left">
        <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-6xl tracking-tight text-transparent">Publish your obsidian notes, beautifully.</p>
        <p className="mt-4 text-3xl dark:text-white tracking-tight">For free, no coding.</p>
        <p className="mt-4 text-xl tracking-tight text-slate-400">Turn your markdown notes into an elegant website and tailor it to your needs. Flowershow is easy to use, fully-featured, obsidian compatible and open-source.</p>
        <div className="mt-10 sm:mt-12">
          <form className="sm:max-w-xl sm:mx-auto lg:mx-0" method="POST" name="get-updates" data-netlify="true" action="/subscribed">
            <div className="sm:flex">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  required="required"
                  placeholder="Enter your email"
                  className="block w-full py-2 px-4 rounded-full text-sm bg-slate-800 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                />
                <input type="hidden" name="form-name" value="get-updates" />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button type="submit" className="rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500 no-underline">
                Get updates
                </button>
              </div>
            </div>
          </form>
        </div>
        <p className="mt-3 text-sm text-gray-300 sm:mt-4">
          Get short updates as we release new features.
        </p>
      </div>
      <div className="relative">
        <img src="/assets/images/obsidian_dark.png" alt="" className="relative -top-14 w-3/4 rounded-lg shadow-xl" />
        <img src="/assets/images/flowershow_chrome_mac_dark.png" alt="" className=" absolute top-10 left-1/3 w-3/4 rounded-lg shadow-xl" />
      </div>
    </div>
  </div>
</div>


<div className="py-10 sm:px-2 lg:relative lg:px-0">
  <div className="prose dark:prose-invert mx-auto max-w-2xl px-4 lg:max-w-6xl lg:px-8 xl:px-12">
    <h2 className="text-center">What is Flowershow?</h2>
    Flowershow is an open-source tool for easily converting your markdown files into an elegant website. It's built on a standard, modern web stack – React, Next.js, and Tailwind and shipped with a basic default theme to get you started with just a few clicks.
    <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">

      <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
        <div className="relative overflow-hidden rounded-xl p-6">
          <img src="/assets/images/obsidian_icon.png" className="h-12 w-auto" />
          <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
            <span className="absolute -inset-px rounded-xl" />
            Crafted for Obsidian
          </h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
            Works with your existing Obsidian notes out of the box. No need to modify the syntax or change file layout. Flowershow supports internal links, backlinks, math, mermaid, callouts and more.
            Not an obsidian fan? Flowershow will work with any CommonMark or GFM markdown files.
          </p>
        </div>
      </div>

      <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
        <div className="relative overflow-hidden rounded-xl p-6">
          <img src="/assets/images/park.png" className="h-12 w-auto" />
          <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
            <span className="absolute -inset-px rounded-xl" />
            Elegant & Functional
          </h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
            Clean and elegant default theme with dark and light mode, hero, navbar, backlinks section and much more.
          </p>
        </div>
      </div>

      <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
        <div className="relative overflow-hidden rounded-xl p-6">
          <img src="/assets/images/farming.png" className="h-12 w-auto" />
          <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
            <span className="absolute -inset-px rounded-xl" />
            Customize and extend (if that’s your thing!)
          </h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
            Want to spice things up? Flowershow is easy to extend, tweak and customize and is built on standard, modern web stack – React, NextJS and Tailwind.
          </p>
        </div>
      </div>

      <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
        <div className="relative overflow-hidden rounded-xl p-6">
          <img src="/assets/images/data.png" className="h-12 w-auto" />
          <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
            <span className="absolute -inset-px rounded-xl" />
            Backed by a team of data geeks
          </h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
            We’ve been building content and data driven products for over a decade, and we’re passionate about sharing knowledge and ideas with others.
            We love markdown as much as we love open-source (which is a lot!).
          </p>
        </div>
      </div>
  
    </div>

  </div>


<div className="py-10 sm:px-2 lg:relative lg:px-0">
  <div className="prose dark:prose-invert mx-auto max-w-2xl px-4 lg:max-w-6xl lg:px-8 xl:px-12">
    <h2 className="text-center">Why the name?</h2>
    Flowershow is about sharing your digital garden -- putting it "on show" to the world. And what do you have in your garden? Flowers! Hence "Flowershow": it shows off your digital garden to the world!
  </div>
</div>


</div>
