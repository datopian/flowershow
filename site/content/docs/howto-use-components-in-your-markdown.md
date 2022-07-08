# How to use components in your markdown

## Steps

1. Create a component (eg. Hero.js) in components folder
2. Add it to components in `components/MDX'
```javascript
import Hero from './Hero.js'

const components = {
	...
	Hero,
	...
}
```
3. Use directly in markdown file as 
```javascript
---
// frontmatter
layout: ...
---

<Hero />
```

## Passing data in mdx

1. Add the data in `pages/[[slug]].js`
```javascript
const testData = [
  { title: "First", value: 1 },
  { title: "Second", value: 2 },
  { title: "Third", value: 3 },
]

export default function Page({ body, ...rest }) {
  const Component = useMDXComponent(body.code, { testData });
	...
}
```
2. Use as props value in markdown
```javascript
<ExampleComponent data={testData} />
```

