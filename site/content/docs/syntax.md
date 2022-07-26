# Markdown and Obsidian syntax basics

Here are some of the Obsidian syntax elements (CommonMark, GFM, and others) supported by Flowershow.

## Auto-linking

All external links will be automatically converted to html anchor tags.

**Example:**

```md
Check out Flowershow at https://flowershow.app!
```

**Renders as:**

Check out Flowershow at https://flowershow.app!

## Footnotes

**Example:**

```md
Roses are red... [^1]

[^1]: ...violets are blue.
```

Roses are red... [^1]

[^1]: ...violets are blue.

## Markdown tables

**Example:**

```md
| Left | Center | Right |
| :--- |  :---: |  ---: |
| 1    | 2      | 3     |
```

**Renders as:**

| Left | Center | Right |
| :--- |  :---: |  ---: |
| 1    | 2      | 3     |

## Task lists

**Example:**

```md
* [x] one thing to do
* [ ] a second thing to do
```

**Renders as:**

* [x] one thing to do
* [ ] a second thing to do

## Text formatting

**I'm Bold!** is done using `**I'm Bold!**`  

_I'm Italic!_ is done using `*I'm Italic!*`

~~I'm CrossedOut!~~ is done using `~~I'm CrossedOut!~~`

## Blockquotes

**Example:**

```md
> Roses are red, violets are blue.
```

**Renders as:**

> Roses are red, violets are blue.

## Nested blockquotes

**Example:**

```md
> How much wood could a woodchuck chuck,
> if a woodchuck could chuck wood?
>> As much wood as a woodchuck could chuck,
>> if a woodchuck could chuck wood.
```

**Renders as:**

> How much wood could a woodchuck chuck,
> if a woodchuck could chuck wood?
>> As much wood as a woodchuck could chuck,
>> if a woodchuck could chuck wood.

## Obsidian internal links

Wiki links are hyperlinks that give one-click access to other pages on the site. These are usually denoted with double square brackets `[[some_page]]` and Obsidian would generate the reference to that page automatically.

Flowershow will convert internal links to HTML `a` tags, with their `href` attributes pointing to the location referenced by original internal links.

### Internal link types
**Currently supported by Flowershow:**

* Link to a page, e.g. `[[roadmap]]`, which renders as [[docs/index]]
* Link to a page with a custom name, e.g.  `[[roadmap|Planned Features]]`, which renders as [[docs/index|Planned Features]] 

🚧 **We're currently working on support for these types:**
* Link to a specific heading within a given page `[[roadmap#Planned features 🚧]]`
* Link to a specific heading within a given page with a custom name, e.g. `[[roadmap#Planned features 🚧|Work in progress...]]`
* Link to a specific block (paragraph) within a given page, e.g. `[[roadmap#Planned features 🚧|Work in progress...]]`
* Link to a file, e.g. `![[abstract-flowers.png]]`

## Code blocks

Markdown code blocks will be parsed as `pre` tags with support for code highlighting in respective languages using rehype-prism-plus plugin. 

- copy/paste button included on hover
- style used - VS Code Dark+ from https://github.com/PrismJS/prism-themes

**Javascript example:**

```javascript
const ExampleCode = () => {
	return (
		<div> .... </div>
	)
}
```

**Python example:**

```python
class Example:
	def code(self,test):
		return 'Code highlighter'
```

**Bash example:**

```bash
git commit && git push
```

## Frontmatter

You can add metadata to your pages, by adding key-value pairs to frontmatter, e.g.:

```md
---
title: Flower Show
description: A tool for publishing markdown notes.
mymeta: Some info
---
```

The `title` and `description` fields are pulled from the MDX file and processed using `gray-matter`. Additionally, links are rendered using a custom component passed to `next-mdx-remote`.

---

We are intensively working to support the whole range of Obsidian syntax elements, but there is still a lot work ahead. If you would like to [contribute](https://github.com/flowershow/flowershow#contributing), you are more than welcome!

## Text highlighting  🚧

==I'm Highlighted!== is done using `==I'm Highlighted!==`

## Multiline blockquotes 🚧

**Example:**

```md
> Roses are red,
> violets are blue.
```

**Renders as:**

> Roses are red  
> violets are blue.

## Math 🚧

**Example:**
```md
$$\begin{vmatrix}a & b\\ c & d \end{vmatrix}=ad-bc$$
```

## Callouts 🚧

**Example:**

```md
> [!INFO]
> Here's a callout block.
> It supports **markdown** and [[Internal link|wikilinks]].
```

**Renders as:**

> [!INFO] > Here's a callout block. > It supports **markdown** and [[docs/index|wikilinks]].

## Comments 🚧

**Example:**

```md
Here is some inline comments: %%You can't see this text%%

Here is a block comment:
%%
It can span
multiple lines
%%
```

**Renders as:**

Here is some inline comments: %%You can't see this text%%

Here is a block comment:
%%
It can span
multiple lines
%%

