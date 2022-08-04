#/bin/zsh
now=$(echo $(date +%d.%m.%y-%H:%M:%S) | md5)
echo $now > ./dist/version.txt
sed -e "s/{HASH}/$now/" ./dist/calculator.template.html > ./dist/calculator.html
scp -i ~/.ssh/redbot.rsa -P 18765 ./dist/* u858-tssv5jetxizj@ssh.admiralbenbo.org:~/www/admiralbenbo.org/public_html/red-calculator