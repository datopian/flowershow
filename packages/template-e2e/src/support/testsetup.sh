#!/bin/sh

CONTENT_DIR=$1
E2E_TEMP_DIR=$(mktemp -d)

trap 'catch' ERR

catch() {
  echo "Error occurred"
  echo "See: $E2E_TEMP_DIR for artifacts"
  exit 1
}

degit https://github.com/datopian/flowershow-template $E2E_TEMP_DIR
rm -rf $E2E_TEMP_DIR/content
cp -r $CONTENT_DIR $E2E_TEMP_DIR/content

cd $E2E_TEMP_DIR
npm install
npm run dev -- -p 3030 &
