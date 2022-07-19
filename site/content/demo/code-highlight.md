# Code hightlighting

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