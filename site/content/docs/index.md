---
title: Get Started with Flowershow
---

## What is Flowershow?

Flowershow is an open-source tool for easily converting your markdown files into an elegant website. It's built on a standard, modern web stack – **React**, **Next.js**, and **Tailwind** and shipped with a basic **default theme** to get you started with just a few clicks. 

Flowershow supports **CommonMark** and **GitHub Flavored Markdown**, but also many **Obsidian-specific syntax elements**, like internal links or footnotes[^1].
[^1]: Support for some GFM and Obsidian-specific syntax elements is still a work in progress. See our [[roadmap]] to learn more.

## Getting Started

🚧 Coming soon! 🚧

We are actively trialling Flowershow before wide release. If you'd like to help us test or be first on the list to use it please sign up:

<form method="POST" name="get-updates" data-netlify="true" action="/subscribed" className="mt-3 sm:flex">
  <label htmlFor="email" className="sr-only">
    Email address
  </label>
  <input
    name="email"
    type="email"
    required="required"
    placeholder="Enter your email"
    className="block w-full px-2 py-4 sm:py-0 text-base rounded-md bg-slate-200 dark:bg-slate-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900 sm:flex-1"
  />
  <input type="hidden" name="form-name" value="get-updates" />
  <button type="submit"
    className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-sky-300
      hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto [&>p]:m-0"
    >
      Notify me
  </button>
</form>

NB: Flowershow is already fully functional and in use on several sites -- including this one!

## Guides

1. [[docs/config|Basic configurations with `config.js`]]
2. [[syntax|Markdown syntax support]]
3. [[mdx|MDX support]]
4. [[tailwind|Styling with Tailwind]]
5. [[table-of-contents|Table of contents]]
6. [[contentlayer|Contentlayer configuration]]
7. [[layouts|Layouts]]
8. [[assets|Assets]]
9. [[analytics|Analytics]]
10. [[seo|SEO configuration]]
