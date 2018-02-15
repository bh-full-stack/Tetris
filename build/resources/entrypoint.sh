#!/usr/bin/env bash

yarn install

service nginx start
tail -f /var/log/nginx/error.log