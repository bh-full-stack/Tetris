FROM node

RUN apt-get update -y && apt-get install -y apt-transport-https && \
    apt-get install -y curl nginx

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -y && apt-get install -y yarn

ADD entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /var/www/html

ADD ./etc /etc

RUN ln -s /etc/nginx/sites-available/tetris /etc/nginx/sites-enabled/tetris

EXPOSE 80

ENTRYPOINT /usr/local/bin/entrypoint.sh