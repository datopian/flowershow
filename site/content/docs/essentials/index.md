---
title: Essentials
---

## Frontmatter

You can add meta data to your pages, by adding key-value pairs to frontmatter, e.g.:

```md
---
title: Flower Show
description: A tool for publishing markdown notes.
mymeta: Some info
---
```

The `title` and `description` fields are pulled from the MDX file and processed using `gray-matter`. Additionally, links are rendered using a custom component passed to `next-mdx-remote`.

## Tailwind support

Flowershow comes with built-in [tailwind](https://tailwindcss.com) support on any markdown page for styling your content.

That means you can do things like:

```hmtl
<div className="text-green-500">
Hello World!
</div>
```

Which will be rendered like this:
<div className="text-green-500">
Hello World!
</div>

And it means you have access to the full ecosystem of tailwind features and components.

>[!Note] className rather than class
>
> You may have noticed we used `className` rather than `class` attribute in our html. That's because we are using [[docs/mdx|MDX]] (markdown extended) rather than pure markdown and so we follow React conventions and use `className` 

