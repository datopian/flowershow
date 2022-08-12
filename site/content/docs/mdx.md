import { Callout } from '../components/TempCallout.jsx'

# MDX

Flowershow parses all of your Markdown files as MDX. This means you not only can write your content with your old friend Markdown, but also extend it with JSX, JavaScript expressions, and `import` and `export` statements. It's basically Markdown on steroids 😀💪!

Let's see what exactly is MDX and what's so cool about it!

<Callout>
  A basic familiarity with JSX (React components) and JavaScript might help you understand this chapter, but you can also learn by example and start by tweaking some of our code. Opening this page in your text editor may also be helpful.
</Callout>

## What is MDX?

From the official [MDX docs](https://mdxjs.com/docs/what-is-mdx/):

> MDX can be explained as a format that combines markdown with JSX. 

It looks like this:
```md
# Hello, world!

<div className="border-2 border-yellow-300 rounded-md">
  > Some notable things in a block quote!
</div>
```

You may be thinking: *"Hold on, but isn't it just some Markdown with an HTML block wrapping around some more Markdown... which is a standard CommonMark syntax?"*

The answer to this question is - yes... and no ¯\_(ツ)_/¯.

**Yes**, because it really is a CommonMark syntax, which allows you to add HTML parts and even intertwine them with Markdown like in our example. You may have written something similar without even hearing about MDX and if you're starting your new Flowershow project with your existing Markdown content - don't worry, it will all work! This is because MDX supports CommonMark by default. Additionally Flowershow provides support for GFM (GitHub Flavored Markdown) and even some Obsidian-specifix syntax elements. (See our [[syntax|Syntax]] guide to learn more.)

**No**, because Flowershow will parse all your content files as if it was MDX (no matter if you use `.md` or `.mdx` extension). This means that in our example above, the heading and the block quote will be treated as a good old Markdown, however the HTML-like looking `<div>` tag will not be treated as a raw HTML. For compilers used by Flowershow under the hood now it's **JSX** - a React syntax extension to JavaScript that looks like HTML, which will allow you to create and use components in your Markdown files.

<Callout>
  ❕You may have noticed, that we haven't used an HTML `class` attribute on the `<div>` tag above, but rather React's `className` attribute. This is because all HTML elements will be parsed as JSX elements, which will then be used by React runtime to render your pages.
</Callout>

## How it works?

In short, packages used by Flowershow under the hood will compile MDX to JavaScript, which will then be used by React.

## MDX supported syntax

The following sections are just a short summary of what MDX can do. Read [the official MDX docs](https://mdxjs.com/) to learn more.

<Callout>
  ❕In this document we're going to use Markdown and MDX, as well as HTML and JSX interchangeably. The reason for this is the fact that Flowershow, as we've just learned, parses all Markdown files as MDX files. So, from your perspective you may have only used Markdown syntax to write your content, but Flowershow will also understand any MDX-specific additions to it if you were to include them. It follows, that what you may consider HTML blocks, in MDX world it's JSX.
</Callout>

### Markdown

Like we've mentioned, MDX supports CommonMark syntax by default. On top of that Flowershow provides support for GFM and some Obsidian-specifix extensions. Check our [syntax|Syntax guide] to learn which other Markdown syntax elements are supported by Flowershow.

### JSX and custom components

JSX allows you to create components, that you can reuse across all of your markdown files. This is especially useful if you find yourself writing a lot of custom HTML in your markdown, and/or you use the same HTML code parts and copy it again and again to different markdown pages. You soon may find it difficult to tell what's this part of HTML container is supposed to do. And what used to be e.g. your blog content ends up as a Markdown-HTML-CSS soup. On top of that, imagine if you wanted to make some changes to all these copies of HTML blocks, that you used in many different pages 🤯.

Fortunatelly, thanks to JSX you can extract common HTML parts and enclose them in components, that you can then import and use wherever you want in your Markdown. What you end up with is much cleaner content and a single source of truth for HTML (JSX) parts you used to copy over and over again. JSX components allow you to declutter your Markdown and to separate content writing from its structuring and styling 😌. 

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

Looks much better! And it's much easier to update, if you're using this button on many different pages.

(We'll learn more about how to create, import and use your custom components in the sections below.)

### ESM `import` and `export` statements

This is where a lot of MDX power comes from: support for ESM (ECMAScript Modules) `import` and `export` statements, which you can use to import custom JSX (React) components or even define them locally, as well as import and locally define data (variables), that can then be passed to your JSX components.

#### Importing components

To see this in action, let's create a React component in the `/components` folder:

```js
// MyComponent.jsx
export const MyComponent = ({ list }) => {
  return (
    <div className="border-2 border-sky-300 rounded-md p-2">
      <p>I'm a custom react component imported into this page!</p>
      <div>
        <p>And here is a list of some things passed to me through props:</p>
        <ul>
          { list.map((x, i) => <li key={i.toString()}>{x}</li>) }
        </ul>
      </div>
    </div>
  )
}
```

<div className="border-2 border-slate-400 rounded-md px-4 mb-4">
❕ Note, that you should use a `.jsx` extension for any components you want to import into markdown files to make it work.
</div>

Now, let's import `MyComponent` into this page's markdown.

```md
import { MyComponent } from '../components/MyComponent.jsx'

<MyComponent list={["cat", "dog", "parrot"]} />

Hooray! 🎊
```

The above MDX code renders as:

---

import { MyComponent } from '../components/MyComponent.jsx'

<MyComponent list={["cat", "dog", "parrot"]} />

Hooray! 🎊

---

#### Importing data

Another powerful thing you can to thanks to `import` statements is loading data from external files.

Let's try to load a list of colors from a JSON file and pass it as a `list` prop value to our component `MyComponent`:

```md
import data from '../data/exampleData.json'

<MyComponent list={data.colors}/>
```

This will render as:

---

import data from '../data/exampleData.json'

<MyComponent list={data.colors}/>

---

The above is just a simple example, but imagine creating a custom `Chart` component for which you could import an external dataset and use it to plot data for your research notes 🔥!

#### Defining components locally
If the component you're creating will be used only on one of your pages, but either it will be repeated multiple times or it's a complex one and you want to keep it at the very top/bottom of your page so that it doesn't clutter your content, you could define a component locally. To do this you can use ESM `export` statement.

For example, instead of creating the above component `MyComponent` in a separate `.jsx` file, let's the following:

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
        { list.map((x) => <li>{x}</li>) }
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

Let's take `MyComponent` from the examples above and define a list that we'll pass as it's `list` prop value:

```md
export const myFavFlowersList = ['tulip', 'water lily', 'iris']

<MyComponent list={myFavFlowersList} />
```

Which renders as:

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
{/* A comment! */}
```





