---
title: How to modify your theme
description: Learn how to add custom fonts and colors to your site
type: Blog
created: 2022-12-07
---

## Adding custom fonts to your site

_Adding a google font_

Let's say you want to add a font from fonts.google.com then you would perform the following steps: **I going to add a font, _Kanit_, to my website.**

1. Go to fonts.google.com
2. Select the font you want

![[kanit.png]]

3. Select the styles you want

![[style.png]]

4. Press `View selected families` at the top right
5. Copy everything inside the `<style>` tags

![[copystyle.png]]

6. Paste what you copied at the top of the `global.css` file, which can be found in your flowershow directory's style folder - `.flowershow/site/styles/global.css`

```css=
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@900&display=swap');
```

7. Open the file `tailwind.config.js` in `.flowershow` and add the new font by extending the fontFamily property of `theme` as shown below

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit"],
      },
    },
  },
};
```

Once added, you would then be able to use them in your tailwind classes by prefexing with `font-[name of the font]` eg. `font-kanit` in the above case.

So the following:

```
# Welcome to my Flowershow site!

<div className="font-kanit">
All of this text should be my custom font
</div>

<div>
All of this text should be the default font
</div>
```

Will change from this:

![[flowerbeforefont.png]]

To this!

![[flowerafterfont.png]]

> If you want all your markdown pages to use the new 'kanit' font from above then you can do so by adding it as a tailwind class in the docs layout file found in the layouts folder `flowershow/site/layouts/docs.jsx`

## Adding custom colors

To add custom colors in your site, extend the colors property for `theme` in `tailwind.config.js` as shown below

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#1e4558",
        secondary: "#d52027",
        "theme-yellow": "#ffb049",
      },
    },
  },
};
```

So the following:

```
<div className="bg-secondary">
This has the seconday color as background
</div>

<div className="bg-theme-yellow text-primary">
This has theme-yellow as backgound and primary as text
</div>
```

Will result in this:

![[changecolor.png]]

After adding the colors, you can use them in your tailwind classes for text, background, etc. For example taking the above values you can set the background color to your secondary color with `bg-secondary` or set the text color to your primary color with `text-primary`

> If you want all your markdown pages to use the newly added colors then you can do so by adding it as a tailwind class in the docs layout file found in the layouts folder `flowershow/site/layouts/docs.jsx`
