#!/bin/sh

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    fuser -k 3030/tcp
elif [[ "$OSTYPE" == "darwin"* ]]; then
    kill -9 $(lsof -ti:3030)
else
    echo "Unknown OS"
fi
