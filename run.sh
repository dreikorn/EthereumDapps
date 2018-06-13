#!/bin/bash

ip=$(ip a|grep inet|grep eth0|awk '{print $2}'|cut -d'/' -f1)
sed -i -r "s/(host: *\").*/\1${ip}\",/"  /code/truffle.js
sed -i -r "s/(host: *').*/\1${ip}',/"  /code/config/index.js

/code/node_modules/.bin/ganache-cli &

/code/node_modules/.bin/truffle compile
/code/node_modules/.bin/truffle migrate

npm install
npm run dev
