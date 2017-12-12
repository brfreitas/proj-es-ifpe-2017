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
sed -i -e 's/href=\//href=/g' -e 's/src=\//src=/g' index.html
git add .
git commit -m "Regenerated static content for $CURRENT_COMMIT"
git push
echo "Deployed successfully."
exit 0
