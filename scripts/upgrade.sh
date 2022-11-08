# upgrade an existing standard nextjs site

npx degit flowershow/flowershow/templates/default --force

# files that we should keep the original (probably)
git checkout README.md
git checkout .gitignore

# stuff that shouldn't be there
rm .env.example
rm -Rf tests
rm netlify.toml
rm netlify.toml
# data seems to be exampleData
rm -Rf data
rm -Rf components/TempCallout.jsx

# set up custom components
rm -Rf components/custom

# set up assets
mkdir -p content/assets
rm public/assets
ln -s content/assets public/assets

# notes
echo "You may need to hand merge the following files:"
echo "pacakge.json, package-lock.json"
