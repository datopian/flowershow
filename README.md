# remark-wiki-link-plus

Parse and render wiki-style links in markdown especially Obsidian style links.

## What is this ?

Using obsidian, when we type in wiki link syntax for eg. `[[wiki_link]]` it would parse them as anchors.

## Features supported

- [x] Support `[[Internal link]]`
- [x] Support `[[Internal link|With custom text]]`
- [x] Support `[[Internal link#heading]]`
- [x] Support `[[Internal link#heading|With custom text]]`

Future support:
- [ ] Support `![[Embed note]]`
- [ ] Support `![[Embed note#heading]]`

## Installation

```bash
npm install remark-wiki-link-plus
```

## Usage

```javascript
const unified = require('unified')
const markdown = require('remark-parse')
const wikiLinkPlugin = require('remark-wiki-link-plus');

let processor = unified()
    .use(markdown, { gfm: true })
    .use(wikiLinkPlugin)
```

### Configuration options

* `options.markdownFolder [String]`: A string that points to the content folder.

  The default `hrefTemplate` is:
  
```javascript
(permalink) => `/${permalink}`
```

## Running the tests

```bash
npm run test
```
