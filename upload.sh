#!/bin/sh

#### written by Daisuke Homma
##
## first, create repo from github.com, click '+' menu to create new repository.
## then run below in the project directory.
## git init
## git commit -m 'first commit'
## git remote add origin https://github.com/<user>/<project>.git
## git push -u origin master
## having done, then run this script.
##

DATE=`date '+%Y/%m/%d %H:%M'`
MESSAGE="committed on ${DATE}."

if [ $# -eq 1 ]; then MESSAGE=$1; fi

git pull
git checkout master
git add .
git commit -a -m "${MESSAGE}"
git push origin master

