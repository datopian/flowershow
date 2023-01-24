---
title: Table of contents
---

You can add a table of contents to your markdown pages by including a heading with `Table of contents` string in it (case insensitive).

The table of contents will only include headings placed below the `Table of contents` heading.

**Example:**

```md
# Some blog page

## Table of contents

## Some heading

## Another heading

### Yet another heading
```

**Renders as:**

# Some blog page

## Table of contents

## Some heading

## Another heading

### Yet another heading

---

## Right Hand Side (RHS)

Flowershow supports adding a Table of Contents (ToC) sidebar (RHS) to your pages which can be easily setup in your config file.

![[rhs-toc.jpg]]

### ToC on all pages

To enable ToC on all the markdown pages, simply set a `tableOfContents` variable to true in your config file as shown below:

```js
// config.js

const config = {
  tableOfContents: true,
};
```

### Disabling / Enabling ToC for a single page

You can also add/remove table of contents for specific pages by setting `showToc` to **true** or **false** in the page's frontmatter like below.

```md
---
showToc: true
---
```
