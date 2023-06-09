# Utilisation d'une image de base contenant Node.js et Yarn
FROM node:18

RUN npm install -g npm@9.6.5

ENV NODE_ENV=development

WORKDIR /app/front

COPY . /app/front

CMD ["sh", "/entrypoint.sh"]