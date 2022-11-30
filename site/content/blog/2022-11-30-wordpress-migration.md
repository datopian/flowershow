---
title: Wordpress to Flowershow migration tutorial
description: Easily migrate your Wordpress content in 3 easy steps!
created: 2022-11-30
authors: [Philippe Du Preez]
---

Is your Wordpress site's speed comparable to a tortoise with cramping legs? 🐢 Server costs bleeding you dry? 🖥️ Lucky for you, migrating your content over to Flowershow has never been easier! Flowershow 🌷 is an **awesome** open source Next.js template that comes with batteries included 🔋

## Here's how it works in 3 simple steps:

> [!note]
> You should have Node installed

#### 1. Export your wordpress instance content to xml (**Export All**) using the in-built standard wordpress tool https://wordpress.com/support/export/

#### 2. Download [this script](https://github.com/flowershow/wordpress-export-to-markdown-plus) and then run the following:

- `cd wordpress-export-to-markdown-plus`
- `node index.js`

#### 3. Then fill in the wizard:

![[tpO8ISZ.png]]

- In this example the xml file has been renamed to `new` and placed in a folder `wordpress-test` next to where the tool is being run. Just use the relative path to where the xml file is located.
- The path of your output folder should end with `/content`
- The name of your assets/attachement folder is where all your images will be located and linked to.
- Your content folder is now ready to be converted into a flowershow site! 🚀 See [publish-tutorial](https://flowershow.app/docs/publish-tutorial) to create your site!

> [!note]
> If you have created a flowershow site prior to this, just copy all the files from the `content` folder created by the script into the `content` folder used by flowershow.

---

We 💙 feedback! If you have any ideas for new features or if you’ve noticed any bugs, please submit an issue [here](https://github.com/flowershow/flowershow/issues) or start a discussion [here](https://github.com/flowershow/flowershow/discussions). Thank you! 🌷

[Join our Discord server!](https://discord.gg/vQ5Y2uUzt6)
