#!/usr/bin/env bats

setup() {
    set -e

    load 'test_helper/bats-support/load'
    load 'test_helper/bats-assert/load'

    # create a directory with an example blog
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

@test "Install Flowershow template and preview site" {
    run install.sh
    assert_success
    assert_output --partial "Successfuly installed"
    assert [ -d .flowershow/node_modules ]

    run flowershow preview & sleep 20
    assert_success
    run curl "http://localhost:3000"
    fuser -k "3000/tcp"
    assert_output --partial "Hello world"
}

@test "Install Flowershow template, build and start site" {
    run install.sh
    assert_success
    assert_output --partial "Successfuly installed"
    assert [ -d .flowershow/node_modules ]

    run flowershow build
    assert_success
    run [ -d .flowershow/.next ]
    assert_success

    # start next project and send to background
    run npm start --prefix .flowershow &
    assert_success
    # wait for the server to start
    sleep 20
    run curl "http://localhost:3000"
    # kill the process before testing the output
    # placing it after assert_output in case of test failure will leave the server process running
    fuser -k "3000/tcp"
    assert_output --partial "Hello world"
}

flowershow_export() {
    npm run export --prefix .flowershow
}

# bats test_tags=netlify
@test "Install Flowershow template, build and deploy on Netlify" {
    # read environment variables
    run [ -e $BATS_TEST_DIRNAME/.env ]
    assert_success
    export $(grep -v '^#' $BATS_TEST_DIRNAME/.env | xargs)

    run install.sh
    assert_output --partial "Successfuly installed"
    run [ -d .flowershow/node_modules ]
    assert_success

    run flowershow build
    assert_success
    run [ -d .flowershow/.next ]
    assert_success

    # TODO add flowreshow export command?
    run flowershow_export
    assert_success
    assert [ -d .flowershow/out ]
    cd .flowershow
    run zip -r out.zip out
    assert_success

    run curl -H "Content-Type: application/zip" \
     -H "Authorization: Bearer $NETLIFY_TOKEN" \
     --data-binary "@out.zip" \
     "https://api.netlify.com/api/v1/sites"

    SITE_URL=$(echo $output | grep -oP '"url":"\K[^"]*')
    SITE_ID=$(echo $output | grep -oP '"id":"\K[^"]*')
    assert [ -n $SITE_URL ]

    # test deployed site
    sleep 30
    run curl -L $SITE_URL
    assert_output --partial "Hello world"

    # delete deployed site
    run curl -i -X DELETE -H "Authorization: Bearer $NETLIFY_TOKEN" \
     "https://api.netlify.com/api/v1/sites/$SITE_ID"
    assert_output --regexp 'HTTP.*[200|204]'
}
