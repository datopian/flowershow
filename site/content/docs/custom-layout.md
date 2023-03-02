---
title: How to create custom page types and layouts
description: You may have many different types of notes that you want to display in different ways on your Flowershow website. In this tutorial we will cover how to add a new `Recipe` document type for our cooking blog as well as a custom `RecipeLayout` for that specific document type.
type: Blog
created: 2023-03-02
authors: [philippe-du-preez]
---

You may have many different types of notes that you want to display in different ways on your Flowershow website. In this tutorial we will cover how to add a new `Recipe` document type for our cooking blog as well as a custom `RecipeLayout` for that specific document type. Then we will create a home page for listing all the pages of this type.

Let's start with creating a new `Recipe` document type.

## Create a custom Contentlayer document type

In order to create our new `Recipe` document type, we need to go inside `.flowershow/contentlayer.config.ts` and add instructions to tell Contentlayer how to parse:

- `name`: namespace
- `filePathPattern`: input files (Files within this path do not need to specify their `Type` to `Recipe`)
- `fields`: meta data fields
- `computedFields`: derived meta data fields

```javascript
//contentlayer.config.ts
// ...
const recipeFields = {
  created: { type: "date", required: true },
  authors: {
    type: "list",
    of: { type: "string" },
  },
  layout: { type: "string", default: "recipe" },
};

const Recipe = defineDocumentType(() => ({
  name: "Recipe",
  filePathPattern: "recipes/!(index)*.md*",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    ...recipeFields,
  },
  computedFields,
}));

export default makeSource({
  // ...
  documentTypes: [Recipe, Page],
  // ...
});
```

We can reuse the sharedFields (title, description etc.) as needed and add some custom fields, `recipeFields`, for our `Recipe` type. These fields will be accessible in the `RecipeLayout` we will be making. We do not have to include the `Type`, since we are adding the file in the `content/recipes` directory. We can then add the needed fields to the frontmatter of our recipe posts, like so:

```bash
---
title: Homemade Lasagne Recipe
description: Lasagne is a classic Italian dish that is perfect for any occasion. It is a hearty and delicious meal that can be enjoyed by everyone.
created: 2022-11-29
authors: [John Doe]
---
Lasagne is a classic Italian dish that is perfect for any occasion. It is a hearty and delicious meal ...
```

>See more on how to use the `Author` document type [here](https://flowershow.app/docs/blog#blog-authors)

After creating our `Recipe` document type, we are ready to create a custom layout to display this.

## Create a custom layout

Now, we can create our `RecipeLayout.tsx` at `.flowershow/layouts` to receive and display the title, date and authors for the pages:

```javascript
export function RecipeLayout({ children, ...frontMatter }) {
    const { created, title, authors } = frontMatter
    return (
      <article className="docs prose prose-a:text-primary dark:prose-a:text-primary-dark prose-strong:text-primary dark:prose-strong:text-primary-dark prose-code:text-primary dark:prose-code:text-primary-dark prose-headings:text-primary dark:prose-headings:text-primary-dark prose text-primary dark:text-primary-dark prose-headings:font-headings dark:prose-invert prose-a:break-words mx-auto p-6">
        <header>
          <div className="mb-4 flex-col items-center">
            {title && <h1 className="flex justify-center">{title}</h1>}
            {created && (
              <p className="text-sm text-zinc-400 dark:text-zinc-500 flex justify-center">
                <time dateTime={created}>{(new Date(created)).toLocaleDateString()}</time>
              </p>
            )}
            {authors && (
            <div className="flex flex-wrap prose dark:prose-invert items-center space-x-6 space-y-3 justify-center">
              {authors.map((name) => (
                <div key={name}>{name}</div>
              ))}
            </div>
          )}
          </div>
        </header>
        <section>{children}</section>
      </article>
    );
  }
```

Then add the following to `.flowershow/layouts/index`:

```bash
import {RecipeLayout} from "./RecipeLayout";
export default {
  ...
  recipe: RecipeLayout
};
```

After applying some Tailwind classes, an example recipe blog post will look like this:

![[recipePost.png]]

An additional benefit of this approach, is that if in the future we would like to change the way our recipes look, we can do this just by changing the default layout for this document type, instead of doing this for every single recipe post.

The last step we have is to create a home page where all our recipes will be displayed.

## Create a home page

In order to list all our recipes on a given page, we can use our `BlogsList` component and pass it a list of our recipes. It's globally available, so we don't need to import it.

First we need to create a getter function that will fetch all our recipes:

```bash
// <your-content-folder>/getters/recipes.js
import { allRecipes } from "contentlayer/generated";

export default function getRecipes() {
  return allRecipes.sort((a, b) => new Date(b.created) - new Date(a.created));
}
```

Then we can use our `Bloglist` component in our `content/recipes/index` file and pass our `recipes` to it like so:
```bash
---
title: Great Recipes
layout: simple
data:
  - recipes
---

<BlogsList blogs={recipes}/>
```

Then after creating a couple of recipes in `content/recipes` our home page at `/recipes` will look like this!

![[recipes.png]]

For more information on creating custom layouts, you can read the documentation [here](https://flowershow.app/docs/layouts).