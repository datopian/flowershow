#!/usr/bin/expect

spawn npx lowershow install
send -- "\r"
send -- "content\r"
send -- "assets"
