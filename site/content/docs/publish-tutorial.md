---
title: How to (self) publish your markdown files using Flowershow template
---

## Table of contents

<div className="border-2 border-slate-400 rounded-md px-4 mb-2">
🚧 The CLI tool used in the following tutorial is still under development. Go to the home page and subscribe to get notified when it's ready!
</div>

<div className="border-2 border-slate-400 rounded-md px-4 pb-3 mb-3">
❕ **Pre-requisites**
- [Node.js](https://nodejs.org/en/) installed
</div>

## Prepare the content

Create a folder with markdown files you'd like to publish or use your exisitng Obsidian vault. This folder should include at least a single `index.md` file, which will be used to generate the home page of your website. If it doesn't exist, Flowershow CLI will create it for you.

To create this folder from scratch, you can do:

```bash
mkdir my-content
cd my-content
touch index.md
echo 'Hello, world!' > index.md
```

You can create as many subfolders within your content folder as you want. Its directory tree will be reflected in url paths on your website, e.g.: `my-content/blog/hello.md` file content will be available under `<base-url-of-your-published-website>/blog/hello`.

Each folder can have it's own `index.md` file, which will be available under it's parent directory path, e.g. `my-content/blog/index.md` will be available under `<base-url-of-your-published-website>/blog`.

In order to add attachements (e.g. images) into your content, you will also need to create a dedicated folder for them in your content folder. If you're an Obsidian user, you should set this folder as an attachment folder, so that all files are saved to it automatically when you copy them to your files in Obsidian vault.

```bash
cd my-content
mkdir assets #this can be any other name
```

<div className="border-2 border-slate-400 rounded-md px-4 pb-3 mb-3">
❕If you don't use git version control system to track changes in your content folder yet, we recommend setting it up.
See [GitHub docs](https://docs.github.com/en/get-started/quickstart) to learn more.
</div>

## Install Flowershow template

Once your content folder is ready, you can install the Flowershow template in a directory of your choice.

```bash
cd my-site
npx flowershow install
```

After running this command you'll be shown a set of prompts, that will allow you to properly setup the template. At the end you should see the `.flowershow` folder created in the target directory. Also, `config.js` file (and `index.md` file if it didn't exsist) will be created in you content folder, which allows you to make basic configurations of your Flowershow app. See [[config|this guide]] to learn more.

```bash
my-content
├── config.js
└── index.md
```

### (Optional) customize your website

You can now customize your website by wrapping your content in custom layouts, using custom components in you Markdown files, importing data from files and more. See [[guides|our guides]] to learn how to do it.

## Build your website

If your content is ready, you can now build your website with the following command:

```bash
cd my-site #folder in which you have installed Flowershow template
npx flowershow build
```

It will create a `.flowershow/.next` folder with your website files ready to be deployed.

You can preview your website locally by running:

```bash
npx flowershow preview
```

## Deploy

This part is up to you. Flowershow is Next.js based, so you can use any of these hosting providers: Vercel, Cloudflare, Netlify, and others to deploy your website.

Sources you may find useful:

- [How to deploy a Next.js site with Vercel](https://vercel.com/guides/deploying-nextjs-with-vercel)
- [How to deploy a Next.js site with Cloudflare](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [How to deploy a Next.js site with Netlify](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/)
