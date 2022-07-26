# Assets folder

If you want to use images in your custom components and layouts or point to them in other parts of the HTML (e.g. in markdown), you should create a folder called `assets` at the top level of your `content` directory, and create a symlink to it in the `public` folder of your Flowershow app.

## Steps

1. Create an `/assets` folder in the folder with your markdown notes (e.g. your Obsidian vault):

```bash
cd your-content-dir
mkdir assets
```

2. Go to the `public` folder of the Flowershow app you've created with `create-next-app`:
```bash
cd my-flowershow-app/public
```

3. Create a symlink to the `assets` folder you've created in step 1:
```bash
ln -s your-content-dir/assets assets
```

Once linked, you can now use your assets folder as a source. For example:

```javascript
<img src="/assets/<filepath here>" alt=""></img>
```