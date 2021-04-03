FROM node:14

WORKDIR /app

EXPOSE 3000

COPY ./node_modules ./node_modules
COPY server.js .

CMD ["node", "server.js"]
