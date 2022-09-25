# Dropdown

Flowershow supports adding dropdown menus in your navbar

## Adding Dropdown

Example of configuration in `your-content-dir/config.js`:

```js
const userConfig = {
  // links to the pages you want to add to the navbar
  navLinks: [
    { href: '/about', name: 'About' },
    //dropdown menu should not have an href and should contain 'subItems' array
    {name: 'DropdownExample', subItems: [{href: '/goToLink1', name: 'Link1'}, {href: 'goToLink2', name: 'Link2}]}
  ],
}

export default userConfig
```
