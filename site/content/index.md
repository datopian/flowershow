---
layout: unstyled
showToc: false
showSidebar: false
---

import { Hero } from "components/custom/Hero.jsx"
import { WhatIsFlowershow } from "components/custom/WhatIsFlowershow.jsx"
import { Features } from "components/custom/Features.jsx"

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

{/** Features **/}

<Features />

{/** Why the name? **/}

<div className="py-10 sm:px-2 lg:relative lg:px-0">
  <div className="prose dark:prose-invert mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-8 xl:px-12">
    <h2 className="text-center">Why the name?</h2>
    <p>Flowershow is about sharing your digital garden -- putting it "on show" to the world. And what do you have in your garden? Flowers! Hence "Flowershow": it shows off your digital garden to the world!</p>
  </div>
</div>
