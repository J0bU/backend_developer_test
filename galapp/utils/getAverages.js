'use strict';

const { getDayDifferences } = require("./getDaysDifference");

const getAverages = async (data) => {

    const dayDifference = [];
    const quantityDifference = [];
    const initialQuantityValues = [];
    let startDate = 0;
    let endDate = 0;
    let initialQuantity = 0;
    let finalQuantity = 0;

    for(let element in data){
        if(data[element].account_id === "account2") {
            startDate = data[element].startDate;
            endDate = data[element].endDate;
            initialQuantity =  data[element].initialQuantity;
            finalQuantity = data[element].finalQuantity;
            quantityDifference.push(initialQuantity - finalQuantity);
            initialQuantityValues.push(initialQuantity);
            dayDifference.push(getDayDifferences(startDate, endDate));
        }
    }
    const dayAvg = ((dayDifference.reduce((acc, value) => acc + value, 0) || 1)/dayDifference.length);
    const quantityAvg = ((quantityDifference.reduce((acc, value) => acc + value, 0) || 1)/(initialQuantityValues.reduce((acc, value) => acc + value, 0) || 1));

    return { dayAvg, quantityAvg };
    
};

module.exports = {
    getAverages,
};