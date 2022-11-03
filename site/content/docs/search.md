---
title: Search Feature
---

![[search-component.jpg]]

Flowershow supports search functionality on the website to deliver realtime results for content available on all your pages. Clicking the result will lead the user to the relevant page.

It is available in the navbar or can also be accessed by pressing the Ctrl+K (⌘+K on macOS) keyboard shortcut to open the search modal.

## Adding the search component

You can either add a local search component or by using the external algolia search provider. These can be setup in your `config.js` file.

### Local search

To add the local search feature, just setup the search config in your `config.js` file to the following.

```js
const config = {
  search: {
    provider: "kbar",
    kbarConfig: {
      searchDocumentsPath: 'search.json',
    }
  }
}
```

### Algolia search

[Algolia](https://www.algolia.com/) is a powerful search and discovery provider that generates realtime results on your website and can be easily integrated with flowershow.

> [!note]
> Before adding this feature,  you will need to register an account with them by following their instructions at [Algolia Docsearch](https://docsearch.algolia.com/) and requesting access to their api.

There are some required config values that should be included for the search to function accordingly. These are:

- App ID
- Api key
- Index name

These values will be available once you have followed the steps provided to apply for algolia docsearch and your request is granted.

Once these are available, you can then setup the algolia search provider and fill in the provided values in your `config.js` file as shown below.

```js
const config = {
  search: {
    provider: "algolia",
    algoliaConfig: {
      appId: "",
      apiKey: "",
      indexName: ""
    }
  }
}
```
