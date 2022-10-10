#!/usr/bin/expect

spawn npx flowershow install
expect {
    "Cradsfasdfeate flowershow project in current directory?" exp_continue
    exit 1
}
send -- "\r"
send -- "content\r"
send -- "assets"
