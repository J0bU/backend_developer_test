
const { default: axios } = require('axios');

const updateEntityDocument = async (mappedValues, entity, id, res) => {
    // In this case the ID was fixed. You have to create a new record and take the id (example: 1721337292962)
    const {data} = await axios.put(`${process.env.API_BASE_URL}/${entity}/${id}`, mappedValues);
    
    return res.status(200).json({
        status: 201,
        message: data,
        record: mappedValues
    });
};

module.exports = {
    updateEntityDocument,
}