FROM node
label MANTAINER "Juan Luis Baptiste <juan.baptiste@gmail.com>"


RUN npm install -g ganache-cli && \
    npm install -g truffle && \
    npm install -g chai && \
    npm install -g chai-as-promised && \
    npm install -g truffle-contract
COPY run.sh /
RUN chmod 755 /run.sh
WORKDIR /code

EXPOSE 8545
EXPOSE 8089
CMD ["/run.sh"]
