#!/usr/bin/env bats

setup() {
    load 'test_helper/bats-support/load'
    load 'test_helper/bats-assert/load'

    # get the containing directory of this file
    # use $BATS_TEST_FILENAME instead of ${BASH_SOURCE[0]} or $0,
    # as those will point to the bats executable's location or the preprocessed file respectively
    DIR="$( cd "$( dirname "$BATS_TEST_FILENAME" )" >/dev/null 2>&1 && pwd )"
    # make executables in script/ visible to PATH
    PATH="$DIR/scripts:$PATH"
}

teardown() {
    rm -rf "$DIR/__blog__/.flowershow"
}

@test "Install Flowershow template, build and start site" {
    run install.sh $DIR
    assert_success
    assert_output --partial "Successfuly installed"
    run [ -d $DIR/__blog__/.flowershow/node_modules ]
    assert_success

    run $DIR/../bin/flowershow.js build $DIR/__blog__
    assert_success
    run [ -d $DIR/__blog__/.flowershow/.next ]
    assert_success

    run npm start --prefix $DIR/__blog__/.flowershow & sleep 10
    assert_success
    run curl "http://localhost:3000"
    fuser -k "3000/tcp"
    assert_output --partial "Hello world"
}


@test "Install Flowershow template and preview site" {
    run install.sh $DIR
    assert_success
    assert_output --partial "Successfuly installed"
    run [ -d $DIR/__blog__/.flowershow/node_modules ]
    assert_success

    run $DIR/../bin/flowershow.js preview $DIR/__blog__ & sleep 10
    assert_success
    run curl "http://localhost:3000"
    fuser -k "3000/tcp"
    assert_output --partial "Hello world"
}
