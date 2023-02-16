---
layout: unstyled
showToc: false
showSidebar: false
---

import { Hero } from "components/custom/Hero.jsx"
import { WhatIsFlowershow } from "components/custom/WhatIsFlowershow.jsx"

<Hero />
<WhatIsFlowershow />

<div className="mx-auto lg:max-w-3xl">
  https://www.youtube.com/watch?v=HxD6NWYCea0
</div>

{/** Self publish **/}

<div className="py-10 sm:px-2 lg:relative lg:px-0" id="self-publish">
  <div className="rounded-md prose dark:prose-invert mx-auto max-w-6xl p-4 lg:max-w-6xl lg:p-8 xl:p-12">
    <h2 className="text-center">
      Self-publish your digital garden with Flowershow
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 lg:gap-12">
      { /* 1. markdown folder */ }
      <div className="relative">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fuchsia-200 bg-fuchsia-100 text-xl text-fuchsia-600 ring-2 ring-white dark:border-fuchsia-900 dark:bg-[#561b5e] dark:text-fuchsia-400 dark:ring-fuchsia-100">
            1
          </div>
          <h3 className="m-0">
            You have your digital garden and you want to publish it...
          </h3>
        </div>
        <p>It can also be your Obsidian vault!</p>
      </div>
      <img src="/assets/images/content_folder.png" alt="" className="lg:max-h-[20rem] m-0 lg:my-6"/>
      { /* 2. npx flowershow generate */ }
      <div className="relative">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fuchsia-200 bg-fuchsia-100 text-xl text-fuchsia-600 ring-2 ring-white dark:border-fuchsia-900 dark:bg-[#561b5e] dark:text-fuchsia-400 dark:ring-fuchsia-100">
            2
          </div>
          <h3 className="m-0">
            ...so you install Flowershow...
          </h3>
        </div>
      </div>
      <img src="/assets/images/npx_install.png" alt="" className="lg:max-h-[20rem] m-0 lg:my-6"/>
      { /* 3. building */ }
      <div className="relative">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fuchsia-200 bg-fuchsia-100 text-xl text-fuchsia-600 ring-2 ring-white dark:border-fuchsia-900 dark:bg-[#561b5e] dark:text-fuchsia-400 dark:ring-fuchsia-100">
            3
          </div>
          <h3 className="m-0">
            ...and build your own beautiful website.
          </h3>
        </div>
        <p>If you don't need a static build, run `npx flowershow build`.</p>
      </div>
      <img src="/assets/images/npx_export.png" alt="" className="lg:max-h-[20rem] m-0 lg:my-6"/>
      { /* 4. self hosting */ }
      <div className="relative">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fuchsia-200 bg-fuchsia-100 text-xl text-fuchsia-600 ring-2 ring-white dark:border-fuchsia-900 dark:bg-[#561b5e] dark:text-fuchsia-400 dark:ring-fuchsia-100">
            4
          </div>
          <h3 className="m-0">
            🎊 You can now self-publish on your favourite hosting platform!
          </h3>
        </div>
        <p>...like Netlify, GitHub Pages or Cloudflare.</p>
      </div>
      <img src="/assets/images/netlify_deploy.png" alt="" className="m-0 rounded-md lg:my-6"/>
    </div>
    <div className="text-center mt-12 text-lg">👉 See our [[publish-tutorial|self-publish tutorial]] to learn more!</div>

  </div>
</div>

{/** Flowershow publish **/}

<div className="py-10 sm:px-2 lg:relative lg:px-0" id="how">
  <div className="prose dark:prose-invert mx-auto max-w-6xl p-4 lg:max-w-6xl lg:p-8 xl:p-12">
    <h2 className="text-center">
      Publish your digital garden with Flowershow
    </h2>
    <p className="text-center">🚧 Coming soon! 🚧</p>
    <p>We are actively trialling Flowershow before wide release. If you'd like to help us test or be first on the list to use it please sign up using the form at the top of this page.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 lg:gap-12">
      { /* 1. markdown folder */ }
      <div className="relative">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
            1
          </div>
          <h3 className="m-0">
            You have your digital garden and you want to publish it...
          </h3>
        </div>
        <p>It can also be your Obsidian vault!</p>
      </div>
      <img src="/assets/images/content_folder.png" alt="" className="lg:max-h-[20rem] m-0 lg:my-6"/>
      { /* 2. npx flowershow publish */ }
      <div className="relative">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
            2
          </div>
          <h3 className="m-0">
            ...so you publish it with the help of our command line tool...
          </h3>
        </div>
      </div>
      <img src="/assets/images/npx_publish.png" alt="" className="lg:max-h-[20rem] m-0 lg:my-6"/>
      { /* 3. published result */ }
      <div className="relative">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
            3
          </div>
          <h3 className="m-0">
          ... and see your website online! 🎊
          </h3>
        </div>
      </div>
      <img src="/assets/images/result_mac_dark.png" alt="" className="lg:max-h-[20rem] m-0 lg:my-6"/>
    </div>
  </div> 
</div>

{/** Features (tb replaced with something nicer) **/}

<div className="py-10 sm:px-2 lg:relative lg:px-0" id="features">
  <div className="prose dark:prose-invert mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-8 xl:px-12">
    <h2 className="text-center">Features</h2>

Here are some of the cool features that are currently supported by Flowershow, and some that we're intensively working on.

### Markdown

Flowershow supports **CommonMark** and **GitHub Flavoured Markdown (GFM)** syntax, e.g. code blocks, blockquotes, lists, tasks lists and tables.

[[docs/syntax|Learn more ➡]]

### Obsidian wiki links

Flowershow has been designed with Obsidian users in mind and so, currently, it supports internal links to other pages. Links to headings, blocks, and transclusions will also be supported in the future.

[[docs/syntax|Learn more ➡]]

### Custom page layouts and components

You can customize and create new layouts for your pages.

[[docs/layouts|Learn more ➡]]

Also, thanks to MDX support, you can use custom React components within your markdown notes.

[[docs/mdx|Learn more ➡]].

### Tailwind support

Tailwind support makes it easy to style your in-markdown HTML and custom React components.

[[docs/tailwind|Learn more ➡]]

### Mermaid

Displaying Mermaid diagrams within in your notes.

[[docs/mermaid|Learn more ➡]]

### Math

MathJax math exaptions support.

[[docs/math|Learn more ➡]]

### SEO

Support for meta tags for SEO and social sharing.

[[docs/seo|Learn more ➡]]

### CLI tool

Our goal is to make using Flowershow as seamless as possible. To facilitate smooth bootstrapping and upgrading your website we're creating a CLI tool that will take care of all the intricacies related to the whole process of publishing your notes.

[[publish-tutorial|Learn more ➡]]

    👷 There is a lot of other exciting stuff we're working on.
    <a href="/docs/roadmap">Check our roadmap to learn more!</a>

  </div>
</div>

{/** Why the name? **/}

<div className="py-10 sm:px-2 lg:relative lg:px-0">
  <div className="prose dark:prose-invert mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-8 xl:px-12">
    <h2 className="text-center">Why the name?</h2>
    <p>Flowershow is about sharing your digital garden -- putting it "on show" to the world. And what do you have in your garden? Flowers! Hence "Flowershow": it shows off your digital garden to the world!</p>
  </div>
</div>
