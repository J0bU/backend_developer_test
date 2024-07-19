const getDayDifferences = (startDay, endDate) => {

    const initialDate = new Date(startDay);
    const finalDate = new Date(endDate);

    // This value is in ms.
    const msDifference = finalDate - initialDate;

    // Convert the difference from ms to days.
    const dayDifference = msDifference / (1000 * 60 * 60 * 24);

    // The format for these dates are mm-dd-aa. 
    // Make sure to work with this format.
    return Math.round(dayDifference);
};

module.exports = {
    getDayDifferences,
}