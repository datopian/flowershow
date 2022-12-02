# Flowershow website contents

Flowershow website at https://flowershow.app/

All website content is in `content/` subfolder and maps one to one to site urls.
`components/` include all custom components created for the purpose of this website.

After installing the dependencies of this repository the follwing symlinks will be created automatically by the script in `scripts/symlink-site.js`:
`template/components/custom` -> `site/components`
`template/content` -> `site/content`
`template/public/assets` -> `site/content/assets`
