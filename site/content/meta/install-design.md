# Install and Upgrade - Design

# Notes

## Reflections - 2022-08-24

See [[notes/upgrading-template-apps]]

- Installation / initialization
  - NB: We are going for the all in one so no need for a scaffolder
- Upgrading: main issue is conflicts
  - Merges: user and flowershow have changed a file => try and avoid user changing the file

Imagine the perfect world

```
mkdir my-garden
cd my-garden
vi index.md
# add some content

flowershow init
```

Recommended layout for your digital garden

```
components
content
```

### Init

* degit seems one of the most efficient ways to get the template down
* degit does overwrite
* ? degit won't remove old files

```bash=
mkdir -p .flowershow/app
cd .flowershow/app
npx degit flowershow/flowershow/templates/default

# symlink content directory
ln -s ../../ content
ln -s ../../components components/custom
```

### Run

```
flowershow run
```

What it does

```
cd .flowershow/app
npm run dev
open localhost:3000
```

## Mock-out of install / upgrade - 2022-07-16

In this case upgrading an existing NextJS app to use Flowershow.

```bash=
mkdir ecosystem-new
cd ecosystem-new

# flowershow install
npx create-next-app --example=https://github.com/flowershow/flowershow/templates/default .
mkdir content
echo `export default {}` > content/userConfig.js
echo getflowershowgitcommithash > .flowershow/version

# manual
cp -a ../ecosystem-old/content ./
cp -a ../ecosystem-old/pages/
cp -a ../ecosystem-old/components/Vis.js components/

# a week later, new features have been released in flowershow and i want to use them

flowershow upgrade

# in a perfect world i just download the latest flowershow e.g.

mkdir /tmp/flowershow-latest
npx create-..

# issues
package.json - because the user might have added packages ...
package-lock.json

# one way to solve that is to publish flowershow as a package with all dependencies ...

# and then just change package.json flowershow version

other place there may be conflict

pages/_app.js
```