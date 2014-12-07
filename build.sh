
rm ./d8.js
cat ./files.txt | grep -v '^#' | grep -v '^$' | while read i; do cat ${i} >> ./d8.js; done

