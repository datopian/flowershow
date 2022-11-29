---
title: Blog support
created: 2022-10-10
---

Apart from the `Page` document type, which Flowershow uses for all your fs content files by default, you can also use the `Blog` type for your blog posts. This way you'll be able to fetch and display them on any of your pages by using our `BlogsList` component (or you can create a custom one).

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
