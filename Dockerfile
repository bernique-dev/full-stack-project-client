FROM node:16

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install -g @angular/cli
RUN yarn install
CMD ["ls"]
CMD ["ng", "serve", "--host", "0.0.0.0"]
