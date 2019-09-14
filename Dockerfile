FROM mhart/alpine-node:12

WORKDIR /app

ADD . .

RUN npm i -g parcel-bundler typescript

RUN npm install && \
    npm run build

EXPOSE 37539
CMD ["npm", "run", "serve"]

