ssh root@95.85.43.196 <<'ENDSSH'
cd /var/www/antonniklasson.se
git fetch origin
git reset --hard origin/master
yarn
yarn build
ENDSSH

