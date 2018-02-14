#!/usr/bin/env bash

./public/yarn install



service nginx start
tail -f /var/log/nginx/error.log