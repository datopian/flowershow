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

<section className="bg-white dark:bg-slate-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
    <div className="max-w-screen-md mb-8 lg:mb-16">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Features
      </h2>
      <p className="text-gray-500 sm:text-xl dark:text-gray-400">
        Here are some of the cool features that are currently supported by Flowershow, and some that we're intensively working on.
      </p>
    </div>
    <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
          <svg
            className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">Marketing</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Plan it, create it, launch it. Collaborate seamlessly with all the
          organization and hit your marketing goals every month with our
          marketing plan.
        </p>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
          <svg
            className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">Legal</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Protect your organization, devices and stay compliant with our
          structured workflows and custom permissions made for you.
        </p>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
          <svg
            className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">
          Business Automation
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Auto-assign tasks, send Slack messages, and much more. Now power up
          with hundreds of new templates to help you get started.
        </p>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
          <svg
            className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">Finance</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Audit-proof software built for critical financial operations like
          month-end close and quarterly budgeting.
        </p>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
          <svg
            className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">
          Enterprise Design
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Craft beautiful, delightful experiences for both marketing and product
          with real cross-company collaboration.
        </p>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
          <svg
            className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold dark:text-white">Operations</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Keep your company’s lights on with customizable, iterative, and
          structured workflows built for all efficient teams and individual.
        </p>
      </div>
    </div>
  </div>
</section>

{/** Why the name? **/}

<div className="py-10 sm:px-2 lg:relative lg:px-0">
  <div className="prose dark:prose-invert mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-8 xl:px-12">
    <h2 className="text-center">Why the name?</h2>
    <p>Flowershow is about sharing your digital garden -- putting it "on show" to the world. And what do you have in your garden? Flowers! Hence "Flowershow": it shows off your digital garden to the world!</p>
  </div>
</div>
