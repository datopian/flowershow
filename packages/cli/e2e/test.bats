#!/usr/bin/env bats

# TODO check if we can run these tests in parallel
# TODO split to separate files so that we can have different setup and teardowns
# e.g. killing local server could then be moved to teardown
# and removing the deployed site, as atm there can be the case in which netlify test fails
# somewhere between deploy and delete, which will cause the delete part to never run

setup() {
    set -e

    load 'test_helper/bats-support/load'
    load 'test_helper/bats-assert/load'

    # create a directory with an example blog
    E2E_TEMP_DIR=$(mktemp -d)
    mkdir -p "$E2E_TEMP_DIR/content/assets"
    echo "# Hello world" > "$E2E_TEMP_DIR/content/index.md"
    cd $E2E_TEMP_DIR || exit

    PATH="$BATS_TEST_DIRNAME/scripts:$PATH"
    CLI_EXE="$BATS_TEST_DIRNAME/../dist/src/bin/cli.js"
}

teardown() {
    rm -rf $E2E_TEMP_DIR || true
}

@test "Install Flowershow template and preview site" {
    run install.sh $CLI_EXE
    assert_success
    assert_output --partial "Successfuly installed"
    assert [ -d .flowershow/node_modules ]

    run node $CLI_EXE preview & sleep 20
    assert_success
    run curl "http://localhost:3000"
    # kill the process before testing the output
    # placing it after assert_output in case of test failure will leave the server process running
    # TODO move it to teardown? e.g. start server on random server (in case the user is using 3000) and then kill it
    fuser -k "3000/tcp"
    assert_output --partial "Hello world"
}

@test "Install Flowershow template, build and start site" {
    run install.sh $CLI_EXE
    assert_success
    assert_output --partial "Successfuly installed"
    assert [ -d .flowershow/node_modules ]

    run node $CLI_EXE build
    assert_success
    run [ -d .flowershow/.next ]
    assert_success

    # start next project and send to background
    run npm start --prefix .flowershow &
    assert_success
    # wait for the server to start
    sleep 20
    run curl "http://localhost:3000"
    fuser -k "3000/tcp"
    assert_output --partial "Hello world"
}

# bats test_tags=netlify
@test "Install Flowershow template, build and deploy on Netlify" {
    # read NETLIFY_TOKEN from .env if it hasn't been set otherwise
    if [ -z $NETLIFY_TOKEN ]
    then
        assert [ -e $BATS_TEST_DIRNAME/.env ]
        export $(grep -v '^#' $BATS_TEST_DIRNAME/.env | xargs)
    fi

    run install.sh $CLI_EXE
    assert_output --partial "Successfuly installed"
    run [ -d .flowershow/node_modules ]
    assert_success

    run node $CLI_EXE export
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
    # TODO move it to teardown of a separete test file, so that the deployed site
    # is deleted no matter if the above assertion passes or fails
    run curl -i -X DELETE -H "Authorization: Bearer $NETLIFY_TOKEN" \
     "https://api.netlify.com/api/v1/sites/$SITE_ID"
    assert_output --regexp 'HTTP.*[200|204]'
}
