# Testing MDX components (not React/JSX components)

See [this page](https://mdxjs.com/docs/using-mdx/) from MDX docs for reference.

## Importing MDX components into Markdown

MDX files are compiled to components and can be imported as such!
(The main content of `.mdx` is exported as the default export.)

### Simple components

**Example:**

`test.mdx` file:

```md
*Hi! I'm an MDX component!*
```
Import in another MDX file:

```md
import ExampleMDXComponent from "../components/custom/test.mdx"

<ExampleMDXComponent />
```

**Renders as:**

import ExampleMDXComponent from "../components/custom/test.mdx"

<ExampleMDXComponent />

---

### Components with props

**Example:**

`test2.mdx` file:

```md
Hello {props.name.toUpperCase()}

*I'm an MDX component!*

The current year is {props.year}
```

Import in another MDX file:

```md
import ExampleMDXComponent2 from "../components/custom/test2.mdx"

<ExampleMDXComponent2 name="Ola" year="2022" />
```

**Renders as:**

import ExampleMDXComponent2 from "../components/custom/test2.mdx"

<ExampleMDXComponent2 name="Ola" year="2022" />

---

### Passing components to components

**Example:**

`test3.mdx` file:

```md
Hello *<Planet />*
```

Import in another MDX file:

```md
import ExampleMDXComponent3 from "../components/custom/test3.mdx"

<ExampleMDXComponent3 components={{Planet: () => <span style={{color: 'tomato'}}>Pluto</span>}} />
```

**Renders as:**

import ExampleMDXComponent3 from "../components/custom/test3.mdx"

<ExampleMDXComponent3 components={{Planet: () => <span style={{color: 'tomato'}}>Pluto</span>}} />

### Components with children

**Example:**

`test4.mdx` file:

```md
import Test1 from '../components/custom/test.mdx'

I'm an MDX component and here is my child component:
*<Test1 />*
```

Import in another MDX file:

```md
import ExampleMDXComponent4 from "../components/custom/test4.mdx"

<ExampleMDXComponent4 />
```

**Renders as:**

import ExampleMDXComponent4 from "../components/custom/test4.mdx"

<ExampleMDXComponent4 />
