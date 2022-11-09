---
title: Callouts
---

With Flowershow you can make use of callouts when using a blockquote. This feature behaves similarly to how Obsidian handles them.

## Example

```md
> [!info] This is cool!
> Here's a callout block.
> It supports **markdown** and [[Internal link|wikilinks]].
```

Renders as:

> [!info] This is cool!
> Here's a callout block.
> It supports **markdown** and [[docs/index|wikilinks]].

## Supported Types:

Flowershow supports 13 different Obsidian callout types (with aliases) like note, abstract, todo, or tip. See this [Obsidian docs page](https://help.obsidian.md/How+to/Use+callouts) to learn more about different callout types.

- note
- tip (alias: hint, important)
- warning (alias: caution, attention)
- abstract (alias: summary, tldr)
- info
- todo
- success (alias: check, done)
- question (alias: help, faq)
- failure (alias: fail, missing)
- danger (alias: error)
- bug
- example
- quote (alias: cite)

> [!info]
> To learn more about the Obsidian extensions refer to the [Obsidian Help site](https://help.obsidian.md/How+to/Format+your+notes).
