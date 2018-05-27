# Ethereum Dapp Demo

> A very simple Ethereum DApp with [Vue.js](https://vuejs.org/) frontend. 
> This application represents two use cases of low complexity and is by
> no means ready for a real world production scenario, since it does not
> consider the full impact of Eventual Consistency in the Blockchain and
> intentionally uses some antipatterns to demo their negative Impact in
> the Workshop in more detail. 

## On Windows machines


[Install Chocolatey](https://chocolatey.org/) 

``` bash
# install NodeJS
choco install nodejs

#install Python
choco install python
```

## On Non-Windows machines

Make sure you have NodeJS and Python installed. Refer to OS- and Distribution-specific Instructions


## Build Setup

### Install required Tools

``` bash
npm i -g ganache-cli

npm i -g truffle

npm i chai

npm i chai-as-promised

npm i truffle-contract
```

### Start Ganache local Blockchain

``` bash
ganache-cli
```

- Install [Metamask Browser Plugin](https://metamask.io)
- Import the generated Accounts into Metamask

### Compile + Migrate Contracts and Build App 

Go to Project Directory

``` bash
/your/path/to/truffle compile

/your/path/to/truffle migrate

npm install 

npm run dev 
```

Start using the [App](http://localhost:8089/)
