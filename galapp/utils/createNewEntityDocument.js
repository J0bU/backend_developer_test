
'use strict';

const { default: axios } = require('axios');

const createNewEntityDocument = async (mappedValues, entity, res) => {
    const {data} = await axios.post(`${process.env.API_BASE_URL}/${entity}`, mappedValues);
    return res.status(201).json({
        status: 201,
        message: data,
        record: mappedValues
    });
};

module.exports = {
    createNewEntityDocument,
}