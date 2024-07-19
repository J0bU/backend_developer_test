const { createServiceEntity } = require('../utils/createServiceEntity');

module.exports.createFermentationDocument = async (req, res) => {
    return await createServiceEntity(req, res, "form3", "create", "fermentation");
};

module.exports.getFermentationDocument = async (req, res) => {
    return await createServiceEntity(req, res, "form3", "read", "fermentation");
};

module.exports.updateFermentationDocument = async (req, res) => {
    return await createServiceEntity(req, res, "form3", "update", "fermentation")
};

module.exports.deleteFermetationDocument = async (req, res) => {
    return await createServiceEntity(req, res, "form3", "delete", "fermentation")
};



