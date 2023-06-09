# Use the official Node.js base image
FROM node:18

RUN npm install -g npm@9.6.5

WORKDIR /app

ENV NODE_ENV=development
# COPY ./bin/sh/entrypoint.sh /usr/bin/entrypoint.sh
COPY . /back/

EXPOSE 8080

RUN chmod +x /back/entrypoint.sh
CMD ["sh", "/back/entrypoint.sh"]
#CMD ["sh", "npx prisma migrate dev ; npm run start"]