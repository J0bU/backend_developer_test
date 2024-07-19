'use strict';

const { createNewEntityDocument } = require("./createNewEntityDocument");
const { deleteEntityDocument } = require("./deleteEntityDocument");
const { getEntityDocument } = require("./getEntityDocument");
const { getUserAndAccountData } = require("./getUserAndAccountData");
const { isUserAllowed } = require("./isUserAllowed");
const { updateEntityDocument } = require("./updateEntityDocument");

const userServices = {
    "create": createNewEntityDocument,
    "read": getEntityDocument,
    "update": updateEntityDocument,
    "delete": deleteEntityDocument
};

const createServiceEntity =  async (req, res, form, property, entity) => {
    const { accountId } = req.params;
    const userId = req.headers[process.env.AUTHORIZATION_HEADER];
    
    try {
        const { userRequest, userAccount } = await getUserAndAccountData(accountId, userId);
        if( userRequest && userAccount) {
            const userRole = userAccount.role;
            const isAllowed = await isUserAllowed(accountId, userRole, form, property);
            if(isAllowed) {
                const mappedValues = {  user_id: userId, account_id: accountId,  ...req.body };

                // Get the function and executes using the property (create, read, update or delete).
                if(property === "update" || property === "delete") {
                    return await userServices[property](mappedValues, entity, "1721337292962", res);
                }

                return await userServices[property](mappedValues, entity, res);

            }
            else { 
                return res.status(401).json({ 
                    status: 401,
                    message: `This user is not authorizated to ${property} documents into ${entity} entity.`
                });
            }
        }else{
            return res.status(404).json({ status: 404, error: 'User error: This user identifier was not found or the account does not match with the user' });
        }
    }catch(error){
        return res.status(500).json({
            status: 500,
            message: "There was an error",
            error: error
        });
    }
};

module.exports = { 
    createServiceEntity,
}