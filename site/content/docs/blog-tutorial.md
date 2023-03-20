---
title: Blog support
description: Learn how to create an index page for your blog
type: Blog
date: 2022-11-29
authors: [Ola Rubaj]
---

If you're writing a blog, or just write some blog posts for your site from time to time, you probably would like to list them all in an elegant way somewhere on your website. This is what we're going to do in this tutorial.

## Creating a blog posts

First, let's create an example blog post file in our content folder - `my-blog-post.md`.

```sh
my-digital-garden
├── config.js
├── index.md
└── my-blog-post.md
```

Now, in order for Flowershow to pick this file up as one of your blog files, we need to add `type: Blog` to it's frontmatter. Let's also add a creation date (required) of our blog post, a short description and its authors.

```
---
title: My blog post
description: My first Flowershow blog post!
type: Blog
date: 2022-11-29
authors: [John Doe]
---

## My blog post about Flowers
```

Let's add a few more blog posts, so that we have something to display on our blog index page.

```sh
my-digital-garden
├── config.js
├── index.md
├── my-blog-post.md
├── my-blog-post2.md
└── my-blog-post3.md
```

## Creating a blog index page

Let's create a page which will display a list of all our blog posts. For now we'll call it `blogs.md`.

```sh
my-digital-garden
├── config.js
├── index.md
├── blogs.md   <---
├── my-blog-post.md
├── my-blog-post2.md
└── my-blog-post3.md
```

Since we're going to use Flowershow's `BlogsList` component, we also need to use a `simple` layout for this page so that the component renders correctly. We can specify it in `blogs.md` page frontmatter, like so:

```md
---
title: Blogs
layout: simple
---
```

Before we use the `BlogsList` component on this page, we also need to have a list of all our blog posts, so that we can pass it to the component. In order to do that, we need to create the `getters` folder with a file containing a function which fetches all the blog posts. We can import them from `contentlayer/generated`, like so:

```
// my-digital-garden/getters/blogs.js
import { allBlogs } from "contentlayer/generated";

export default function getBlogs() {
  return allBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

Now, to make the blogs list available on this page we need to list a name of the file we have just created as one of the `data` frontmatter field elements. This way the list of our blog posts willl be available on this page under the variable of the same name - `blogs`.

> [!note]
> The name of the getter function we've just created needs to be the same as the name we pass to `data` frontmatter field.

```md
---
title: Blogs
layout: simple
data:
  - blogs
---

import { BlogsList } from "components/BlogsList.jsx"

<BlogsList blogs={blogs}/>
```

That's it! We can now see a list of all the blog posts we've just created when we visit http://localhost:3000/blogs. You can click at each to read its content.

![[blogs-list.png]]

## Using all files in a given folder

In the above example we have manually marked some files as blog posts by using a frontmatter `type` field and setting it to `Blog`. However, by default, all files inside the `<your-content-folder>/blog` directory will be treated as blog posts by Flowershow.

> [!note]
> If you want, you can also use a different folder by setting `blogDir` in your `config.js` file. Read [[blog]] to learn more.

So, let's create this folder and move all our blog posts there. Let's also move our `blogs.md` page there and rename it to `index.md` so that its available under `/blog`. Each blog post will be available under `/blog/my-blog-post*.md`.

```sh
my-digital-garden
├── blog
│   ├── index.md
│   ├── my-blog-post2.md
│   ├── my-blog-post3.md
│   └── my-blog-post.md
├── getters
│   └── blogs.js
├── config.js
└── index.md
```
