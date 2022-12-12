---
title: Blog support
---

Apart from the `Page` document type, which Flowershow uses for all your content files by default, you can also use the `Blog` type for your blog posts. This way you'll be able to fetch and display them on any of your pages by using our `BlogsList` component (or you can create a custom one).

## Marking files as `Blog`

### Marking all files in a given folder

By default, all files inside the `<your-content-folder>/blog` will be treated as blog posts. If you have your blog posts in a different folder, you can configure it using a `blogDir` field in your `config.js` file. For example, if you have your blog articles in `<your-content-folder>/articles`:

```json
...
"blogDir": "articles"
...
```

### Marking single files

You can also assign `Blog` type to selected documents, by specifying the type in their frontmatter:

```md
---
title: My first blog post
type: Blog
---
```

## Blog post frontmatter fields

- `created` (required) - date that will be displayed on the blog page and that will be used to sort blog search results
- `authors` (optional)

```md
---
title: Blog post title
created: 2022-11-29
authors: [John Doe, Jan Kowalski]
---
```

## `BlogsList` component

In order to list all your blog posts on a given page, you can use our `BlogsList` component and pass it a list of your blog posts.

The `BlogsList` component requires a `simple` page layout, which you need to specify in the frontmatter of your blogs index page.

```
---
layout: simple
---

import { BlogsList } from "components/BlogsList.jsx"

<BlogsList blogs={[]}/>
```

In addition to that, you also need to create a getter function that will fetch all your blog posts, e.g.:

```
// <your-content-folder>/getters/blogs.js
import { allBlogs } from "contentlayer/generated";

export default function getBlogs() {
  return allBlogs.sort((a, b) => new Date(b.created) - new Date(a.created));
}
```

...which you can then pass to the `BlogsList` component:

```
---
layout: simple
data:
  - blogs
---

import { BlogsList } from "components/BlogsList.jsx"

<BlogsList blogs={blogs}/>
```

## Blog authors

Flowershow will display authors from the `authors` frontmatter list field below the blog title. It will also try to link each author to the corresponding author's page, if such a page exists.

> [!note]
> By default, Flowershow treats all pages in `<your-content-folder>/people` directory as author pages (as well as each page with `type: Person` in its frontmatter).
> You can configure path to the folder with your authors pages by setting `peopleDir` property in your config.js file.

Flowershow will look for an author page with the `id` or `name` frontmatter fields, or a slug (file-name) matching the value provided in the `authors` list. If no matching page have been found, the provided string will be used. If the page has been found, the author's name and avatar (if set) will be displayed and it will be linked to the author page.

### Blog author frontmatter fields

- `id` (optional) - if set, id can be used in `authors` frontmatter field, instead of slug or `name` (and it will take precedence over both)
- `name` (required) - it will be displayed next to the avatar
- `avatar` (optional) - if you don't specify it, a placeholder image will be used (path should be relative to your content folder)

Example author page in `<your-content-folder>/people/john-doe.md`:

```md
---
id: john123
name: John Doe (required)
avatar: path/to/johns-avatar.jpg
---
```

Now you can reference John in one of your blog pages using e.g. the id you've set like so:

```md
---
title: Some blog page
created: 2022-12-12
authors: [john123]
---
```

...or by using the slug (file name):

```md
---
title: Some blog page
created: 2022-12-12
authors: [john-doe]
---
```

...or just by using his name:

```md
---
title: Some blog page
created: 2022-12-12
authors: [John Doe]
---
```

### Default author

If most of the time the author of the blog is the same - for example it's you - you can configure a default author in your `config.js` file using `defaultAuthor` property. It's value should be the `id`, the slug (file name) or the `name`. For example:

```js
// <your-content-folder>/config.js
...
defaultAuthor: "john-doe"
...
```

This way anytime you don't define `authors` in the frontmatter, the default author will be displayed.
