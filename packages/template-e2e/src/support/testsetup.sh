#!/usr/bin/sh

TEMPLATE_DIR=$1
TEST_CONTENT_DIR=$2
TEST_COMPONENTS_DIR=$3

ln -vfns $TEST_CONTENT_DIR $TEMPLATE_DIR/content
ln -vfns $TEST_CONTENT_DIR/assets $TEMPLATE_DIR/public/assets
ln -vfns $TEST_COMPONENTS_DIR $TEMPLATE_DIR/components/custom
