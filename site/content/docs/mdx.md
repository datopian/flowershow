---
title: MDX
---

## What is MDX?

Flowershow parses all of your Markdown files as MDX. This means you not only can write your content using good old Markdown, but also enrich it with dynamic visualizations, immersive user interactions and much more thanks to support for JSX, JavaScript expressions, and ESM `import` and `export` statements. It's basically Markdown on steroids 😀💪!

Let's see what exactly is MDX and what's so cool about it!

> A basic familiarity with JSX (React components) and JavaScript might be helpful to understand this chapter, but you can also learn by example and start by tweaking some of our code. Opening [this page](https://github.com/flowershow/flowershow/blob/main/site/content/docs/mdx.md) in your text editor side by side with the rendered version in your browser may also help.

From the official [MDX docs](https://mdxjs.com/docs/what-is-mdx/):

> MDX can be explained as a format that combines markdown with JSX.

It looks like this:

```md
# Hello, world!

<div className="border-2 border-yellow-300 rounded-md">
  > Some notable things in a block quote!
</div>
```

You may be thinking: _"Hold on, but isn't it just some Markdown with an HTML block wrapping around some more Markdown... which is a standard CommonMark syntax?"_

The answer to this question is - yes... and no ¯\_(ツ)\_/¯.

**Yes**, because it really is a CommonMark syntax, which allows you to add HTML parts and even intertwine them with Markdown like in our example. You may have written something similar without even hearing about MDX and if you're starting your new Flowershow project with your existing Markdown content - it will all work! This is because MDX supports CommonMark by default. Additionally, Flowershow provides support for GFM (GitHub Flavored Markdown) and some Obsidian-specific syntax elements. (See our [[syntax|Syntax]] guide to learn more.)

**No**, because Flowershow will parse all your Markdown files as MDX (no matter if you use `.md` or `.mdx` file extension). This means that in the example above, the heading and the block quote will be treated as Markdown, however, the HTML-like looking `<div>` tag will be understood as **JSX** - a React syntax extension to JavaScript that looks like HTML, which allows you to create and use components in your Markdown files.

> [!note]
> You may have noticed, that we haven't used an HTML `class` attribute on the `<div>` tag above, but rather React's `className` attribute. This is because all HTML elements will be parsed as JSX, which will then be used by React's runtime to render your pages.

How does it work? In short, packages used by Flowershow under the hood compile MDX to JavaScript, which is then used by React to create your website.

## MDX supported syntax

The following sections are just short summaries of what MDX can do. Read [the official MDX docs](https://mdxjs.com/) to learn more.

> ❕In this document we're going to use Markdown and MDX, as well as HTML and JSX interchangeably. The reason for this is the fact that Flowershow, as we've just learned, parses all Markdown files as MDX files. So, from your perspective, it may be only Markdown that you're using to write your content. However, Flowershow will also understand any MDX-specific additions to it if you were to include them. It follows, that what you may consider HTML blocks, in MDX world is JSX.

### Markdown

As we've mentioned, MDX supports CommonMark syntax by default. On top of that Flowershow provides support for GFM and some Obsidian-specific extensions. Check our [syntax|Syntax guide] to learn which other Markdown syntax elements are supported by Flowershow.

### JSX and custom components

JSX allows you to create components, that you can reuse across all of your markdown files. This is especially useful if you find yourself writing a lot of custom HTML in your Markdown, and/or you use the same HTML code parts and copy them again and again to different markdown pages. You soon may find it difficult to tell what a given part of HTML block is supposed to do. And what used to be e.g. your blog content ends up as a Markdown-HTML-CSS soup. On top of that, imagine if you wanted to make some changes to all these copies of HTML blocks, that you used many different pages 🤯.

Fortunately, thanks to JSX you can extract common HTML parts and enclose them in components, which you can then import and use wherever you want in your Markdown. What you end up with is much cleaner content and a single source of truth for HTML (JSX) parts you used to copy over and over again. JSX components allow you to declutter your Markdown and to separate content writing from its structuring and styling 😌.

For example, by creating a component out of a part of HTML code you repeat all over again, you could turn this...

```md
# Some page heading

Some content here...

<a href='https://some.url.com' className="no-underline">
  <button
    type="button"
    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    Click me!
  </button>
</a>

Some more content here...
```

...into to this:

```md
# Some page heading

Some content here...

<LinkButton href="https://some.url.com" text="Click me!" />

Some more content here...
```

Looks much better! And it's much easier to update if you're using this button on many different pages.

This is just a simple example of a static JSX component. But the true power of JSX comes from being able to create dynamic components - components to which you can pass data (or even other JSX components) and render their contents based on this data. Imagine having a custom chart component, to which you could pass your research data and plot some beautiful visualization 🔥.

You'll learn more how to create such components, import and use them in your markdown in the next sections.

### ESM `import` and `export` statements

This is where a lot of MDX power comes from: support for ESM (ECMAScript Modules) `import` and `export` statements, which you can use to import custom JSX (React) components or even define them locally, as well as import and locally define data (variables), that can then be passed to your JSX components.

#### Importing components

To see this in action, let's create a React component in the `/site/components` folder:

```js
// MyComponent.jsx
export const MyComponent = ({ list }) => {
  return (
    <div className="border-2 border-sky-300 rounded-md p-2">
      <p>I'm a custom react component imported into this page!</p>
      <div>
        <p>And here is a list of some things passed to me through props:</p>
        <ul>
          {list.map((x, i) => (
            <li key={i.toString()}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
```

> [!note]
> You should use a `.jsx` extension for any components you want to import into markdown files to make it work.

Now, let's import `MyComponent` into this page's markdown.

```md
import { MyComponent } from 'components/custom/MyComponent.jsx'

<MyComponent list={["cat", "dog", "parrot"]} />

Hooray! 🎊
```

The above MDX code renders as:

---

import { MyComponent } from 'components/custom/MyComponent.jsx'

<MyComponent list={["cat", "dog", "parrot"]} />

Hooray! 🎊

---

#### Importing data

Another powerful thing you can do thanks to `import` statements is loading data from external files.

Let's try to load a list of colors from a JSON file and pass it as a `list` prop value to our component `MyComponent`:

```md
import data from '../../site/data/exampleData.json'

<MyComponent list={data.colors}/>
```

This will render as:

---

import data from '../../site/data/exampleData.json'

<MyComponent list={data.colors}/>

---

The above is just a simple example, but imagine creating a custom `Chart` component for which you could import an external dataset and use it to plot data for your research notes 🔥!

#### Defining components locally

If the component you're creating will be used only on one of your pages, but either it will be repeated multiple times or it's a complex one and you want to keep it at the very top/bottom of your page so that it doesn't clutter your content, you could define a component locally. To do this you can use ESM `export` statement.

For example, instead of creating the above component `MyComponent` in a separate `.jsx` file, let's do the following:

```md
export const MyComponent2 = ({ list }) => {
return (

<div>
<p>I'm a custom component!</p>
<ul>
{ list.map((x) => <li>{x}</li>) }
</ul>
</div>
)
}

Some content...

<MyComponent2 list={["I'm", "defined", "locally"]} />

Some more content...
```

This will render as:

---

export const MyComponent2 = ({ list }) => {
return (

<div>
<p>I'm a custom component!</p>
<ul>
{ list.map((x,i) => <li key={i}>{x}</li>) }
</ul>
</div>
)
}

Some content...

<MyComponent2 list={["I'm", "defined", "locally"]} />

Some more content...

---

#### Defining variables

ESM `export` statement can also be used to locally define variables in your MDX files.

Let's take `MyComponent` from the examples above and define a list that we'll pass as its `list` prop value:

```md
export const myFavFlowersList = ['tulip', 'water lily', 'iris']

<MyComponent list={myFavFlowersList} />
```

This renders as:

---

export const myFavFlowersList = ['tulip', 'water lily', 'iris']

<MyComponent list={myFavFlowersList} />

---

## Expressions

MDX also allows you to evaluate JavaScript expressions inside curly braces:

Example:

```md
Some content...

It's { (new Date()).getDate() } day of month.

Some more content...
```

Renders as:

---

Some content...

It's { (new Date()).getDate() } day of month.

Some more content...

---

You can even run whole programs by enclosing them in JavaScript's [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (Immediately Invoked Function Expression):

```md
{(function () {
const myLuckyNumber = 5;

return <span className="text-sky-500">My lucky number is {myLuckyNumber}</span>
})()}
```

Renders as:

{(function () {
const myLuckyNumber = 5;

return <span className="text-sky-500">My lucky number is {myLuckyNumber}</span>
})()}

You can also use comments in expressions with JavaScript's multiline comment syntax, like so:

```md
{/_ A comment! _/}
```

## MDX components

If you're not familiar with React or you just need a very basic components that will serve as templates for some parts of Markdown you would normally have to copy over and over again only to make some minor adjustments to them, MDX components may be the way to go. MDX components, in contrast to React components, are written in MDX. And since all MDX files are compiled to components, they can be imported and used the same way as React components.

> The main content of `.mdx` is exported as the default export.

### Simple components

Here is an example of a simple, static component, written only with Markdown syntax.

**Example:**

`test.mdx` file:

```md
_Hi! I'm an MDX component!_
```

Import in another MDX file:

```md
import ExampleMDXComponent from "components/custom/test.mdx"

<ExampleMDXComponent />
```

**Renders as:**

import MDXComponent from "components/custom/test.mdx"

<MDXComponent />

---

### Components with props

The above example of an MDX components isn't very useful though, as it doesn't allow you to configure the way it renders in any way. It only contains a piece of Markdown, which will be inserted as is wherever you use it. However, MDX components also allow you to pass data to them and thus control the way they are rendered. This data is available in MDX components as `props`.

**Example:**

`test2.mdx` file:

```md
Hello {props.name.toUpperCase()}

_I'm an MDX component!_

The current year is {props.year}
```

Import in another MDX file:

```md
import MDXComponent2 from "components/custom/test2.mdx"

<MDXComponent2 name="John" year="2022" />
```

**Renders as:**

import MDXComponent2 from "components/custom/test2.mdx"

<MDXComponent2 name="John" year="2022" />

---

#### Special `components` prop

There is a special `components` prop, which allows you to pass other components to your MDX components. This prop takes an object mapping component names to components.

**Example:**

`test3.mdx` file:

```md
Hello _<Planet />_
```

Import in another MDX file and pass an object with `Planet` key and function that returns a JSX component as its value:

```md
import MDXComponent3 from "components/custom/test3.mdx"

<MDXComponent3 components={{Planet: () => <span style={{color: 'tomato'}}>Pluto</span>}} />
```

**Renders as:**

import MDXComponent3 from "components/custom/test3.mdx"

<MDXComponent3 components={{Planet: () => <span style={{color: 'tomato'}}>Pluto</span>}} />

### MDX components with children

You can also import MDX components in other MDX components, like so:

**Example:**

`test4.mdx` file:

```md
import MDXComponent1 from 'components/custom/test.mdx'

I'm an MDX component and here is my child component:
_<MDXComponent1 />_
```

Import in another MDX file:

```md
import MDXComponent4 from "components/custom/test4.mdx"

<MDXComponent4 />
```

**Renders as:**

import MDXComponent4 from "components/custom/test4.mdx"

<MDXComponent4 />

## Where to store your custom components

In order to allow for clean upgrades to future Flowershow templates' versions, you should keep your custom components outside the Flowershow's template `components` folder, e.g. in the parent directory of your content folder. For example:

```bash
my-flowershow-website
├── site
│   ├── components
│   └── content
└── templates
    └── default
```

This would already work, however, import paths would look like this:

```md
import MyComponent from "../site/components/MyComponent.jsx"
```

... which is not very clean and can be confusing. In order to make the paths a bit simpler you can create a symlink in the Flowershow's template components folder (`templates/default/components`) to the folder with your custom components (e.g. `site/components`):

```bash
cd templates/default/components
ln -s <path-to-your-components-folder> custom
```

`custom` can be any name of your choice. It will then be a part of the import path, e.g. `import { MyComponent } from 'components/custom/MyComponent.jsx'`.

Now, your custom components can be imported using this path:

```md
import MyComponent from "components/custom/MyComponent.jsx"
```

## Use `data` field type for custom data getters

In the sections above we were giving an example of creating a custom `Chart` component for which you could import a dataset from a static JSON file. But what if you want to fetch this data from an external API? Or you want to use your markdown files as a dataset?

In order to do that, you can use a special `data` frontmatter field to define names of your custom getter funstions, which will be called before your page is rendered. This page will then be able to access the values returned from these getters under variables of the same names.

For exapmle:

```md
---
title: All my tutorials, plotted!
data:
  -- tutorials
  -- someOtherData
---
```

For both `tutorials` and `someOtherData`, there need to be a corresponding getter function created in your content's folder `getters` subfolder, e.g. `my-content-folder/getters/tutorials.js` and `my-content-folder/getters/someOtherData.js`.

Now you can use `tutorials` and `someOtherData` variables anywhere on this page, e.g. pass as props to your custom components.

> Note, that getter files should use default exports to export getter functions.

### Example using content files as a dataset

Some markdown page, which requires tutorials to render them in a custom list component.

```md
---
title: My tutorials
data:
  - tutorials
---
```

Corresponding getter in `content/getters/tutorials.js`:

```js
import { allTutorials } from 'contentlayer/generated';

export default function getTutorials() {
  return allTutorials.filter(
    (tutorial) => !(tutorial.curation_status.includes('N'))
  );
}
```

> [!note] `contentlayer/generated`
> Note, in order to access your content files, you need to import them from `contentlayer/generated`.

### Example fetching data from external API

Getters declarations in frontmatter:

```md
---
title: All my todos
data:
  -- todos
---
```

Corresponding getter:

```js
export default async function getTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
  const result = await response.json();
  return result
}
```

Usage in some markdown page:

```md
<MyTodoList todos={test} />
```

