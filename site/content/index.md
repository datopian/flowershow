---
layout: unstyled
---

import { Hero } from "../components/custom/Hero.jsx"
import { WhatIsFlowershow } from "../components/custom/WhatIsFlowershow.jsx"
import { FlowershowPublish } from "../components/custom/FlowershowPublish.jsx"

<Hero />
<WhatIsFlowershow />
<FlowershowPublish />


<div className="py-10 sm:px-2 lg:relative lg:px-0" id="how">
  <div className="prose dark:prose-invert mx-auto max-w-6xl px-4 lg:max-w-6xl lg:px-8 xl:px-12">
    <h2 className="text-center">
      Publish on your own
    </h2>
    <p className="text-center">
      🚧 Coming soon! 🚧
    </p>
    <p>
      We are actively trialling Flowershow before wide release. If you'd like to help us test or be first on the list to use it please sign up using the form at the top of this page.
    </p>
    <div className="relative grid grid-cols-1 gap-6 my-4 lg:my-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
            1
          </div>
          <h3 className="m-0">
            You have a folder with your Markdown files and you want to publish it on your favorite cloud provider.
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
            Run `npx flowershow generate` in this folder...
          </h3>
        </div>
        <p>
        After running this command, you'll be shown some basic configuration prompts. At the end Flowershow CLI app will generate your website's files inside `./flowershow` directory.
        </p>
      </div>
      <div className="lg:hidden">
        <img src="/assets/images/npx.png" alt="" className="m-0 lg:max-h-[20rem]"/>
      </div>
      <img src="/assets/images/arrow.png" alt="" className="hidden lg:block h-[10rem] absolute left-[38%]  -rotate-[45deg] bottom-0 translate-y-[9rem]"/>
    </div>
    <div className="relative grid grid-cols-1 gap-6 my-4 lg:my-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-100 text-xl text-sky-600 ring-2 ring-white dark:border-sky-900 dark:bg-[#163C57] dark:text-sky-500 dark:ring-gray-950">
            3
          </div>
          <h3 className="m-0">Now, you can deploy the site to the static site host of your choice 🎊</h3>
        </div>
      </div>
      <div>
        <img src="/assets/images/result_mac_dark.png" alt="" className="rounded-lg shadow-xl m-0" />
      </div>
    </div>
  </div>
</div>

{/* Features (tb replaced with something nicer)*/}

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

{/* Why the name? */}

<div className="py-10 sm:px-2 lg:relative lg:px-0">
  <div className="prose dark:prose-invert mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-8 xl:px-12">
    <h2 className="text-center">Why the name?</h2>
    <p>Flowershow is about sharing your digital garden -- putting it "on show" to the world. And what do you have in your garden? Flowers! Hence "Flowershow": it shows off your digital garden to the world!</p>
  </div>
</div>
