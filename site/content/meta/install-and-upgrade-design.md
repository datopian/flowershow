# Install and Upgrade - Design

# Mock-out of install / upgrade - 2022-07-16

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