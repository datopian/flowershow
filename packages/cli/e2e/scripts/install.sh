#!/usr/bin/expect -f

set TEST_DIR [lindex $argv 0]

spawn "$TEST_DIR/../bin/flowershow.js" install "$TEST_DIR/__blog__" 

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

expect -timeout 120 eof
