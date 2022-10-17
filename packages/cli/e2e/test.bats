#!/usr/bin/env bats

setup() {
    set -e

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

# teardown() {
#     rm -rf $E2E_TEMP_DIR
# }


# @test "Install Flowershow template and preview site" {
#     run install.sh $E2E_TEMP_DIR
#     assert_success
#     assert_output --partial "Successfuly installed"
#     run [ -d $E2E_TEMP_DIR/.flowershow/node_modules ]
#     assert_success

#     run flowershow preview $E2E_TEMP_DIR & sleep 20
#     assert_success
#     run curl "http://localhost:3000"
#     fuser -k "3000/tcp"
#     assert_output --partial "Hello world"
# }

# @test "Install Flowershow template, build and start site" {
#     run install.sh $E2E_TEMP_DIR
#     assert_success
#     assert_output --partial "Successfuly installed"
#     run [ -d $E2E_TEMP_DIR/.flowershow/node_modules ]
#     assert_success

#     run flowershow build $E2E_TEMP_DIR
#     assert_success
#     run [ -d $E2E_TEMP_DIR/.flowershow/.next ]
#     assert_success

#     # start next project and send to background
#     run npm start --prefix $E2E_TEMP_DIR/.flowershow &
#     assert_success
#     # wait for the server to start
#     sleep 20
#     run curl "http://localhost:3000"
#     # kill the process before testing the output
#     # placing it after assert_output in case of test failure will leave the server process running
#     fuser -k "3000/tcp"
#     assert_output --partial "Hello world"
# }

flowershow_export() {
    npm run export --prefix .flowershow
}

@test "Install Flowershow template, build and deploy on Netlify" {
    # read environment variables
    run [ -e $BATS_TEST_DIRNAME/.env ]
    assert_success
    export $(grep -v '^#' $BATS_TEST_DIRNAME/.env | xargs)

    echo $E2E_TEMP_DIR
    run install.sh
    assert_success
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
    run [ -d .flowershow/out ]
    assert_success
    run zip out.zip .flowershow/out
    assert_success

    run deploy_netlify.sh
    assert_output "Success"
}
