#!/usr/bin/expect

spawn npx flowershow install
send -- "\r"
send -- "content\r"
send -- "assets\r"
