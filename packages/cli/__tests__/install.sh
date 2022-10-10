#!/usr/bin/expect

spawn npx lowersh install
send -- "\r"
send -- "content\r"
send -- "assets"
