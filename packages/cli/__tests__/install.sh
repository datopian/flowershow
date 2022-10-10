#!/usr/bin/expect

spawn npx flowershow install
expect -re "Create Flowershow project in current directory?"

send -- "\r"
send -- "content\r"
send -- "assets"
