#!/usr/bin/sh

TEMPLATE_DIR=$1
CONTENT_DIR=$2
COMPONENTS_DIR=$3
E2E_TEMP_DIR=$(mktemp -d)

cp -r $TEMPLATE_DIR $E2E_TEMP_DIR
# TODO we don't need to copy content and components
cp -r $CONTENT_DIR $E2E_TEMP_DIR
cp -r $COMPONENTS_DIR $E2E_TEMP_DIR

TEMP_TEMPLATE_DIR=$E2E_TEMP_DIR/$(basename $TEMPLATE_DIR)
TEMP_CONTENT_DIR=$E2E_TEMP_DIR/$(basename $CONTENT_DIR)
TEMP_COMPONENTS_DIR=$E2E_TEMP_DIR/$(basename $COMPONENTS_DIR)

ln -vfns $TEMP_CONTENT_DIR $TEMP_TEMPLATE_DIR/content
ln -vfns $TEMP_CONTENT_DIR/assets $TEMP_TEMPLATE_DIR/public/assets
ln -vfns $TEMP_COMPONENTS_DIR $TEMP_TEMPLATE_DIR/components/custom

# template package is using local versions of our remark plugins
# this is enabled in the template's package.json with "workspace:*" used instead of a package version
# e.g. "remark-callouts": "workspace:*"
# we need to replace it with latest
# TODO figure out a better way to run the tests, that would also use local versions of our remark plugins (?)
# maybe get back to symlinking directly from the template without copying to temp dir? (better not)
sed 's/workspace:\*/latest/' -i $TEMP_TEMPLATE_DIR/package.json

cd $TEMP_TEMPLATE_DIR
npm install
npm run dev -- -p 3030 &
