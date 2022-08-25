---
layout: unstyled
---

<div className="overflow-hidden -mb-32 mt-[-4.5rem] pb-32 pt-[4.5rem] lg:mt-[-4.75rem] lg:pt-[4.75rem]">
  <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
      <div className="relative mb-10 lg:mb-0 md:text-center lg:text-left">
        <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-6xl tracking-tight text-transparent">Publish your Obsidian notes, beautifully.</p>
        <p className="mt-4 text-3xl dark:text-white tracking-tight">For free, no coding.</p>
        <p className="mt-4 text-xl tracking-tight text-slate-400">Turn your markdown notes into an elegant website and tailor it to your needs. Flowershow is easy to use, fully-featured, Obsidian compatible and open-source.</p>
        <div className="mt-8 sm:mx-auto sm:text-center lg:text-left lg:mx-0">
          <p className="text-base font-medium text-slate-400 dark:text-slate-300">Sign up to get notified when it's ready</p>
          <form method="POST" name="get-updates" data-netlify="true" action="/subscribed" className="mt-3 sm:flex">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              name="email"
              type="email"
              required="required"
              placeholder="Enter your email"
              className="block w-full px-2 py-3 text-base rounded-md bg-slate-200 dark:bg-slate-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900 sm:flex-1"/>
            <input type="hidden" name="form-name" value="get-updates" />
            <button type="submit" className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-sky-300 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
              Notify me
            </button>
          </form>
          <p className="mt-3 text-sm text-slate-400 dark:text-slate-300 sm:mt-4">We are actively trialling Flowershow before wide release. If you'd like to help us test it or be first on the list to use please sign up.</p>
        </div>
        <p className="my-10 text-l tracking-wide">
          <span>A project of</span>
          <a href="https://lifeitself.us/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/life-itself-logo.svg" alt="Life Itself" className="mx-2 mb-1 h-6 inline"/>
            <span>Life Itself</span>
          </a> 
          <a href="https://www.datopian.com/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/datopian_logo.png" alt="Datopian" className="mx-2 mb-1 h-6 inline bg-black rounded-full"/>
            <span>Datopian</span>
          </a> 
        </p>
      </div>
      <div className="relative">
        <img src="/assets/images/obsidian_dark_new.png" alt="" className="relative -top-14 w-3/4 rounded-lg hidden dark:block" />
        <img src="/assets/images/flowershow_dark.png" alt="" className=" absolute top-10 left-1/3 w-3/4 rounded-lg hidden dark:block" />
        <img src="/assets/images/obsidian_light_new.png" alt="" className="relative -top-14 w-3/4 rounded-lg dark:hidden" />
        <img src="/assets/images/flowershow_light.png" alt="" className=" absolute top-10 left-1/3 w-3/4 rounded-lg dark:hidden" />
      </div>
    </div>
  </div>
</div>


<div className="py-10 sm:px-2 lg:relative lg:px-0" id="overview">
  <div className="prose dark:prose-invert mx-auto max-w-6xl px-4 lg:max-w-6xl lg:px-8 xl:px-12">
    <h2 className="text-center">What is Flowershow?</h2>
    <p>Flowershow is an open-source tool for easily converting your markdown files into an elegant website. It's built on a standard, modern web stack – React, Next.js, and Tailwind and shipped with a basic default theme to get you started with just a few clicks.</p>
    <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
        <div className="relative overflow-hidden rounded-xl p-6">
          <img src="/assets/images/obsidian_icon.png" className="h-12 w-auto" />
          <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">Crafted for Obsidian</h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">Works with your existing Obsidian notes out of the box. No need to modify the syntax or change file layout. Not an obsidian fan? Flowershow will work with any CommonMark or GFM markdown files.</p>
        </div>
      </div>
      <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
        <div className="relative overflow-hidden rounded-xl p-6">
          <img src="/assets/images/park.png" className="h-12 w-auto" />
          <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">Elegant & Functional</h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">Clean and elegant default theme with dark and light mode, hero, navbar, backlinks section and support for internal links, backlinks, math, mermaid, callouts and more.</p>
        </div>
      </div>
      <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
        <div className="relative overflow-hidden rounded-xl p-6">
          <img src="/assets/images/farming.png" className="h-12 w-auto" />
          <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">Customize and extend (if that’s your thing!)</h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">Want to spice things up? Flowershow is easy to extend, tweak and customize and is built on standard, modern web stack – React, NextJS and Tailwind.</p>
        </div>
      </div>
      <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
        <div className="relative overflow-hidden rounded-xl p-6">
          <img src="/assets/images/data.png" className="h-12 w-auto" />
          <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">Backed by an experienced team</h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">We’ve been building content and data driven products for over a decade, and we’re passionate about sharing knowledge and ideas with others.<br/>We love markdown as much as we love open-source (which is a lot!).</p>
        </div>
      </div> 
    </div>
  </div>
  

<div className="py-10 sm:px-2 lg:relative lg:px-0" id="how">
  <div className="prose dark:prose-invert mx-auto max-w-6xl px-4 lg:max-w-6xl lg:px-8 xl:px-12">
    <h2 className="text-center">How Flowershow works?</h2>
    <p className="text-center">🚧 Coming soon! 🚧</p>
    <p>We are actively trialling Flowershow before wide release. If you'd like to help us test or be first on the list to use it please sign up using the form at the top of this page.</p>
    <div className="relative grid grid-cols-1 gap-6 my-4 lg:my-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
            1
          </div>
          <h3 className="m-0">
            You have a folder with your Markdown files and you want to publish it.
          </h3>
        </div>
      </div>
      <div>
        <img src="/assets/images/content_folder.png" alt="" className="lg:max-h-[20rem] m-0"/>
      </div>
      <img src="/assets/images/arrow.png" alt="" className="hidden lg:block h-[10rem] absolute bottom-0 left-[38%] rotate-[45deg] translate-y-1/2" />
    </div> 
    <div className="relative grid grid-cols-1 gap-6 my-4 lg-my-16 lg:grid-cols-2 lg:gap-16">
      <div className="hidden lg:block">
        <img src="/assets/images/npx.png" alt="" className="m-0 lg:max-h-[20rem]"/>
      </div>
      <div>
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
            2
          </div>
          <h3 className="m-0">
            Run `npx flowershow publish` in this folder...
          </h3>
        </div>
        <p>After running this command, you'll be shown some basic configuration prompts. At the end you'll get a response: `Live at https://xyz.flowershow.sites/...`</p>
      </div>
      <div className="lg:hidden">
        <img src="/assets/images/npx.png" alt="" className="m-0 lg:max-h-[20rem]"/>
      </div>
      <img src="/assets/images/arrow.png" alt="" className="hidden lg:block h-[12rem] absolute left-[38%]  -rotate-[45deg] bottom-0 translate-y-[9rem]"/>
    </div>
    <div className="relative grid grid-cols-1 gap-6 my-4 lg:my-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
            3
          </div>
          <h3 className="m-0">... and see your website online! 🎊</h3>
        </div>
      </div>
      <div>
        <img src="/assets/images/result_mac_dark.png" alt="" className="rounded-lg shadow-xl m-0" />
      </div>
    </div> 
    </div>
  </div>
</div>

<div className="py-10 sm:px-2 lg:relative lg:px-0" id="features">
  <div className="prose dark:prose-invert mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-8 xl:px-12">
    <h2 className="text-center">Features</h2>

Here are some of the cool features that are currently supported by Flowershow, and some that we're intensively working on.

### ✅ Markdown

Flowershow supports **CommonMark** and **GitHub Flavoured Markdown (GFM)** syntax, e.g. code blocks, blockquotes, lists, tasks lists and tables.

[[docs/syntax|Learn more ➡]]

### ✅ Obsidian wiki links

Flowershow has been designed with Obsidian users in mind and so, currently, it supports internal links to other pages. Links to headings, blocks, and transclusions will also be supported in the future.

[[docs/syntax|Learn more ➡]]

### ✅ Custom page layouts and components

You can customize and create new layouts for your pages.

[[docs/layouts|Learn more ➡]]

Also, thanks to MDX support, you can use custom React components within your markdown notes.

[[docs/mdx|Learn more ➡]].

### ✅ Tailwind support

Tailwind support makes it easy to style your in-markdown HTML and custom React components.

[[docs/tailwind|Learn more ➡]]

### ✅ Mermaid

Displaying Mermaid diagrams within in your notes.

[[docs/mermaid|Learn more ➡]]

### ✅ Math

MathJax math exaptions support.

[[docs/math|Learn more ➡]]

### ✅ SEO

Support for for meta tags for SEO and social sharing.

[[docs/seo|Learn more ➡]]

### 🚧 Knowledge graph

Interactive knowledge graph to see how your notes are interconnected.

### 🚧 Notes previews

Wikipedia-like internal links previews on hover.

### 🚧 Themes

A set of different starter themes to choose from and support for dark/light mode.

### 🚧 Forward links and Backlinks

Lists of forward links used on the page and back links to the page from other pages.

### 🚧 Excalidraw support

Displaying Excalidraw sketches directly in your markdown pages.

### 🚧 CLI tool

Our goal is to make using Flowershow as seamless as possible. To facilitate smooth bootsrapping and upgrading your website we're creating a CLI tool, that will take care of all the intricacies related to the whole process of publishing your notes.

    👷 There is a lot of other exciting stuff we're working on.
    <a href="/docs/roadmap">Check our roadmap to learn more!</a>

  </div>
</div>


<div className="py-10 sm:px-2 lg:relative lg:px-0">
  <div className="prose dark:prose-invert mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-8 xl:px-12">
    <h2 className="text-center">Why the name?</h2>
    <p>Flowershow is about sharing your digital garden -- putting it "on show" to the world. And what do you have in your garden? Flowers! Hence "Flowershow": it shows off your digital garden to the world!</p>
  </div>
</div>

