sleep 5

npm install
npm run build

# Exécuter les migrations en mode développement uniquement si nécessaire
if [ "$NODE_ENV" = "development" ]; then
  npx prisma migrate dev
fi

# Lancer l'application en mode développement uniquement si nécessaire
if [ "$NODE_ENV" = "development" ]; then
  npm run start
fi

# Lancer l'application en mode production si NODE_ENV est différent de votre environnement de développement
#if [ "$NODE_ENV" != "development" ]; then
#  npm run start:prod
#fi
