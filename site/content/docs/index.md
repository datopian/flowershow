---
title: Roadmap
---

Flowershow is under active development and there is still a lot of good stuff we plan to ship with upcoming releases. Any contributions are more than welcome!

<div className="border-2 border-slate-400 rounded-md px-4 mb-2">
❕ To learn more about current work status on the features and bugs listed below (and more) check out [GitHub issues](https://github.com/flowershow/flowershow/issues) in Flowershow repo.
</div>

## Planned features 🚧
Here are **some** of the features we are currently working on. If you think we might have missed something important, or you just have an idea for some cool enhancement, let us know by creating [a GitHub issue in our repo](https://github.com/flowershow/flowershow/issues) (if it doesn't already exist). We would love to hear your opinion!

**>>>>>>>>>TODO sort these by priority (roughly)**

### Text highlighting
Highlighting text wrapped in double `=`. 

### Multiline blockquotes
Breaking quotes that span multiple lines. (Currently rendered on a single line.)

### Math
Support for inline and block math formulas.

### Comments
Hiding content wrapped in double `%`. (Currently parsed as plain text and displayed.)

### Inline Code
Correct rendering of inline code. (Currently only code blocks are formatted correctly.)

### Callouts
Support (and different styling) for different callout types.

### Table of contents
Auto injecting a table of contents on top of pages specified by the user.

### File embeds
Displaing files embedded with `![[filename.png]]` syntax.

### Knowledge graph
Interactive knowledge graph with clickable nodes.

### Notes previews
Wikipedia-like internal links previews on hover.

### Blog posts section
Confiurable blog posts section on the frontpage, with previews (cards) of user-selected, featured pages.

### Themes
A set of different starter themes to choose from.
Support for dark & light mode.

### Forward links
Optional layout component with a list of forward links used on the page.

### Back links
Optional layout component with a list of backward links pointing to the page.

### Excalidraw support
Displaying excalidraw sketches embedded in notes.

### CLI tool
Our goal is to make using Flowershow as seamless as possible. To facilitate smooth bootsraping and upgrading your website we plan to create a CLI tool, that will take care of all the intricacies related to the whole process of publishing your notes.

### No-code configuration
Since Flowershow is built on top of well-known tools - React, Next.js and Tailwind - it should be pretty easy to tinker with for anyone familiar with this stack. However, we believe this time could be spent more efficiently, i.e. on polishing your content. Thus, we want to provide you with just enough configuration options to tailor your website to your style, which you can set up by adjusting just one config file (or using our CLI tool in the future) and leave more sophisticated customizations to all the nerds our there (PS. we love nerds 🤓).

## Known bugs 🐛

### Empty pages cause build error
For know, you should not have any empty markdown pages in your content directory.

### Broken internal links to index pages
Since `index.md` is treated by Obsidian like any other page, when you try to create an internal link to it in Obsidian, it will look like this: `[[some_folder/index]]`. This in turn will be converted to an anchor tag pointing to the non-existing URL, e.g.: `http://localhost:3000/some_folder/index`, whereas it should be: `http://localhost:3000/some_folder`.
#### Temporary workaround
Manually remove `/index` part from the link created by obsidian, like so: `[[some_folder/index]]` -> `[[some_folder]]`.