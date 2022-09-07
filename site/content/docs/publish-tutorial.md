---
title: How to publish your markdown files with Flowershow
---

<div className="border-2 border-slate-400 rounded-md px-4 mb-2">
🚧 The CLI tool used in the following tutorial is still under development. Go to the home page and subscribe to get notified when it's ready!
</div>

<div className="border-2 border-slate-400 rounded-md px-4 pb-3 mb-3">
❕ **Pre-requisites**
- [Node.js](https://nodejs.org/en/) installed
</div>

## Prepare the content

Create a folder with markdown files you'd like to publish or use your exisitng Obsidian vault. This folder should include at least `index.md` file, which will be used to create the home page of your website.

To create this folder from scratch, you can do:

```bash
mkdir my-content
cd my-content
touch index.md
echo 'Hello, world!' > index.md
```

You can create as many subfolders within your content folder as you want. Its directory tree will be reflected in url paths on your website, e.g.: `my-content/blog/hello.md` file content will be available under `<base-url-of-your-published-website>/blog/hello`. 

Each folder can have it's own `index.md` file, which will be available under it's parent directory path, e.g. `my-content/blog/index.md` will be available under `<base-url-of-your-published-website>/blog`.

<div className="border-2 border-slate-400 rounded-md px-4 pb-3 mb-3">
❕If you don't use git version control system to track changes in your content folder yet, we recommend setting it up.
See [GitHub docs](https://docs.github.com/en/get-started/quickstart) to learn more.
</div>

## Install Flowershow template

Once your content folder is ready, you can install the Flowershow app template in it using `@flowershow/cli` tool.

```bash
cd my-content
npx @flowershow/cli create
```

🚧 After running this command you'll be shown a set of prompts, that will allow you to properly setup the template with your content folder structure and make basic configurations of your website. At the end you should see the `.flowershow` folder in your content folder, as well as the `config.js` file, which includes basic configurations of your Flowershow app.

```bash
my-content
├── .flowershow
├── config.js
└── index.md
```

## (Optional) customize your website

You can now customize your website by wrapping you content in custom layouts, using custom components in you Markdown files, and more. See [[guides|our guides]] to learn how to do it.

## Build your website

If your content is ready, you can now build your website with the following command:

```bash
npx @flowershow/cli build
```

It will create a `.flowershow/.next` folder with your website files ready to be deployed.

## Deploying

This part is up to you. Flowershow is Next.js based, so you can use any of these hosting providers: Vercel, Cloudflare, Netlify, and others to deploy your website.

Sources you may find useful:
- [How to deploy a Next.js site with Vercel](https://vercel.com/guides/deploying-nextjs-with-vercel)
- [How to deploy a Next.js site with Cloudflare](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [How to deploy a Next.js site with Netlify](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/)





