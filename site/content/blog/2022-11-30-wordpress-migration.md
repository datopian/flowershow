---
title: Wordpress to Flowershow migration tutorial
description: Easily migrate your Wordpress content in 3 easy steps!
created: 2022-11-30
authors: [Philippe Du Preez]
---

Is your Wordpress site's speed comparable to a tortoise with cramping legs? 🐢 Server costs bleeding you dry? 🖥️ Lucky for you, migrating your content over to Flowershow has never been easier! Flowershow 🌷 is an **awesome** open source Next.js template that comes with batteries included 🔋

We are going to start with our wordpress instance. Then we are going to convert all the content to simple markdown compatible with flowershow. All your pages will be created in the root directory inside your newly created `content` folder. All your posts will be created in a subdirectory called `blogs` inside your `content` folder. All your images will go to an `assets` folder. Custom components, however, will have to be remade.

```
content
├── about.md
├── contact.md
├── assets
│   └── picture.png
├── blogs
│   └── someblogpost.md
└── index.md
```

And **VOILÀ!** You can then add it to your new or existing flowershow site!

## Here's how it works in 3 simple steps:

> [!note]
> You should have Node installed

### 1. Export your wordpress instance content to xml

Export your wordpress instance content to xml. Use the in-built standard wordpress tool: https://wordpress.com/support/export/

1. Got to the tools section and choose export

![[toolexport.png]]

2. Choose the `All content` export option

![[exportall.png]]

3. Save the resulting file on your local computer by pressing the `Download Export File` button

### 2. Get this Wordpress to Flowershow conversion script

Run the following in your preferred terminal:

1. `git clone https://github.com/flowershow/wordpress-export-to-markdown-plus`
2. `cd wordpress-export-to-markdown-plus`
3. `npm install`
4. `node index.js`

### 3. Then fill in the wizard:

![[tpO8ISZ.png]]

- In this example the xml file has been renamed to `new` and placed in a folder `wordpress-test` next to where the tool is being run. Use the relative path to where the xml file is located.
- The path of your output folder should end with `/content`
- The name of your assets/attachement folder is where all your images will be located and linked to.
- Your content folder is now ready to be converted into a flowershow site! 🚀 See [publish-tutorial](https://flowershow.app/docs/publish-tutorial) to create your site!
- Any **tags** or **categories** listed in a post will be present in the frontmatter of that post.

> [!note]
> If you have created a flowershow site prior to this, just copy all the files from the `content` folder created by the script into the `content` folder used by flowershow.

---

We 💙 feedback! If you have any ideas for new features or if you’ve noticed any bugs, please submit an issue [here](https://github.com/flowershow/flowershow/issues) or start a discussion [here](https://github.com/flowershow/flowershow/discussions). Thank you! 🌷

[Join our Discord server!](https://discord.gg/vQ5Y2uUzt6)
