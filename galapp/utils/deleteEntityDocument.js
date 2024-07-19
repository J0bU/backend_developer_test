'use strict';

const { default: axios } = require('axios');

const deleteEntityDocument = async (mappedValues, entity, id, res) => {
    const {data} = await axios.delete(`${process.env.API_BASE_URL}/${entity}/${id}`);
    
    return res.status(200).json({
        status: 200,
        message: data,
        record: mappedValues
    });
};

module.exports = {
    deleteEntityDocument,
}