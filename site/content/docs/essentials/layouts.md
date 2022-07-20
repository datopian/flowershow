# Layouts

Layouts are simply React components, that wrap around your page's content. By default, all your notes will use the **Docs** layout (`layouts/docs.js`), but if you don't like it or would like to use a different layout but just for some of your notes, you can create your own custom layout.

## Changing page layout
All layouts are located in `/layouts` folder. In order to use layout other than the default one, we need to specify the name of the layout we want to use in the frontmatter. The name of the layout is the same as its file name.

For example, a page with the following frontmatter...
```md
---
title: I'm rendered using Unstyled layout!
layout: unstyled
---
```

...will look like this: [[layout-unstyled|Unstyled layout example page]].

For reference, the page you are reading at the moment is rendered using the default **Docs** layout, even though we haven't explicitly stated `layout: docs` it in the frontmatter.

It is possible to configure the default layout by tweaking the Configlayer config file. Check advanced/contentlayer page to learn more.

## Creating a custom layout

<div className="border-2 border-slate-400 rounded-md px-4 mb-2">
❕ Basic knowledge of React would help here, but you can surely figure this out by tweaking our examples.
</div>
As an example, let's create a layout for our blog posts.

First, we need to create a new component file in `/layouts` folder, called `blog.js`
```js
// layouts/blog.js
export default function BlogLayout ({ children }) {
	return (
		<article className="text-center font-serif prose prose-invert mx-auto p-6">
			<section>
				{children}
			</section>
		</article>
    );
}

```

At this moment, we can already use this layout for one of our pages, by updating its frontmatter, like so:

```md
// some md page with blog content
layout: blog
```

## Passing metadata to layouts

Most probably you have many different types of notes in your vault - blog posts, daily journals, research notes or maybe even recipes. It would be nice to change the way they are displayed on your website, depending on what type they are.

In order to do this, you can create a custom Contentlayer document type, that will be used to parse files specified in the `filePathPattern` field. 

Let's continue with our example of a basic `blog.js` layout. At this point it doesn't really do much, apart from changing the text style a bit, and in order to use it we have to add `layout: blog` to a frontmatter of every blog page. This may be just fine if you are creating a layout that will only be used ocasionally, but if for example you have a whole folder of your blog posts, it would be good to apply the same layout to all of them. You might also want to keep some meta data for each blog post, like date or authors, if you're collaborating on your content with somebody and then display this information somewhere on your blog post.

To facilitate this, let's create a custom Contentlayer document type - `Blog`.

```js
// ...

const blogFields = {
  date: { type: "string" },
  authors: {
	  type: "list",
	  of: { type: "string" }
	},
  layout: { type: "string", default: "blog" },
}

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blogs/*.md*",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    ...blogFields,
  },
  computedFields,
}));


export default makeSource({
  // ...
  documentTypes: [Blog, Page],
  // ...
});

```

As you can see, we have defined some custom fields for our `Blog` type - `date` and `authors`. This field will be accessible in the layout used for pages of this document type, so now, you can add them to the frontmatter of your blog posts, like so:

```md
---
title: I'm an example blog post
date: 2022-07-19
authors: [John Doe]
---
```

Now, we can extend our `blog.js` layout to receive and display `date` and `authors` on the page:

```js
export default function BlogLayout ({ children, frontMatter }) {
    const { date, title, authors } = frontMatter
    return (
      <article">
        <header>
          <div>
            {title && <h1>{title}</h1>}
            {authors && <p>{authors}</p>}
            {date && <p>{(new Date(date)).toLocaleDateString()}</p>}
          </div>
        </header>
        <section>
          {children}
        </section>
      </article>
    );
}

```

After applying some Tailwind classes, an example blog post will look like this:
[[layout-blog|Example blog page]].

Additional benefit of this apporach, is that if in the future we would like to change the way our blog posts look, we can do this just by changing default layout for this document type from `blog` to the new value, instead of doing this for every single blog post.