'use strict';
const { default: axios } = require('axios');

const accountRequest = async (accountId) => {
    const ACCOUNTS_PATH = "accounts";
    const { data: account } = await axios.get(`http://localhost:20000/${ACCOUNTS_PATH}/${accountId}`);
    return account;
};

module.exports = {
    accountRequest,
};