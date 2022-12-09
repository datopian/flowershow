# Excalidraw support in flowershow

Flowershow supports displaying your excalidraw images on your site.

## Auto generating Excalidraw images

In Obsidian you can use the excalidraw plugin to auto generate images next to it's relevant file.

_Assuming that you have this plugin installed ..._

Head over to the excalidraw plugin in Obsidian settings and make sure you have the following setup configured.

1. Configure the plugin to export svg or png

![[docs-excalidraw-images-1.png]]
Note that you can choose png or svg ...

![[docs-excalidraw-images-2.png]] 2. Make sure you have a defined folder for your excalidraw files.

![[docs-excalidraw-images-3.png]]
Symlink this directory into public folder in flowershow.

```bash=
$ cd <your-flowershow-directory>
$ ln -s content/excalidraw/ site/public/
```
