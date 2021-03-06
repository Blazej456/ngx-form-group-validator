#!/bin/bash

VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo $VERSION

sed -i 's/"ngx-group-validator": "[0-9]\.[0-9][0-9]*\.[0-9][0-9]*"/"ngx-group-validator": "'$VERSION'"/g' package.json

cd projects/ngx-group-validator || return

npm version $VERSION --git-tag-version false

git status
git add .
