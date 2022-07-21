# Assets folder

The assets folder can be created in the `site/content` folder and then symlinked in `public/assets`  in your template.

1. Create an assets folder in `site/content/`

2. Change into public directory.
```bash
cd templates/default/public
```

3. Symlink the assets file inside the public directory
```bash
ln -s ../../../site/content/assets assets
```

Once linked, you can now use your assets folder as source. For example:

```javascript
<img src="/assets/<filepath here>" alt=""></img>
```