#!/usr/bin/sh

curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $1" \
  https://api.github.com/repos/olayway/flowershow/deployments \
  -d '{"ref":"topic-branch","payload":"{ \"deploy\": \"migrate\" }","description":"Deploy request from hubot"}'
