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

***

## Right Hand Side (RHS)

Flowershow supports adding a Table of Contents (ToC) sidebar (RHS) to your pages which can be easily setup in your config file.

### ToC on all pages
To enable ToC on all the markdown pages (except homepage), simply set the table of contents variable to true in your config file as seen below:

```js
// config.js

const config = {
  tableOfContents: true
}
```

### ToC for custom pages/folders

Sometimes there is a need for table of contents only on specific pages, for example docs or blog pages. Flowershow also supports enabling ToC only for these specific defined page/pages by passing that directory or path from your content folder in an array as seen below.

```js
// config.js

const config = {
  tableOfContents: ["docs", "blog", "about"]
}
```

The above will render the ToC only for docs, blog and about page.