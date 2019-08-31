ssh root@95.85.43.196 <<'ENDSSH'
echo "1. Setting the workdir";
cd /var/www/antn.se

echo "2. Fetching latest updates";
git fetch origin
git reset --hard origin/master

echo "3. Build the static pages"
yarn
yarn prod:build

ENDSSH
