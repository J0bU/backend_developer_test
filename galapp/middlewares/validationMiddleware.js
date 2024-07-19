'use strict';
const { fermentationSchema } = require('../models/Fermentation');
const { harvestSchema } = require('../models/Harvest');

/* The ideal code in this case is to refactor it in just one function and
    create the different parameters as fermentation services. 
*/
const harvestDataValidation = (req, res, next) => {

    for (const key in req.body) {
        if (!harvestSchema[key]) {
            return res.status(400).json({ status: 400, error: `This property is not valid: ${key}` });
        }
    }

    const { employee, quantity, date } = req.body;
    
    // Data type validation
    if (typeof employee !== 'string' || !req.body.employee ) {
        return res.status(400).json({ status: 400, error: `The property "employee" must be a string and it's required` });
    }
    if (typeof quantity !== 'number' || !req.body.quantity ) {
        return res.status(400).json({ status: 400, error: `The property "quantity" must be a number and and it's required` });
    }
    if (isNaN(Date.parse(date)) || !req.body.date ) {
        return res.status(400).json({ status: 400, error: `The property "date" must be a valid date and it's required `});
    }

    next();
};

const fermentationDataValidation = (req, res, next) => {
    for (const key in req.body) {
        if (!fermentationSchema[key]) {
            return res.status(400).json({ status: 400, error: `This property is not valid: ${key}` });
        }
    }

    let { startDate, initialQuantity, endDate, finalQuantity } = req.body;
    
    // Data type validation
    if (isNaN(Date.parse(startDate)) || !req.body.startDate ) {
        return res.status(400).json({ status: 400, error: `The property "startDate" must be a valid date and it's required ` });
    }
    if (typeof initialQuantity !== 'number' || !req.body.initialQuantity ) {
        return res.status(400).json({ status: 400, error: `The property "initialQuantity" must be a number and and it's required` });
    }
    if (isNaN(Date.parse(endDate)) || !req.body.endDate ) {
        return res.status(400).json({ status: 400, error: `The property "endDate" must be a valid date and it's required `});
    }
    if (typeof finalQuantity !== 'number' || !req.body.finalQuantity ) {
        return res.status(400).json({ status: 400, error: `The property "finalQuantity" must be a number and and it's required` });
    }

    // Dates ! 
    startDate = parseDate(startDate);
    endDate = parseDate(endDate);

    if(endDate <= startDate) {
        return res.status(400).json({ status:400, error: 'The end date is not greather than the start date.' });
    } 

    // Quantity 
    if(finalQuantity > initialQuantity){
        return res.status(400).json({ status:400, error: 'The final quantity should be less or equal to the initial quantity. ' });
    }
    next();
};

const parseDate = ( date ) => {
    const splittedDate = date.split('-');
    const day = splittedDate[0];
    const month = splittedDate[1] - 1; 
    const year = splittedDate[2];
    return new Date(year, month, day);
};


module.exports = { 
    harvestDataValidation,
    fermentationDataValidation,
};