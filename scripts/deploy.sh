ssh root@95.85.43.196 <<'ENDSSH'
cd /var/www/antonniklasson.se
git reset --hard HEAD && git clean -f -d
git pull origin master
yarn
yarn build
ENDSSH

