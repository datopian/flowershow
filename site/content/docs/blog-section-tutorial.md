---
title: Create a blog/news/articles site with Flowershow!
description: Create a blog/news/articles site with Flowershow!
type: Blog
created: 2023-01-25
authors: [philippe-du-preez]
---

If you're writing blogs, news, or articles on your site, then this is for you! By using [Flowershow](https://flowershow.app/) as a Next.js template, this is easier than ever!

You probably would like to list all your posts in an elegant way somewhere on your website and display each of them a certain way, including displaying the authors. We are covering **all** of this in this tutorial.

In no time you will have a blog layout looking like this:

![[blogs-list.png]]

And blog pages looking like this:

![[blog.png]]

## Marking files as `Blog`

You can assign `Blog` type to selected documents, by specifying the type in their frontmatter. This way you'll be able to fetch and display them on any of your pages by using our `BlogsList` component.

```md
---
title: My first blog post
type: Blog
---

Blog content here
```

## Blog post frontmatter fields

- `date` - date that will be displayed on the blog page and that will be used to sort blog search results
- `authors` (optional) - authors of the blog that will be displayed on the blog page

```md
---
title: Blog post title
date: 2022-11-29
authors: [John Doe, Jan Kowalski]
---

Blog content here
```

## Marking all files in a given folder

By default, all files inside the `<your-content-folder>/blog` will be treated as blog/news/article posts.

So instead of adding `type: Blog` in all your posts' frontmatter, you can put all your blog posts in `<your-content-folder>/blog` instead:

```sh
my-digital-garden
├── blog
│   ├── index.md
│   ├── my-blog-post2.md
│   ├── my-blog-post3.md
│   └── my-blog-post.md
├── getters
│   └── blogs.js
├── config.js
└── index.md
```

## `BlogsList` component

In order to list all your blog posts on a given page, you can use our `BlogsList` component and pass it a list of your blog posts. It's globally available, so you don't need to import it in your mdx file.

The `BlogsList` component requires a `simple` page layout, which you need to specify in the frontmatter of your blogs index page.

```
---
layout: simple
---
<BlogsList blogs={[]}/>
```

In addition to that, you also need to create a getter function that will fetch all your blog posts, e.g.:

```
// <your-content-folder>/getters/blogs.js
import { allBlogs } from "contentlayer/generated";
export default function getBlogs() {
  return allBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

...which you can then pass to the `BlogsList` component:

```
---
layout: simple
data:
  - blogs
---
<BlogsList blogs={blogs}/>
```

## Blog authors

Flowershow will display authors from the `authors` frontmatter list field below the blog title. It will also try to link each author to the corresponding author's page, if such a page exists.

> [!note]
> By default, Flowershow treats all pages in `<your-content-folder>/people` directory as author pages (as well as each page with `type: Person` in its frontmatter).

Flowershow will look for an author page with the `name` frontmatter field, or a slug (file-name) matching the value provided in the `authors` list.

For more in depth information on this, go to: https://flowershow.app/docs/blog#blog-authors

### Blog author frontmatter fields

Example author page in `<your-content-folder>/people/john-doe.md`:

```md
---
name: John Doe (required)
avatar: path/to/johns-avatar.jpg
---
```

Now you can reference John in one of your blog pages using e.g. the name you've set like so:

```md
---
title: Some blog page
date: 2022-12-12
authors: [John Doe]
---
```

That's it!

![[blogs-list.png]]

You can click on each post to see it in its blog layout format.

For more details, you can visit: https://flowershow.app/docs/blog
