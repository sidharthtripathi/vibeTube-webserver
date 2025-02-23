FROM node:latest
WORKDIR /webserver
COPY package*.json .
RUN npm install
COPY . .
RUN  npx prisma generate
RUN  npm run build
CMD ["npm","start"]

