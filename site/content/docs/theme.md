# Dark and Light themes

Dark mode is a dim-lighted user interface where the primary background colors are usually black or darker shades of grey with lighter text colors. Keeping a dark theme helps readers reduce their eye strain mainly during low level light conditions in the night.

Flowershow supports the feauture to switch themes in your website to dark or light modes. This can be found in the Navigation bar on the top right hand corner.

The theme by default is set to dark mode and can be switched on/off from the navbar to change modes.

## Further customization

### Setting theme defaults

To change the default theme to light mode, add the theme object in your `config.js` file as shown below.

```js
// config.js

const config = {
  theme: {
    default: 'light'
  }
}
```

### Replacing the button's icon

The theme toggle button's icon in the navbar can be replaced by setting the path to the icon image in the config as can be seen in the example below. 

The icon can be a .png or any supported image formats for the web, although, svg's are highly recommended due to it's size which helps in faster loads.

```js
// config.js

const config = {
  theme: {
    default: 'light',
    toggleIcon: '/assets/images/your-icon.svg'
  }
}
```
Note that in dark mode the color of the icon is set to grayscale and once toggled to light mode  it would then render it's original color.

### Dark theme

![[dark-theme.jpg]]

### Light theme

![[light-theme.jpg]]