#/bin/zsh
echo $(date +%d.%m.%y-%H:%M:%S) > ./dist/version.txt
scp -i ~/.ssh/redbot.rsa -P 18765 ./dist/* u858-tssv5jetxizj@ssh.admiralbenbo.org:~/www/admiralbenbo.org/public_html/red-calculator