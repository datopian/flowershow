# Math

Flowershow supports math syntax where you can use LaTeX notations to denote formulas. It is using the  [MathJax](https://docs.mathjax.org/en/latest/basic/mathjax.html) package and displays them as svg.

## How to use

### Inline math

* Use between `$`

For example if your markdown file has the following

```markdown
$\sqrt{a^2 + b^2}$
```
will be transformed as

$\sqrt{a^2 + b^2}$

### Block math
* Use between double `$$`

For example if your markdown has the following

```markdown
$$
\begin{vmatrix}a & b\\
c & d
\end{vmatrix}=ad-bc
$$
```

will be tranformed as

$$
\begin{vmatrix}a & b\\
c & d
\end{vmatrix}=ad-bc
$$



