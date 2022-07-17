# Markdown syntax support

Here are some of the Obidian syntax elements (CommonMark, GFM and others) supported by Flowershow.

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

---

We are intensively working to support whole range of Obsidian syntax elements, but there is still a lot work ahead. If you would like to [contribute](https://github.com/flowershow/flowershow#contributing), you are more than welcome!

## Text highlighting  🚧

==I'm Highlighted!== is done using `==I'm Highlighted!==`

## Multiline blockquotes 🚧

**Example:**

```md
> Roses are red,
> violets are blue.
```

**Renders as:**

> Roses are red,
> violets are blue.

## Math 🚧

**Example:**
```md
$$\begin{vmatrix}a & b\\ c & d \end{vmatrix}=ad-bc$$
```

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

## Inline code 🚧

**Example:**

```md
This is some code: `npx do-something`
```

**Renders as:**

This is some code: `npx do-something`

## Callouts 🚧

**Example:**

```md
> [!INFO]
> Here's a callout block.
> It supports **markdown** and [[Internal link|wikilinks]].
```

**Renders as:**

> [!INFO] > Here's a callout block. > It supports **markdown** and [[roadmap|wikilinks]].
