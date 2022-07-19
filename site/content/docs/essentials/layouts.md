# Layouts

You can customize the looks of your pages, by creating custom layouts (which are basicaly React components).


By default, all pages will use the **Docs** layout (`layouts/docs.js`)

See how each of these pages renders differently:
- [[layout-blog|Blog layout example page]]
- [[layout-unstyled|Unstyled layout example page]]
- [[layout-docs|Docs layout example page]]

In order to use layout other than the default one (see [[layout-docs|Docs layout demo]] for reference), we need to specify the name of the layout we want to use in the frontmatter:

```md
---
title: I'm rendered using Unstyled layout!
layout: unstyled
---
```

Note we didn't need to specify `layout: docs` in the frontmatter (see [[layout-unstyled| Unstyled layout demo page]] for comparison). 

```md
---
title: I'm rendered using Docs layout!
---
```

This is because **Docs** layout is the default layout of this template.


## Tailwind support

<div className="text-center font-serif">

<div className="text-3xl">
# I'm styled with Tailwind !
</div>

<div className="text-lg py-3 ">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</div>

</div>