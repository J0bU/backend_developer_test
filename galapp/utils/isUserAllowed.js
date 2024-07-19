'use strict'; 

const { accountRequest } = require("./getAccountData");

const isUserAllowed = async (accountId, userRole, form, property) => {
    const accountById = await accountRequest(accountId);

    const roleData = accountById.roles[userRole];

    if (roleData && roleData.permissions[form]) {
        return roleData.permissions[form][property] === true;
    }

    return false; // This means that the property "form" does not exist.
   
};

module.exports = { 
    isUserAllowed,
};