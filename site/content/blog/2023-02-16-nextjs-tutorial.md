---
title: Jumpstart a content-driven NextJS site with Flowershow
description: This article will guide you through the process of building a basic static blog with Next.js using the Flowershow template.
created: 2023-02-16
authors: [philippe-du-preez]
---

Have you ever considered creating a blog or documentation site for your open-source library or personal project?

This article will guide you through the process of building a basic static blog with Next.js using the Flowershow template.

## What is Flowershow

[Flowershow](https://flowershow.app/) is a versatile NextJS template that you can use to quickly create a content-driven website from Markdown/MDX files with ease.

Flowershow uses TypeScript, Contentlayer and Tailwind, which makes it a frictionless experience adding content and styling it. You can deploy your website in seconds on Netlify, Vercel or any other hosting platforms. Whether you are looking to build a blog, a documentation rich site or any other content driven site, Flowershow makes this very easy.

Flowershow uses [Contentlayer](https://www.contentlayer.dev/) for local Markdown content. By defining document schemas, Contentlayer can generate JSON data that is validated (making it type-safe) and can be imported from anywhere.

## Why use markdown and NextJS

When it comes to writing content, markdown offers a number of benefits over traditional HTML. Markdown is a lightweight markup language that is easy to read and write, making it an ideal choice for content creators. It also allows for a separation of content from presentation, making it easier to manage the look and feel of your site. Additionally, markdown files can be version-controlled, allowing for a history of changes to be tracked and reverted to earlier versions if necessary.

Combining Next.js with markdown has the potential to streamline the process of building and maintaining content-driven websites. Next.js provides the infrastructure for delivering fast and scalable sites, while markdown makes it easy for content creators to write and manage their content. Whether you're building a blog, portfolio, or any other type of content-driven site, using a template like Flowershow that includes the functionality of Next.js and markdown is a powerful combination that is definitely worth considering.

But what benefits does Flowershow add to vanilla Next.js? Well let's take a look at the features it has to offer.

## Flowershow template features

Flowershow comes with the following useful features out of the box:

- ✏️ **[Blog support](https://flowershow.app/docs/blog)** - provides a pre-built structure and functionality for creating and managing blog posts, including routing and rendering of content, which saves time and effort in the development process.
- 📑 **[Table of contents](https://flowershow.app/docs/table-of-contents)** - makes it easier to navigate through long pages or articles, improves the user experience, and increases the likelihood that users will engage with the content
- 💬 **[Page comments](https://flowershow.app/docs/comments)** - provides a way for users to engage in discussions and share their thoughts and feedback on the content
- 🔍 **[Full text search](https://flowershow.app/docs/search)** - allows to quickly and easily find the information they are looking for by searching through the site's content
- ✨ **[Light/Dark mode and basic theming](https://flowershow.app/docs/custom-theme)** - allows for easy customization of the site's appearance by providing a centralized and flexible way to manage and apply visual styles, making it easier to maintain a consistent brand identity
- 🎨 **[Tailwind support](https://flowershow.app/docs/tailwind)** - utility-first approach to styling, allowing for fast and efficient development of responsive and customizable user interfaces without having to write custom CSS
- ⬇️ **[Power of MDX](https://flowershow.app/docs/mdx)** - allows for the creation of interactive and dynamic content by combining Markdown syntax and JSX components
- 🤖 **[SEO support](https://flowershow.app/docs/seo)** - helps to increase the visibility and discoverability of the site by optimizing its content and structure for search engines
- 🔢 **[MathJax support](https://flowershow.app/docs/syntax#math)** - ensures that mathematical content is properly formatted and easy to read, making it more accessible to users and improving the overall quality of the content

## Examples of sites built using Flowershow template

https://www.datopian.com/

![[datopian.png]]

https://flowershow.app/

![[dark-theme.jpg]]

https://lifeitself.org/

![[lifeitself.png]]

https://datahub.io/

![[datahub.png]]

## Creating a new Next.js project using Flowershow template

In order to create a new Next.js project using the Flowershow template, you can use Next.js' `create-next-app` CLI tool.

Run the following command in the terminal and then pass a name of your project when prompted (we'll name it `my-flowershow-app` for the purpose of this tutorial).

```shell
npx create-next-app@latest --example https://github.com/flowershow/flowershow/tree/main/packages/template
```

After the command has finished running, your project structure should look similar to this:

```shell
my-flowershow-app
├── components
├── config
├── layouts
├── lib
├── pages
├── public
├── scripts
├── styles
├── contentlayer.config.ts
├── next.config.mjs
├── tailwind.config.cjs
├── package-lock.json
├── package.json
├── ...
└── README.md
```

The only thing that's missing is a `/content` folder with some markdown files you'd like to publish.

If you already have a folder with some files, e.g. your blog pages, you can move them to your Flowershow project, like so:

```
mv <path-to-my-content-folder> my-flowershow-app/content
```

Your `index.md` file in the root of the `content` folder will be your home page.

> [!NOTE]
> Check [Next.js documentation](https://nextjs.org/docs/api-reference/create-next-app) to learn more about this command and other options you can run it with.

You should be able to run `npm run dev`, where Contentlayer will fetch all the needed data and transform that data into structured content. Content is structured using a custom schema defined in `contentlayer.config.ts`. Once content is fetched and transformed, it is used to populate various parts of the website , such as text, images, and other media.

### Basic configuration

Flowershow supports setting common configuration values using a `config.js` file, which should be placed in the root of the `/content` folder. With it you can customize some things like website title, navigation links in the navbar, or set your google analytics key.

Let's create one:

```shell
touch my-flowershow-app/content/config.js
```

Then add some new configuration to your project eg.

```jsx
const config = {
  // title will be displayed on the top of your site
  title: "My Awesome Blog",
  // adding a description helps with SEO
  description: "This is my awesome blog built with Flowershow",
  // author of site displayed on the bottom of your site
  author: "John",
  // logo image
  authorLogo: "/images/logo.svg",
  // url to author website
  authorUrl: "https://john.app/",
  // links to the pages you want to link to in the navbar
  navLinks: [{ href: "/about", name: "About" }],
};

export default config;
```

> [!NOTE]
> If you want to learn more about other available configuration options, see https://flowershow.app/docs/config.

### Adding blog/news/tutorials pages

By default, all files inside `content/blog` will be treated as blog posts. Let's create a post now!

We can add a blogpost `my-blog-post.md` in our `content/blog` folder so your file structure will look like:

```shell
my-flowershow-app
├── content
|   └─ blog
|      └─ my-blog-post.md
└── ...
```

with the following frontmatter:

- `title` - title that will be displayed on blog home page and blog post
- `description` - description will be displayed on the page with all blogs listed (which we'll create later)
- `created` (required) - date that will be displayed on the blog page and that will be used to sort blog search results
- `authors` (optional) - This will search for authors and display their images on the post ([Authors docs](https://flowershow.app/docs/blog#blog-authors))

So your `my-blog-post.md` file looks like this:

```md
---
title: Blog post title
description: This blog post is about how to write a blog
created: 2022-11-29
authors: [John Doe, Jane Doe]
---

All our content for the post will go here.
```

### Creating a home page for your blogs/news/tutorials pages

In order to list all your blog posts on a given page, you can use our `BlogsList` component and pass it a list of your blog posts. It's globally available, so you don't need to import it in your mdx file.

The `BlogsList` component requires a `simple` page layout, which you need to specify in the frontmatter of your `content/blog/index.md` page.

```
---
layout: simple
data:
  - blogs
---

<BlogsList blogs={blogs}/>
```

In addition to that, you also need to create a getter function that will fetch all your blog posts at `content/getters/blogs.js` like this:

```
import { allBlogs } from "contentlayer/generated";

export default function getBlogs() {
  return allBlogs.sort((a, b) => new Date(b.created) - new Date(a.created));
}
```

...which you can then pass to the `BlogsList` component:

More information on [BlogList](https://flowershow.app/docs/blog#blogslist-component)

Your blog index page will look something like this:

![[fshowblogindex.png]]

## Custom data getters

The `blogs.js` file is just one example of using getter functions. If you want to fetch data from an external API or you want to use your markdown files as a dataset, you can use any special data frontmatter field to define names of your custom getter functions, which will be called before your page is rendered. This page will then be able to access the values returned from these getters under variables of the same names. You can read more information on getters functionality [here](https://flowershow.app/docs/mdx#use-data-field-type-for-custom-data-getters).

## Conclusion

Using [Flowershow](https://flowershow.app/) as a template to make a content driven site takes the hassle out of implementing a lot of useful features from scratch, so give it a try if you just want to get started getting your content online!

[Sign up for Flowershow's newsletter](https://flowershow.app/)

[Join Flowershow's Discord](https://discord.com/invite/cPxejPzpwt)
