'use strict';

const axios = require('axios');

async function getUserAndAccountData(accountId, userId) {
    try {
        const { data: users } = await axios.get(`${process.env.API_BASE_URL}/users`);
        const userRequest = users[userId]; // Specific user by id.
        const userAccount = userRequest?.accounts[accountId] || null; // get accounts by user.
        return { userRequest, userAccount};
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { userRequest: null, userAccount: null };
    }
}

module.exports = {
    getUserAndAccountData
};