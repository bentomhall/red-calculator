#!/bin/zsh
./node_modules/typescript/bin/tsc && npx webpack
if [ $0 ]; then
	now=$(echo $(date +%d.%m.%y-%H:%M:%S) | md5)
	echo $now > ./dist/version.txt
	sed -e "s/{HASH}/$now/" ./src/html/calculator.template.html > ./dist/calculator.html
fi