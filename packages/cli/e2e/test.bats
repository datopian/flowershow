#!/usr/bin/env bats

setup() {
    load 'test_helper/bats-support/load'
    load 'test_helper/bats-assert/load'

    # create a directory with an example blog, different for every test
    E2E_TEMP_DIR=$(mktemp -d)

    mkdir -p "$E2E_TEMP_DIR/content/assets"
    echo "# Hello world" > "$E2E_TEMP_DIR/content/index.md"
    cd $E2E_TEMP_DIR || exit

    # make executables in scripts/ and ../bin visible to PATH
    PATH="$BATS_TEST_DIRNAME/scripts:$BATS_TEST_DIRNAME/../bin:$PATH"
}

teardown() {
    rm -rf $E2E_TEMP_DIR
}

@test "Install Flowershow template, build and start site" {
    run install.sh $E2E_TEMP_DIR
    assert_success
    assert_output --partial "Successfuly installed"
    run [ -d $E2E_TEMP_DIR/.flowershow/node_modules ]
    assert_success

    run flowershow build $E2E_TEMP_DIR
    assert_success
    run [ -d $E2E_TEMP_DIR/.flowershow/.next ]
    assert_success

    # start next project and send to background
    run npm start --prefix $E2E_TEMP_DIR/.flowershow &
    assert_success
    # wait for the server to start
    sleep 10
    run curl "http://localhost:3000"
    # kill the process before testing the output
    # placing it after assert_output in case of test failure will leave the server process running
    fuser -k "3000/tcp"
    assert_output --partial "Hello world"
}


@test "Install Flowershow template and preview site" {
    run install.sh $E2E_TEMP_DIR
    assert_success
    assert_output --partial "Successfuly installed"
    run [ -d $E2E_TEMP_DIR/.flowershow/node_modules ]
    assert_success

    run flowershow preview $E2E_TEMP_DIR & sleep 10
    assert_success
    run curl "http://localhost:3000"
    fuser -k "3000/tcp"
    assert_output --partial "Hello world"
}
