# Math

Flowershow supports math syntax where you can use LaTeX notations to denote formulas.

## How to use

### Inline math

- Use between `$`

For example if your markdown file has the following

```markdown
$\sqrt{a^2 + b^2}$
```

will be rendered as

$\sqrt{a^2 + b^2}$

### Block math

- Use between double `$$`

For example if your markdown has the following

```markdown
$$
\begin{vmatrix}a & b\\
c & d
\end{vmatrix}=ad-bc
$$
```

will be rendered as

$$
\begin{vmatrix}a & b\\
c & d
\end{vmatrix}=ad-bc
$$

## Developers

Math syntax is supported by using the remark and rehype plugins - [remark-math](https://github.com/remarkjs/remark-math/tree/main/packages/remark-math) and [rehype-mathjax](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-mathjax). which transforms to svg code.

More documentation on math syntax usage can be found on [MathJax](https://docs.mathjax.org/en/latest/basic/mathjax.html).
