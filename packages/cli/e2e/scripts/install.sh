#!/usr/bin/expect -f

# get test directory that contains a content folder from bats test file
# if you want to run this file manually, you need to pass the path to your test directory as it's argument
set TEST_DIR [lindex $argv 0]

# bats test file adds /packages/cli/bin to PATH
# if you want to run this file manually, you need to manually add /packages/cli/bin directory to PATH yourself
# e.g. PATH=~/flowershow/packages/cli/bin:$PATH
spawn flowershow.js install "$TEST_DIR"

expect {
    -re "Flowershow template is already installed in directory" { send -- "\r" }
}
expect {
    # TODO this seems to expect content folder name rather than path
    -re "Path to the folder with your content files" { send -- "content\r" }
    timeout { send_error "Failed to get prompt for content folder \n"; exit 1 }
}
expect {
    -re "Name of your assets" { send -- "assets\r" }
    timeout { send_error "Failed to get prompt for assets folder\n"; exit 1 }
}

# wait 120 seconds (arbitrary value) for the installation to complete and it's process to return EOF
# without it expect will finish execution efter the last expect statement and will clean up
# after itself killing its subprocesses, in this case the CLI process which is in the middle of installation
expect -timeout 120 eof
