// seed utils
const { firstnameList, lastnameList } = require('./seedStore/names.store');
const { getRandomInt, generateAddress } = require('../../utils/generators.utils');


module.exports.generateApplication = () => {
    function getRandomName(names) {
        const idx = getRandomInt(0, names.length);
        const name = names[idx];
        return name;
    };

    const firstname = getRandomName(firstnameList);
    const lastname = getRandomName(lastnameList);
    const middlename = getRandomInt(0, 10) < 5 ? "Middle" : null
    const preferredname = getRandomInt(0, 10) < 5 ? "Nickname" : null

    const currentAddress = generateAddress();
    const cellphone = getRandomInt(1111111111, 799999999);
    const workphone = getRandomInt(1111111111, 799999999);
    const ssn = getRandomInt(111111111, 999999999);
    const reference = {
        firstname: getRandomName(firstnameList),
        lastname: getRandomName(lastnameList),
        phone: getRandomInt(1111111111, 799999999),
        email: `${firstname}sfriend@seed.com`
    };
    const emergencyContact = {
        firstname: getRandomName(firstnameList),
        lastname: getRandomName(lastnameList),
        phone: getRandomInt(1111111111, 799999999),
        email: `${firstname}sfamily@seed.com`
    };
    const isCitizenUSA = getRandomInt(0, 10) < 5 ? true : false;

    const application = {
        firstname, lastname, middlename, preferredname, currentAddress, 
        cellphone, workphone, ssn, reference, emergencyContact, isCitizenUSA
    };

    console.log({application});
    return application;
}