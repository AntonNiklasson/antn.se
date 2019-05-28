ssh root@95.85.43.196 <<'ENDSSH'
echo "1. Setting the workdir";
cd /var/www/antn.se

echo "2. Fetching latest updates";
git fetch origin
git reset --hard origin/master

echo "3. Building image";
docker build -t antn .

echo "4. Stop previous container"
docker stop antn-container || true

echo "5. Starting docker container";
docker run --rm -d -p 8000:8000 --name antn-container antn
ENDSSH
