---
layout: unstyled
---

<div className="overflow-hidden -mb-32 mt-[-4.5rem] pb-32 pt-[4.5rem] lg:mt-[-4.75rem] lg:pt-[4.75rem]">
  <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
      <div className="relative md:text-center lg:text-left">
        <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-6xl tracking-tight text-transparent">Publish your obsidian notes, beautifully.</p>
        <p className="mt-4 text-3xl dark:text-white tracking-tight">For free, no coding.</p>
        <p className="mt-4 text-2xl tracking-tight text-slate-400">Turn your markdown notes into an elegant website and tailor it to your needs. Flowershow is easy to use, fully-featured, obsidian compatible and open-source.</p>
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
      <div className="relative lg:static xl:pl-10">
        <img src="/assets/images/hero.svg" alt="" className="w-11/12" />
      </div>
    </div>
  </div>
</div>

<div className="prose dark:prose-invert mx-auto py-20">

## Crafted for Obsidian

Works with your existing Obsidian notes out of the box. No need to modify the syntax or change file layout. Flowershow supports internal links, backlinks, math, mermaid, callouts and more.

Not an obsidian fan? Flowershow will work with any CommonMark or GFM markdown files.

## Elegant & Functional

Clean and elegant default theme with dark and light mode, hero, navbar, backlinks section and much more.

## Customize and extend (if that’s your thing!)

Want to spice things up? Flowershow is easy to extend, tweak and customize and is built on standard, modern web stack – React, NextJS and Tailwind.

## Backed by a team of data geeks

We’ve been building content and data driven products for over a decade, and we’re passionate about sharing knowledge and ideas with others.
We love markdown as much as we love open-source (which is a lot!).

## Why the Name?

Flowershow is about sharing your digital garden -- putting it "on show" to the world. And what do you have in your garden? Flowers! Hence "Flowershow": it shows off your digital garden to the world!

</div>
