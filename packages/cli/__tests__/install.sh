#!/usr/bin/expect

spawn npx flowershow install
expect "Create lowershow project in current directory?"

send -- "\r"
send -- "content\r"
send -- "assets"
