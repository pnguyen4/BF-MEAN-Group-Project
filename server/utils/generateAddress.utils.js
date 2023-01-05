const { getRandomInt } = require('./getRandomInt.utils');

module.exports.generateAddress = () => {
    const street = getRandomInt(1, 10000) + "Fake St."
    const suiteOrAptNumber = getRandomInt(1, 100) + "";
    const city = "FakeCity";
    const state = "FS";
    const zipcode = getRandomInt(11111, 99999);

    return { street, suiteOrAptNumber, city, state, zipcode };
}