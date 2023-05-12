#!/usr/bin/expect -f

set CLI_EXE [lindex $argv 0]

spawn node "$CLI_EXE" install

expect {
    -re "Create Flowershow project in current directory?" { send -- "\r" }
}

expect {
    -re "Flowershow template is already installed in directory" { send -- "\r" }
}

expect {
    -re "Path to the folder with your markdown files" { send -- "content\r" }
    timeout { send_error "Failed to get prompt for content folder \n"; exit 1 }
}

# content folder needs to have assets folder inside for this to work
expect {
    -re "Select a folder with your assets" { send -- "\r" }
    timeout { send_error "Failed to get prompt for assets folder\n"; exit 1 }
}

# wait 120 seconds (arbitrary value) for the installation to complete and it's process to return EOF
# without it expect will finish execution efter the last expect statement and will clean up
# after itself killing its subprocesses, in this case the CLI process which is in the middle of installation
expect -timeout 120 eof
