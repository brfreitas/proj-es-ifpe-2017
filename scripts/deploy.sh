#!/bin/bash
echo "Starting deployment"
echo "Target: gh-pages branch"

ORIGIN_URL=`git config --get remote.origin.url`
ORIGIN_URL_WITH_CREDENTIALS=${ORIGIN_URL/\/\/github.com/\/\/$GITHUB_TOKEN@github.com}
# checkout da branch gh-pages to directory gh-pages
git clone -b gh-pages $ORIGIN_URL_WITH_CREDENTIALS gh-pages
cd gh-pages
rm -rf *
rm -rf .babelrc
rm -rf .editorconfig
rm -rf .eslintignore
rm -rf .eslintrc.js
rm -rf .gitignore
rm -rf .postcssrc.js
rm -rf .travis.yml
cp -a ../dist/. .
git add .
git commit -m "Regenerated static content for $CURRENT_COMMIT"
git push
echo "Deployed successfully."
# copy dist content to gh-pages
# commit & push

#DIST_DIRECTORY="dist/"
#CURRENT_COMMIT=`git rev-parse HEAD`
#

#cp .gitignore $DIST_DIRECTORY || exit 1

#echo "Checking out gh-pages branch"
#git checkout -B gh-pages || exit 1

#echo "Removing old static content"
#git rm -rf . || exit 1

#echo "Copying dist content to root"
#cp -r $DIST_DIRECTORY/* . || exit 1
#cp $DIST_DIRECTORY/.gitignore . || exit 1

#echo "Pushing new content to $ORIGIN_URL"
#git config user.name "$GH_USER" || exit 1
#git config user.email "$GH_USER_EMAIL" || exit 1

#git add -A . || exit 1
#git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT" || exit 1
#git push --force --quiet "$ORIGIN_URL_WITH_CREDENTIALS" gh-pages > /dev/null 2>&1

#echo "Cleaning up temp files"
#rm -Rf $DIST_DIRECTORY

#
exit 0
