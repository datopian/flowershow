# Code hightlighting

Markdown code blocks will be parsed as `pre` tags with support for code highlighting in respective languages using rehype-prism-plus plugin. 

Copy/paste button included on hover.

Styles used - prism vs code dark from https://github.com/PrismJS/prism-themes

Eg. Javascript

```javascript
const ExampleCode = () => {
	return (
		<div> .... </div>
	)
}
```

Eg. Python

```python
class Example:
	def code(self,test):
		return 'Code highlighter'
```

Eg. Bash

```bash
git commit && git push
```