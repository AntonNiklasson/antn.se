FROM mhart/alpine-node:10

RUN apk add nginx

WORKDIR /var/www

COPY package.json .
COPY yarn.lock .
RUN yarn
COPY src src
COPY posts posts
COPY gatsby-config.js .
COPY gatsby-node.js .
RUN yarn prod:build
RUN rm -r node_modules
RUN chmod -R +r .

CMD rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

CMD nginx
