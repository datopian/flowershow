#!/usr/bin/bash

curl -H "Content-Type: application/zip" \
     -H "Authorization: Bearer $NETLIFY_TOKEN" \
     --data-binary "@out.zip" \
     https://api.netlify.com/api/v1/sites/mysite.netlify.app/deploys
