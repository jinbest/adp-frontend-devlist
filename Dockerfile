# build environment
FROM node:14.15.1-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

# production environment
FROM nginx:1.17-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

ENV PORT=4001

EXPOSE 4001

CMD ["nginx", "-g", "daemon off;"]


# FROM node:14.15.1-alpine AS builder

# WORKDIR /usr/app

# COPY package*.json ./

# COPY tsconfig*.json ./

# RUN npm install

# ENV PATH="./node_modules/.bin:$PATH"

# COPY . ./

# RUN npm run build


# FROM nginx:1.17-alpine

# RUN apk --no-cache add curl

# RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
#     chmod +x envsubst && \
#     mv envsubst /usr/local/bin

# COPY ./nginx.config /etc/nginx/nginx.template

# ENV PORT=4001

# CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

# COPY --from=builder /usr/app/build /usr/share/nginx/html