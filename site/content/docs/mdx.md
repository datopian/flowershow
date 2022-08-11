# MDX

All of your markdown files are parsed as MDX files by Flowershow. This means you not only can write your content using Markdown syntax, but also extend it with JSX, JavaScript expressions, and `import` and `export` statements. It's basically Markdown on steroids 😀💪!

## What is MDX?

From the official [MDX docs](https://mdxjs.com/docs/what-is-mdx/):

> MDX can be explained as a format that combines markdown with JSX. 

It looks like this:
```md
# Hello, world!

<div className="note">
  > Some notable things in a block quote!
</div>
```

In the above example, the heading and the block quote are written in markdown. However, the HTML-like looking `<div>` tag is not HTML. It's **JSX** - a React syntax extension to JavaScript that looks like HTML.

<div className="border-2 border-slate-400 rounded-md px-4 mb-2">
❕Note, that we haven't used an HTML `class` attribute on the `<div>` tag above, but rather React's `className`, since Flowershow internally uses React.
</div>

## MDX syntax

The following sections are just a short summary of what MDX can do. Read [the official MDX docs](https://mdxjs.com/) to learn more.

<div className="border-2 border-slate-400 rounded-md px-4 mb-2">
❕In this document we're going to use Markdown and MDX, as well as HTML and JSX interchangeably. The reason for this is the fact that Flowershow parses all Markdown files as MDX files. Don't worry, this doesn't affect the rendering of your pages in anyway, since MDX supports Markdown and HTML will be converted to equivalent JSX component. So, even though you may have only written your content with Markdown and maybe some custom HTML in it - e.g. using Obsidian - now HTML parts will be treated as JSX. To learn more about how to take advantage of it, read the sections below.
</div>

### Markdown

MDX supports CommonMark syntax by default. Check our [syntax] guide to see which other Markdown syntax elements are supported by Flowershow.

### JSX

JSX allows you to create components, that you can reuse across all of your markdown files. This is especially useful if you find yourself writing a lot of custom HTML in your markdown, and/or you use the same HTML code and copy it again and again to different markdown pages. You soon may find it difficult to tell what's this part of HTML container is supposed to do. And what was supposed to be e.g. your blog content ends up as a Markdown-HTML-CSS soup. On top of that, imagine if you wanted to make some changes to all these repeated HTML parts 🤯.

Fortunatelly, thanks to JSX you can extract common HTML parts and enclose it in reusable components to separate content writing from its structuring and styling 😌. 

### ESM 

MDX support's ESM (ECMAScript Modules) `import` and `export` statements, which you can use to import custom React component or data directly into your MDX files, and define them locally.

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
❕ Note, that you should use a `.jsx` extension for any components you want to import into markdown files.
</div>

Now, let's import `MyComponent` into this page's markdown.

```md
import { MyComponent } from '../components/MyComponent.jsx'

<MyComponent list={["cat", "dog", "parrot"]} />

Hooray! 🎊
```

The above MDX code renders as:

import { MyComponent } from '../components/MyComponent.jsx'

<MyComponent list={["cat", "dog", "parrot"]} />

Hooray! 🎊

#### Importing data

Another powerful thing you can to with `import` statements is loading data from external files.

Let's render the above componet and pass data loaded from a JSON file as its prop.

import data from '../data/exampleData.json'

<MyComponent list={data.colors}/>

The above is just a simple example, but imagine creating a custom `Chart` component for which you could import an external dataset and use it to plot data for your research notes 🔥!

#### Defining components locally
If the component you're creating will be mostly

Example:

```md
##### My local component

Instead of importing from file, let's define MyComponent from the example above locally.

export const MyComponent = ({ myList }) => {
	return (
		<div>
		  <p>I'm a custom component!</p>
      <ul>
        { myList.map((x) => <li>{x}</li>) }
      </ul>
		</div>
	)
}
  
<MyComponent myList={[1, 2, 3]} />
```


Renders as:

##### My local component

Instead of importing from file, let's define MyComponent from the example above locally.


### Defining variables
ESM `export` statement can also be used to locally define variables in your MDX files. 

Let's take `MyComponent` from the examples above and define a list that we'll pass as it's `myList` prop value:

```md
import 
```

## Expressions
MDX also allows you to evaluate JavaScript expressions inside curly braces:

Example:
```md
It's { (new Date()).getDate() } day of month.
```

Renders as:

Today's day of month: { (new Date()).getDate() }.

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





