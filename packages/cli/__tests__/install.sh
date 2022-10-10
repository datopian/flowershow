#!/usr/bin/expect

spawn npx flowershow
send -- "\r"
send -- "content\r"
send -- "assets"
