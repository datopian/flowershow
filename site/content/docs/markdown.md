# Markdown

Flowershow supports all the standard markdown plus some extras.

## Auto-linking

```
https://flowershow.app
```

https://flowershow.app

## Markdown Tables


```
| a | b |
|---|---|
| 1 | 2 |
```

Renders as:

| a | b |
|---|---|
| 1 | 2 |

## Checklists

```
* [x] one thing to do
* [ ] a second thing to do
```

Renders as:

* [x] one thing to do
* [ ] a second thing to do


## Footnotes

```
here is a footnote reference[^1]

[^1]: a very interesting footnote.
```

here is a footnote reference[^1]

[^1]: a very interesting footnote.

## Frontmatter

Posts can have frontmatter like:

```
---
title: Hello World
author: Rufus Pollock
---
```

The title and description are pulled from the MDX file and processed using `gray-matter`. Additionally, links are rendered using a custom component passed to `next-mdx-remote`.
