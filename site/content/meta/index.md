# Designs and Plans for Flowershow

# Features

In very rough order of likely priority in each section

* [x] Markdown - full markdown plus footnotes
* [x] MDX support for rich component additions. Built on MDX so you can use everything Next.JS provides out of the box including full React e.g. want a custom front page? No problem!
  * [ ] Documentation / examples
- [x] Tailwind: built on tailwind so easy to adjust and customize
* [ ] SEO support
* [ ] Basic site config
* [ ] Basic theme e.g. navbar and footer
* [ ] Analytics - google - this could be first test for componentization (or maybe just live with default for now)
* [ ] theme customization
* [ ] Code highlighting - https://github.com/timlrx/rehype-prism-plus
* [ ] Maths syntax (mathjax etc)
* [ ] Mermaid
- [ ] Citation / Bibliographic references: use standard `[@jones-2020]` style bibliographic citations in markdown (compatible with Obsidian zotero, R markdown etc) - https://github.com/timlrx/rehype-citation
* [ ] Desktop and mobile: beautiful, responsive theme out of the box
* [ ] Full text search: search quickly and easily.
* [ ] social preview links e.g. twitter link turns into a nice twitter card. Ditto for youtube.

Obsidian feature compatibility

* [ ] support Obsidian wiki-link extensions to markdown
* [ ] Callouts / admonitions - https://help.obsidian.md/How+to/Use+callouts
* [ ] Backlinks
* [ ] Forward links
* [ ] Network graph
* [ ] Excalidraw
- [ ] How do we support obsidian plugins in general

Theme

* [ ] Dark/light theme
* [ ] Wide images
* [ ] [[#Linkable headings]]
* [ ] frontmatter support e.g. of standard fields
  - author
  - date (published)
  - status: 
  - publish: true/false

Data stuff

* [ ] table preview
* [ ] graphs

# Content

## Tutorials and Howtos

* [ ] Get started (self-service and deploy)
* [ ] Custom components in markdown pages

Blogs

* [ ] Why Flowershow

Advanced

* [ ] Markdown extension addition (howto do that)
* [ ] Content structuring and contentlayer (latter more for devs)


## Details
### Linkable headings

https://tailwindcss.com/docs/responsive-design

- Only shows when you hover the heading
- Nice symbol
- Shows to left of text
- Only shows on desktop

![](https://i.imgur.com/6N0yDUS.png)

### Table of contents

Again tailwindcss.com is excellent. For example: https://tailwindcss.com/docs/customizing-colors

Two contents sections:

- LHS: full site table of contents
- RHS: table of contents for this page

![](../assets/Pasted%20image%2020220323185414.png)

Code: https://github.com/tailwindlabs/tailwindcss.com/blob/8b9f69a93a5a1b055dc8c1dcfa06f5ca2863b89c/src/layouts/ContentsLayout.js


### Obsidian markdown syntax

What's needed:

- [ ] `[[Internal link]]`
- [ ] `[[Internal link|With custom text]]`
- [ ] `[[Internal link#heading]]`
- [ ] `[[Internal link#heading|With custom text]]`

🚩 Not sure these are needed to start with

- [ ] `![[Embed note]]`
- [ ] `![[Embed note#heading]]`

#### Research

https://obsidian.md/features

GitHub Flavored Markdown (GFM) extensions

```
- | Markdown **table** |
- **- [x] Task list**
```

Extra Obsidian:

```
-   **#Tags**
-   $$**LaTeX** math$$
-   [^**Footnotes**]
-   **[[Internal links]]**
-   **![[Filename]]** to embed notes and other files
```