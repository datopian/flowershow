# Testing MDX components (not React/JSX components)

See [this page](https://mdxjs.com/docs/using-mdx/) for from MDX docs for reference.

## Importing MDX components into Markdown

MDX files are compiled to components and can be imported as such!

### Simple components

(The main content of `.mdx` is exported as the default export.)

**Example:**

```md
import ExampleMDXComponent from "../content/components/test.mdx"

<ExampleMDXComponent />
```

**Renders as:**

import ExampleMDXComponent from "../content/components/test.mdx"

<ExampleMDXComponent />

---

### Components with props

**Example:**

```md
import ExampleMDXComponent2 from "../content/components/test2.mdx"

<ExampleMDXComponent2 name="Ola" year="2022" />
```

**Renders as:**

import ExampleMDXComponent2 from "../content/components/test2.mdx"

<ExampleMDXComponent2 name="Ola" year="2022" />

---

### Passing components to components

**Example:**

```md
import ExampleMDXComponent3 from "../content/components/test3.mdx"

<ExampleMDXComponent3 components={{Planet: () => <span style={{color: 'tomato'}}>Pluto</span>}} />
```

**Renders as:**

import ExampleMDXComponent3 from "../content/components/test3.mdx"

<ExampleMDXComponent3 components={{Planet: () => <span style={{color: 'tomato'}}>Pluto</span>}} />

### Components with children

**Example:**

```md
import ExampleMDXComponent4 from "../content/components/test4.mdx"

<ExampleMDXComponent4 />
```

**Renders as:**

import ExampleMDXComponent4 from "../content/components/test4.mdx"

<ExampleMDXComponent4 />
