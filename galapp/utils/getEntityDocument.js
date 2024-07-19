
'use strict'; 

const { default: axios } = require('axios');
const { getAverages } = require('./getAverages');

const getEntityDocument = async (mappedValues, entity, res) => {
    const {data} = await axios.get(`${process.env.API_BASE_URL}/${entity}`);
    
    const { dayAvg, quantityAvg } =await getAverages(data);

    return res.status(201).json({
        status: 200,
        data,
        summary: {
            avg_days: dayAvg,
            avg_weight_loss: quantityAvg
        }
    });
};

module.exports = {
    getEntityDocument,
}