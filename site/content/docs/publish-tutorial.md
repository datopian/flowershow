---
title: How to (self) publish your digital garden with Flowershow
---

## Table of contents

## Prepare the content

<div className="border-2 border-slate-400 rounded-md px-4 pb-3 mb-3">
❕ **Pre-requisites**
- [Node.js](https://nodejs.org/en/) installed
</div>

First, you'll need a folder with some markdown files you'd like to publish. You can use an existing one, e.g. your Obsidian vault. This folder should include at least a single `index.md` file at the root level, which will be used to generate the home page of your website. If it doesn't exist, Flowershow CLI will create it for you.

To create this folder from scratch, you can do:

```bash
mkdir my-digital-garden
cd my-digital-garden
echo 'Hello, world!' > index.md
```

You can create as many subfolders within your content folder as you want. Its directory tree will be reflected in url paths on the published website, e.g.: `my-content/blog/hello.md` file content will be available under `<base-url-of-your-published-website>/blog/hello`.

Each folder can have it's own `index.md` file, which will be available under it's parent directory path, e.g. `my-content/blog/index.md` will be available under `<base-url-of-your-published-website>/blog`.

In order to embed attachements (e.g. images or pdfs) in your markdown files, you will also need to create a dedicated folder for them in your digital garden folder.

> [!tip] Obsidian vault setup
> If you're an Obsidian user, you can set this folder as an attachments folder, by right-clicking on it in the sidebar on the left hand side. This way all embedded files will be saved to this folder automatically when you copy them to your notes.

You can create this folder by running:
```bash
mkdir my-digital-garden/assets #this can be any other name
```

> [!tip] Version control
> If you don't use git version control system to track changes in your digital garden yet, we recommend setting it up. Check [GitHub quickstart](https://docs.github.com/en/get-started/quickstart) to learn more.

## Install Flowershow template

In order to build your beautiful personal website out of your digital garden, you first need to install the Flowershow template somewhere on your computer. This template will be linked to your digital garden after the installation process.

Let's imagine you now have the following folder structure:

> ```sh
> some-parent-dir
> ├── my-digital-garden
> │   ├── assets
> │   └── index.md
> └── ...
> ```

If you want to install the Flowershow template in `some-parents-dir` you can either:

1) go that directory and run `npx flowershow install`

```sh
cd some-parent-dir
npx flowershow install
```

You'll be asked to confirm if you want to install the template in the current directory.

```
? Create Flowershow project in current directory? Yes
```

2) ...or you can pass this directory as an argument to the install command.

```sh
npx flowershow install some-parent-dir
```

After running install command you'll be shown a set of prompts, that will allow you to properly setup Flowershow with your digital garden.

```
? Path to the folder with your content files:
my-digital-garden
? Name of your assets (attachments) folder?
assets
🌷 Installing Flowershow template in /home/me/my-blog/.flowershow
⏳ Installing Flowershow dependencies...
```

At the end you should see the `.flowershow` folder created in the target directory. In our example the folder structure will look like this:

> ```sh
> some-parent-dir
> ├── my-digital-garden
> │   ├── assets
> │   ├── config.js
> │   └── index.md
> ├── .flowershow
> └── ...
> ```

Note that `config.js` and `index.md` files will be created automatically if they didn't exsist in your digital garden folder yet. The config file will allow you to do some basic configurations of your Flowershow app. See [[config|this guide]] to learn more.

### (Optional) customize your website

You can now customize your website by wrapping your content in custom layouts, using custom components in you Markdown files, importing data from files and more. See [[guides|our guides]] to learn how to do it.

## Build your website

You can preview your website locally by running the following command in the directory where `.flowershow` has been installed:

```bash
npx flowershow preview
```

...or by passing this directory as a command argument:

```bash
npx flowershow preview some-parent-dir
```

If your ready to publish your site, you can now build it with the following command:

```bash
npx flowershow build
# or npx flowershow build some-parent-dir
```

It will create a `.flowershow/.next` folder with your website files ready to be deployed.

If you want to 

## Deploy

This part is up to you. Flowershow is Next.js based, so you can use any of these hosting providers: Vercel, Cloudflare, Netlify, and others to deploy your website.

Sources you may find useful:

- [How to deploy a Next.js site with Vercel](https://vercel.com/guides/deploying-nextjs-with-vercel)
- [How to deploy a Next.js site with Cloudflare](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [How to deploy a Next.js site with Netlify](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/)
