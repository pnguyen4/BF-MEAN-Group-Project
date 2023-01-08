const { getRandomInt } = require('../../utils/getRandomInt.utils');

module.exports.generateVisaStatus = ( 
    status= getRandomInt(0, 10) < 5 ? "pending" : "done",
    OPTReceiptUrl="https://oiss.yale.edu/sites/default/files/images/OPT%20Check%20410.png", 
    OPTEADurl="https://fickeymartinezlaw-new.mycasewebsites2.com/wp-content/uploads/sites/2739/2020/02/EAD-Card-480x270.jpg",
    I983="https://formspal.com/pdf-forms/other/i983-form-fillable/i983-form-fillable-preview.webp",
    I20="https://centrenet.centre.edu/ICS/icsfs/mm/form-1-20-page-1.png?target=8d63c40a-aa53-4f1f-a811-c107d8d95a70",
    workAuth= getRandomInt(0, 10) < 5 ? "J1" : "F1",
    startDate= new Date(getRandomInt(0,1000000000000)),
    endDate= new Date(getRandomInt(0,1000000000000))
) => {
    return { status, OPTReceiptUrl, OPTEADurl, I983, I20, workAuth, startDate, endDate};
}




