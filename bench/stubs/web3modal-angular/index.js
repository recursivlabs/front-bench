// Runtime shim for the unpublished private package. Specs never exercise web3 flows.
class Web3ModalModule { static forRoot() { return { ngModule: Web3ModalModule, providers: [] }; } }
class Web3ModalService { constructor() {} open() { return Promise.reject(new Error('web3modal stub')); } }
module.exports = { Web3ModalModule, Web3ModalService };
