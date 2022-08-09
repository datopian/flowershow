---
title: Search Feature
---

## Users

<img src="/assets/images/search-component.jpg" alt="search component" className="border rounded" />

Flowershow supports search functionality on the website to deliver realtime results for content available on all your pages. Clicking the result will lead the user to the relevant page.

It is available in the navbar or can also be accessed by pressing the Ctrl+K (⌘+K on macOS) keyboard shortcut to open the search modal. 

## Developers

The search functionilty uses the [Algolia Docsearch](https://docsearch.algolia.com/) to support realtime results. To add this on your website you will need to register an account with the mentioned link and request access to their api. 

There are some required config values which should be included for the search to function accordingly. These are:

- App ID
- Api key
- Index name

These values will be available once you have followed the steps provided to apply for algolia docsearch and your request is granted.

Once these are available, you can then include them in an environment variable `.env` file which should be in the root of the template. For example in `templates/default/` folder. 

You may also have a look at the `.env.example` file that is included within the template.

Add the variables in the `.env` as shown below:

```
NEXT_PUBLIC_DOCSEARCH_APP_ID=YOUR_API_ID
NEXT_PUBLIC_DOCSEARCH_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_DOCSEARCH_INDEX_NAME=YOUR_INDEX_NAME
```