#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

create_tag() {
  git tag build-`date '+%Y-%m-%d-%H-%M'`
}

push_tags() {
  git remote add origin https://${GH_TOKEN}@github.com/anotherletter/N.git > /dev/null 2>&1
  git push --tags
}

setup_git
create_tag
push_tags
