---
title: Page comments
---

Flowershow supports the integration of a user commenting feature on your website, allowing visitors to provide their feedback and thoughts on your pages. This functionality can be configured in the config file and can be optionally added to each page's frontmatter for more granular control.

![[page_comments.png]]

Page comments can be setup with any one of the following supported providers:

1. [giscus](https://giscus.app/)
2. [utterances](https://utteranc.es/)
3. [disqus](https://disqus.com/)

## Using environment variables

Each provider has it's own config values and it is highly recommended that you store them as environment variables rather than putting them in your config file directly. You can do so by creating a `.env` file in the `.flowershow` folder and adding the values as seen below.

> [!note]
> If you are hosting your website on hosting providers like netlify, vercel or clouflare, you will need to add the below env variables using their admin user interface and can skip the step of adding a `.env` file. Please follow their documentation on how to add environment variables.

### Giscus

```
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

### Utterances

```
NEXT_PUBLIC_UTTERANCES_REPO=
```

### Disqus

```
NEXT_PUBLIC_DISQUS_SHORTNAME=
```

Then you can use environment variables in your config file with `process.env`. For example, you can see how we can use these in the code below.

```js
// config.js

const config = {
  comments: {
    provider: 'giscus',
    config: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID
      ...
    }
  }
}
```

## Setting up comments using giscus

[Giscus](https://giscus.app/) uses your github repo's discussions feature to store your comments and display them on your site. To setup comments with giscus there are a few prerequisites to follow.

1. Have a public [github repo](https://docs.github.com/en/get-started/quickstart/create-a-repo) where you would like to store your comments and activate the [discussions](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository) feature.
2. Install the [giscus app](https://github.com/apps/giscus) in your repo by following their configuration setup at https://giscus.app/

Once the above steps are completed, we will have to get our config values. Head over to https://giscus.app and follow the steps there by filling out the fields.

> [!important]
> make sure to choose `pathname` under page discussions mapping.

After filling out the fields, you will be provided with a script tag that contains your config values. Now you are ready to enable giscus comments by adding these values in your config file.

```js
// config.js
const config = {
  comments: {
    provider: "giscus",
    config: {
      repo: "your repo",
      repositoryId: "your repo id",
      category: "your repo category name",
      categoryId: "your repo category id",
    },
  },
};
```

## Setting up comments using utterances

[Utterances](https://utteranc.es/) uses your github repo's issues to store comments for your pages and display them on your site. To setup comments with utterances, you would need to do the following:

1. Have a public github repository and install the utterances app by following their configuration setup at https://utteranc.es/

Once installed fill in the required fields and you will see a script tag with your repo value which you can add in your config file as seen below.

```js
const config = {
  comments: {
    provider: "utterances",
    config: {
      repo: "your repo here",
    },
  },
};
```

## Setting up comments using disqus

[Disqus](https://disqus.com/) is a feature rich provider which can be used to add comments to your site. You can configure flowershow to use disqus by creating an account on their site and following their process. You will be asked to enter a shortname for your site. Once completed, we can use this shortname in our comments configuration as below.

```js
const config = {
  comments: {
    provider: "disqus",
    config: {
      shortname: "your disqus shortname",
    },
  },
};
```

## Showing comments on pages

### Enable / disable comments for individual pages

You can enable / disable comments on individual pages by adding a `showComments` field in the page's frontmatter and setting it's value to `true` or `false`.

```md
---
showComments: true
---
```

### Enable / disable comments for pages in a directory

We can also setup comments for all pages within a specific directory by passing a pages property whose values are an array of strings.

```js
const config = {
  comments: {
    ...
    pages: ["blog"],
  }
}
```

In the above configuration the pages property allows you to define on which pages you would like the comments feature to be shown. For example, if you have a _blog_ folder in your content and would like the comments to be enabled only on your blog pages then you can add it here.
