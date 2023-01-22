#!/usr/bin/sh

TEMPLATE_DIR=$1
CONTENT_DIR=$2
COMPONENTS_DIR=$3

ln -vfns $CONTENT_DIR $TEMPLATE_DIR/content
ln -vfns $CONTENT_DIR/assets $TEMPLATE_DIR/public/assets
ln -vfns $COMPONENTS_DIR $TEMPLATE_DIR/components/custom

fuser -k 3000/tcp
