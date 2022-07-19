# Adding custom components to your markdown

## Steps

1. Create a component in `/components` folder:
```js
// Demo.js
export default function DemoComponent() {
	return (
		<div>
		  <p>I'm a custom component!</p>
		</div>
	)
}
```

2. Import it in `components/MDX.js` file and add it to `components` object.
```javascript
// MDX.js
import DemoComponent from './DemoComponent.js'

const components = {
	...
	DemoComponent,
	...
}
```

3. Use directly in your markdown file.
```md
# Here is an example of a custom component

<DemoComponent />
```

## Passing data to your custom components

1. Add the data in `pages/[[slug]].js`
```javascript
// [[slug.js]]
const testData = [
  { title: "First", value: 1 },
  { title: "Second", value: 2 },
  { title: "Third", value: 3 },
]

export default function Page({ body, ...rest }) {
  const Component = useMDXComponent(body.code, { testData });
  // ...
}
```

2. Use as props value in markdown
```javascript
<DemoComponent data={testData} />
```

## Example
Note, that the code we've used for the above examples was simplified, so the component below will be slightly different.

```md
<DemoComponent data={testData}></DemoComponent>
```

This will render as:
<DemoComponent data={testData}></DemoComponent>


