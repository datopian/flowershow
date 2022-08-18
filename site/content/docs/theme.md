# Dark and Light themes

## Users

Flowershow supports the feauture to switch themes in your website to dark or light modes. This can be found in the Navigation bar on the top right hand corner.

The theme by default is set to dark mode and can be switched on/off to change modes.

### Dark theme

![[dark-theme.png]]

### Light theme

![[light-theme.png]]


## Developers

Under the hood, Flowershow uses the [Next-theme](https://github.com/pacocoursey/next-themes) package. The theme component from the package can be found in `templates/default/pages/_app.js` and it's default mode can be configured there. For eg.,

```js
// in pages/_app.js

function MyApp({ Component, pageProps }) {
  
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
    ...
    </ThemeProvider>
  )
}
```

For additional configuration, please read their documentation.

The theme switcher button can be found in `templates/default/components/ThemeSelector.js` file. There you can find the button's icon (svg) and can replace or modify it as per your need.