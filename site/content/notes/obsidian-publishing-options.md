# Obsidian Publishing Options

> [!WARNING]
>
> This content has moved to https://flowershow.app/notes/obsidian-publishing-options

A list of existing obsidian publishing options including official obsidian publish and obsidian publish alternatives.

Plus some commentary on why flowershow could be useful addition to these and to the obsidian community.

Metadata

- description
- screenshot
- metadata
  - 🔗 primary url
  - 📣 announce date and url
  - ⭐ stars (plus github url)
  - 💤 is it actively developed
  - 💰 cost and/or license (if missing assume free and open source)
  - 💻 tech approach summary e.g. is it js, what framework, script to static then publish
- comments

# Summary

Typology of build approaches:

- Obsidian plugin
- Scripted conversion to a static site (usually python)
- NextJS or similar

What are common features (we can compare across)

- Syntax support i.e. markdown plus obsidian
- Default theme (look/feel)
- Customizability (themeability)
- Search
- Publishing control (e.g. show/hide pages)
- Links and network graph e.g. back/forward link info and overall graph

Attributes to sort by

- Date created
- Active-ness
- Cost/open-source

# Options

## Obsidian Publish

The official obsidian publish plugin.

- 🔗 https://help.obsidian.md/Obsidian+Publish/Introduction+to+Obsidian+Publish
- 💤 Active
- 💰 $20/month

![[Pasted image 20220815165038.png]]

### Pros

- previews on hover
- [Andy's sliding windows](https://notes.andymatuschak.org/Evergreen_notes)
- graph view
- possible password protection
- in form of Obsidian plugin
- you can select the notes you want to publish (set in frontmatter)
- you can toggle some UI elements like graph or sliding windows
- sidebar with collapsable groups of notes (no nesting, only grouping)
- light/dark theme
- readers comments (planned feature)

### Cons

- costly ($20/month or $198/year) and no self-hosting option
- not very customizable: you can use community themes (same as for desktop app) and tweak them or create your own
- not website-like look, just like an online version of Obsidian

## obsidian-zola

A no-brainer solution to turning your Obsidian PKM into a Zola site.

- 🔗 https://peteryuen.netlify.app/
- 📣 Jan 2022 - https://www.reddit.com/r/ObsidianMD/comments/s2vecw/a_quick_way_to_share_your_obsidian_pkm/?utm_source=share&utm_medium=web2x&context=3
- ⭐ 241 https://github.com/ppeetteerrs/obsidian-zola
- 💤 Still developed
- 💻 Python + some static CSS and JS

![[Pasted image 20220815154515.png]]
![[Pasted image 20220815174022.png]]

### Pros

- one-file setup and very easy to publish on netlify: only requires `netlify.toml` (with content copied from their example) to be added to Obsidian vault (+ of course Netlify setup)
- the above file also serves as a config file (see screenshot below), so you pass all the config as environtment variables (not sure what are benefits/drawbacks of this)
  ![[Pasted image 20220815160117.png]]
- Fusion 360 embeds ![[Pasted image 20220815201204.png]]

### Cons

- looks like Obsidian (on purpose, the author wanted to keep it simple)
- you can only configure a few elements on the page (again, using netlify.toml, where you can even write some HTML strings, which is a bit weird...)

## Perlite

A web-based markdown viewer optimized for Obsidian

- 🔗 https://perlite.secure77.de/
- 📣 Jul 2021 - https://forum.obsidian.md/t/perlite-publish-your-notes-to-your-own-web-server/21712
- ⭐ 219 https://github.com/secure-77/Perlite
- 💤 Active (commits in last month)
- 💻 PHP

![[Pasted image 20220815170303.png]]

### Pros

- has a [Discord server](https://discord.com/invite/pkJ347ssWT) with ~40 members

### Cons

- looks like Obsidian copy, but more geeky, raw
- doesn't really allow for customizations
- it's PHP 😛
- may not be obvious for people unfamiliar with PHP, docker or programming whatsoever how to run and configure this

## Pubsidian

An Obsidian-Publish alternative that's free. Static export via python script.

- 🔗 https://yoursamlan.github.io/pubsidian/
- 📣 Jul 2021 - https://forum.obsidian.md/t/pubsidian-free-and-elegant-obsidian-publish-alternative/21825
- ⭐ 162 https://github.com/yoursamlan/pubsidian
- 💤 Active
- 💻 static export via python script with vanilla JS (+D3.js)

![[Pasted image 20220815154225.png]]

![[assets/Pasted image 20220823164330.png]]

### Pros

- has a simple GUI program (for Windows) that you can run inside the folder you want to publish; you can set the name and assets folder; it will convert your content dir to static siteoutput dir (HTML, JS) and drag and drop your output directory in netlify
- search: full-text but also filename, tags
- button "Share now" to share current page
- flexibility to choose the notes to list in pubsidian

### Cons

- raw look, not website-like
- menu is just an alphabetical list of all notes
- graph can't handle too many nodes
- if you want to set some tags or unpublish a note you need to find it in a list of nodes (autogenerated) ![[Pasted image 20220814214316.png]]

## MindStone

Free Obisidian Publish alternative, for publishing your digital garden.

- 🔗 https://mindstone.tuancao.me/
- 📣 Apr 2020 - https://forum.obsidian.md/t/a-free-open-source-obsidian-publish-alternative/36178
- ⭐ 130 https://github.com/TuanManhCao/digital-garden
- 💤 Semi-active (last commit 4m ago, build broken)
- 💻 Next, React, D3

![[Pasted image 20220814215626.png]]

### Pros

- backlinks support
- graph view
- walkthrough video on yt
- rather simple setup - its just npm (although in the docs it says you need to copy content/images over to the project)

### Cons

- not customizable
- transclusion is not working yet
- graph view doesn't work very well (reportedly)

### Planned features

- Obsidian, Notion, VSCode Plugin (maybe)
- previews
- [Andy's sliding windows](https://notes.andymatuschak.org/Evergreen_notes)

## Obsidian Digital Garden

An obsidian plugin that builds your digital garden and publishes to netlify

- 🔗 https://notes.ole.dev/set-up-your-digital-garden/
- ⭐ 123 - https://github.com/oleeskild/obsidian-digital-garden
- 📣 Dec 2021 (based on github commits)
- 💤 Yes (commits in last month)

* 💻 JS (obsidian plugin)

![[Pasted image 20220815153959.png]]

### Pros

- Obsidian plugin
- transclusions
- dataview queries (?)
- PlantUML diagrams
- Excalidraw embedding
- Image embedding
- supports applying any community obsidian theme
- per-note settings with front-matter + global settings
- publication center?
  > **Open Publication Center**: This command behaves the same as the ribbon icon. It will open the publication center where you can view a list what files are published, changed, deleted and not yet published.
- you can "Update site to latest template" with a button

### Cons

- looks very geeky, raw
- only customization you can make is to fork and tweak

## Gatsby Garden

A Digital Garden Theme for Gatsby. Gatsby Garden lets you create a static HTML version of your markdown notes

- 🔗 https://notes.binnyva.com/
- ⭐ 90 - https://github.com/binnyva/gatsby-garden/
- 📣 Aug 2021 - https://forum.obsidian.md/t/gatsby-garden/22054
- 💤 Semi (last commit 4m ago. Original work ~2y ago)
- 💻 JS static renderer (via gatbsy).

![[Pasted image 20220815160741.png]]

### Pros

- RSS feed auto generated (?)
- sitemap autogenerated (?)
- page tags ![[Pasted image 20220815160848.png]]
- some meta data of the page
  ![[Pasted image 20220815161044.png]]

### Cons

- customization: just some basic config options (site metadata, navbar) in a `js` config file; if you want to change the look or behavior you need to make changes directly to to source code (fork & tweak)

## Quartz

🌱 host your own second brain and digital garden for free

- 🔗 https://quartz.jzhao.xyz/
- ⭐ 848 https://github.com/jackyzha0/quartz
- 📣 Jul 2022 - https://www.reddit.com/r/ObsidianMD/comments/onflb9/quartz_create_and_publish_your_obsidian_vault_for/
- 💤 Yes (v active)
- 💻 Static script using Hugo SSG to render

![[Pasted image 20220815162141.png]]

### Pros

- Based on Hugo a mature, feature-rich SSG
- 🎨 Clean, elegant theme
- 🔍 good full text search
- you can add code block titles
- Nice philosophy section https://quartz.jzhao.xyz/notes/philosophy/

### Cons

- installation process is full git plus you need to operate inside of the quartz structure
- again, you need to directly tweak CSS, no separation for future upgrades

## Markbase

- 🔗 https://www.markbase.xyz/
- ⭐ 13 - https://github.com/markbaseteam/obsidian-markbase
- 📣 2022-06-26 - https://forum.obsidian.md/t/building-markbase-1-a-non-technical-obsidian-publish-alternative/39485
- 💤 Active
- 💻 Obisidan-plugin pushing to a bespoke backend (?)

![[Pasted image 20220815164318.png]]

### Pros

- Obsidian plugin so you can publish from within obsidian (no git etc required)
- good looking callouts
- good looking tables

### Cons

- there will be a paid option if you want to customize it ($5/month, $49/year)

## obsidian-userland/publish

An open-source Obsidian Publish alternative. Obsidian is good for taking note / writing documentation but not good enough for reading. Since Obsidian Publish is too expensive for me, I start making a free alternative.

- 📣 Feb 2021 - https://forum.obsidian.md/t/i-made-a-open-source-obsidian-publish-alternative/12407
- ⭐ 176 - https://github.com/obsidian-userland/publish
- 💤 Inactive (the author [switched to logseq](https://github.com/obsidian-userland/publish/issues/1))

![[Pasted image 20220815170052.png]]

## Obsidian Mkdocs

Publish your obsidian vault through a python script.

Mkdocs Obsidian is an association between a python script and a Material mkdocs template to get a personal wiki site based on your Obsidian Vault.

- 📣 Dec 21 - https://forum.obsidian.md/t/obsidian-mkdocs-publisher-a-free-publish-alternative/29540
- ⭐️ 47 - https://github.com/ObsidianPublisher/obsidian-mkdocs-publisher-python
- 💤 active as of Aug 2022 based on comments on forum thread and updates

### Comments

- Main site page 404s: https://mara-li.github.io/mkdocs_obsidian_template/
- Has worked to make an obsidian plugin that somehow connects to github actions to do publishing (?)
