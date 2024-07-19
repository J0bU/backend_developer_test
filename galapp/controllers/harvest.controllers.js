const { default: axios } = require('axios');

const { getUserAndAccountData } = require('../utils/getUserAndAccountData');
const { isUserAllowed } = require('../utils/isUserAllowed');
const { createNewEntityDocument } = require('../utils/createNewEntityDocument');

const findTrueByRoles = (obj) => {

    const resultados = {};
    resultados["accountName"] = obj.name;
    
    for (const rol in obj.roles) {
       
        const rolObj = obj.roles[rol];
        const permissions = rolObj.permissions;

        resultados[rol] = [];

        for (const form in permissions) {
            if (permissions[form].read === true) {
                resultados[rol].push(form);
            }
        }
    }

    return resultados;
};

module.exports.getUserAccounts = async (req, res) => {

    const ACCOUNTS_PATH = process.env.ACCOUNTS_PATH;
    const { userId } = req.params; 
    const { data: { accounts } } = await axios.get(`${process.env.API_BASE_URL}/users/${userId}`);

    const resultados = [];
    const accountNames = [];

    for(let clave in accounts){
        accountNames.push(clave);
        const { data: account } = await axios.get(`${process.env.API_BASE_URL}/${ACCOUNTS_PATH}/${clave}`);
        const resultado = findTrueByRoles(account);
        resultados.push(resultado);
    }

    return res.status(200).json({
        status: 200,
        accounts: accountNames,
        forms: resultados,
    });
};

module.exports.createUserHarvest = async (req, res ) => {

    const { accountId } = req.params;
    const userId = req.headers[process.env.AUTHORIZATION_HEADER];

    try {
        const { userRequest, userAccount } = await getUserAndAccountData(accountId, userId);
        if(userRequest && userAccount) { 
            const userRole = userAccount.role;
            const isAllowed = await isUserAllowed(accountId, userRole, "form1", "create");
            if(isAllowed) {
                const mappedValues = {  user_id: userId, account_id: accountId,  ...req.body };
                await createNewEntityDocument(mappedValues, "harvest", res);
                }
                else { 
                    return res.status(401).json({ 
                        status: 401,
                        message: "This user is not authorizated to create a new documents into harvest entity."
                    });
                }
        }else{
            return res.status(404).json({ status: 404, error: 'User error: This user identifier was not found or the account does not match with the user' });
        }
    }catch(error){ 
        return res.status(500).json({
            message: "There was an error",
            error: error
        });
    }
};





