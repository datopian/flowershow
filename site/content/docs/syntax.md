# Markdown syntax support

Flowershow was designed with Obsidian users in mind, and so, it aims to fully support Obsidian syntax, including **CommonMark**, **GitHub Flavoured Markdown** and **Obsidian extensions**, like Wiki links.

## CommonMark

Here are some of the CommonMark syntax elements supported by Flowershow.

### ✅ Thematic breaks

Thematic breaks made with three `*`, `-` or `_` will be converted to HTML `<hr />`

**Example:**
```md
***
---
___
```

**Renders as:**
***
---
___

### ✅ Headings

Markdown headings will be converted to HTML `<h1>`-`<h6>` tags.

**Example:**
```md
# Heading 1
...
###### Heading 6
```

**Renders as:**
All the headings on this page 🙂.

### ✅ Emphasis

**I'm Bold!** is done using `**I'm Bold!**`  
__I'm Bold!__ is done using `__I'm Bold!__`

*I'm Italic!* is done using `*I'm Italic!*`  
*I'm Italic!* is done using `_I'm Italic!_`

### ✅ Fenced code blocks with code highlighting

Code blocks created with backtics will be parsed as `pre` tags with support for code highlighting in respective languages and copy/paste button included on hover.

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

### ✅ Blockquotes

**Example:**

```md
> Roses are red, violets are blue.
```

**Renders as:**

> Roses are red, violets are blue.

### ✅ Lists

**Example:**

```md
- one
- two

1. one
2. two
	- one
	- two
```

**Renders as:**

- one
- two

1. one
2. two
	- one
	- two

### ✅ Inline code

**Example:**
```md
Here is some code: `print("hello world!")`
```

**Renders as:**

Here is some code: `print("hello world!")`

### ✅ Links

**Example:**
```md
[Link to roadmap](/docs/roadmap)
```

**Renders as:**

[Link to roadmap](/docs/roadmap)

### ✅ Images

![tulip](https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/abstract-flowers-rose-sciberras.jpg)

### 🚧 Indented code blocks

**Example:**
```md
	a simple
		indented code block
```

**Renders as:**  
	a simple
		indented code block

<div className="border-2 border-slate-400 rounded-md px-4 my-4">
🔍 To learn more about the Markdown syntax refer to the [CommonMark specification](https://spec.commonmark.org/0.30/). 
</div>

---

## GitHub Flavored Markdown (GFM) extensions

### ✅ Tables

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

### ✅ Task lists

**Example:**

```md
* [x] one thing to do
* [ ] a second thing to do
	* [ ] another thing to do!
```

**Renders as:**

* [x] one thing to do
* [ ] a second thing to do
	* [ ] another thing to do!

### ✅ Strikethrough

~~I'm CrossedOut!~~ is done using `~~I'm CrossedOut!~~`

### ✅ Autolinks

**Example:**

```md
Check out Flowershow at https://flowershow.app!
```

**Renders as:**

Check out Flowershow at https://flowershow.app!

<div className="border-2 border-slate-400 rounded-md px-4 my-4">
🔍 To learn more about the GitHub Flavored Markdown syntax refer to the [GFM specification](https://github.github.com/gfm/). 
</div>

---

## Other extensions

### ✅ Obisidian internal links (Wiki links)

Wiki links are hyperlinks that give one-click access to other pages on the site. These are usually denoted with double square brackets `[[some_page]]` and Obsidian would generate the reference to that page automatically.

Flowershow will convert internal links to HTML `a` tags, with their `href` attributes pointing to the location referenced by original internal links.

#### Internal link types

* ✅ Link to a page, e.g. `[[roadmap]]`, which renders as [[roadmap]]
* ✅ Link to a page with a custom name, e.g.  `[[roadmap|Our roadmap]]`, which renders as [[roadmap|Our roadmap]] 
* ✅ Link to a specific heading within a given page `[[roadmap#Planned features]]`, which renders as [[roadmap#Planned features]]
* ✅ Link to a specific heading within a given page with a custom name, e.g. `[[roadmap#Planned features|🚧 working on...]]` which renders as [[roadmap#Planned features|🚧 working on...]]
* 🚧 Link to a specific block (paragraph) within a given page, e.g. `[[roadmap#^f93ba0]]`
* ✅ Link to an image file with supported image formats - png, jpg and jpeg, eg. `![[park.png]]` which renders as:
    ![[park.png]]

### ✅ Footnotes

**Example:**

```md
Roses are red... [^1]

[^1]: ...violets are blue.
```

Roses are red... [^1]

[^1]: ...violets are blue.

### ✅ Math

**Example:**
```md
$$\begin{vmatrix}a & b\\ c & d \end{vmatrix}=ad-bc$$
```

**Renders as:**
$$\begin{vmatrix}a & b\\ c & d \end{vmatrix}=ad-bc$$

### ✅ Frontmatter

You can add metadata to your pages, by adding key-value pairs to frontmatter, e.g.:

```md
---
title: Flower Show
description: A tool for publishing markdown notes.
mymeta: Some info
---
```

The `title` and `description` fields are pulled from the MDX file and processed using `gray-matter`. Additionally, links are rendered using a custom component passed to `next-mdx-remote`.

### ✅ Dashes/Ellipse

Two '-' will convert to ndash. Three '-' will convert to mdash. Three '.' with or without spacing will convert to ellipse.

**Example:**
```md
--ndash
---mdash
...ellipse
. . . another ellipse
```

**Renders as:**
--ndash
---mdash
...ellipse
. . . another ellipse

### 🚧 Text highlighting

==I'm Highlighted!== is done using `==I'm Highlighted!==`

### 🚧 Callouts

**Example:**

```md
> [!INFO]
> Here's a callout block.
> It supports **markdown** and [[Internal link|wikilinks]].
```

**Renders as:**

> [!INFO] > Here's a callout block. > It supports **markdown** and [[docs/index|wikilinks]].

<div className="border-2 border-slate-400 rounded-md px-4 my-4">
🔍 To learn more about the Obsidian extensions refer to the [Obsidian Help site](https://help.obsidian.md/How+to/Format+your+notes). 
</div>

### 🚧 Excalidraw sketches support

Displaying embedded [Excalidraw](https://excalidraw.com/) sketches.

**Example:**
```md
![[customizability-vs-upgradeability-efficient-frontier-2022-06-26]]
```

**Renders as:**  
![[customizability-vs-upgradeability-efficient-frontier-2022-06-26]]

### 🚧 Comments

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
