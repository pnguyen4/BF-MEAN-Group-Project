function getRandomInt ( min=1, max=100 ) {
    return Math.floor( (Math.random()*(max-min) + min) );  
} 

function generateAddress() {
    const street = getRandomInt(1, 10000) + " Fake St."
    const suiteOrAptNumber = getRandomInt(1, 100) + "";
    const city = "FakeCity";
    const state = "FS";
    const zipcode = getRandomInt(11111, 99999);

    return { street, suiteOrAptNumber, city, state, zipcode };
}

module.exports = {
    getRandomInt,
    generateAddress
}