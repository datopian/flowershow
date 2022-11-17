---
title: Blog feature design
---

# Job Stories

When creating a website I often want a section of news or blog posts so that people can read the latest updates

- Can have this as a dedicated section
- However, if focused on digital gardens may not want to have to distinguish blog posts from other notes. Why not just have these as "special" notes e.g. there is frontmatter field: `blog: true` or something
- Frontmatter: have to have a date
- Features:
  - chronicle listing in backwards order
  - Pagination?

# Implementation

WIP

# Notes

## 2022-11-17 - Rufus

What is a blog?

- [Technical] A set of posts usually shown in reverse order
- [Needs] show news / updates
- [Needs] usually more polished or "featured" content

MVP and MVI (minimum viable implementation)

MVP - features

- Can make a note into a blog post by adding minimal frontmatter and putting in blog folder or adding `type: blog` (case insensitive?)
- List of blog posts show up under `/blog/` (with pagination)
- Presentation: TODO
- Pagination

Implementation

- Follow Pliny for now with following changes
  - ?? Change pagination to use query params instead of `/page/<nr>` paths. For this, we would only need a single `blog/index.js` page. **2022-11-17 not really sure what we gain from this**
  - Use layout approach instead of having `blog/[...slug]` 👍
  - Use our SEO or pliny's? **Can we use our own SEO (do we need to update it?)**
- Frontmatter for blog: TODO

Specifically

- [ ] Stub a blog page in flowershow.app
- [ ] Create `pages/blog/index.js`
- [ ] Create layout
- [ ] Add document type to content layer
  - [ ] Add layout automatically as a computed field (#todo does this work ok? assume so in contentlayer happens first)
- [ ] ...

#### Questions:

- Do we want to support blog pages in the current (default) template, or do we want to create a new "blog" template? **✅2022-11-17 use the current template**
- Do we provide an example / obsidian template for blog (in docs for now) **✅2022-11-17 👍 yes we do**