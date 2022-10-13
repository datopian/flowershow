#!/usr/bin/expect -f

spawn npx flowershow install
expect {
    -re "Need to install the following packages:" { send -- "\r" }
}
expect {
    -re "Create Flowershow project in current directory?" { send -- "\r" }
    timeout { puts "timeout 1"; exit 1 }
}
expect {
    -re "Flowershow template is already installed in directory" { send -- "\r" }
}
expect {
    -re "Path to the folder with your content files" { send -- "content\r" }
    timeout { puts "timeout 2"; exit 1 }
}
expect {
    -re "Name of your assets" { send -- "assets\r" }
    timeout { puts "timeout 3"; exit 1 }
}
expect -timeout 480 -re "Successfuffly installed Flowershow"
