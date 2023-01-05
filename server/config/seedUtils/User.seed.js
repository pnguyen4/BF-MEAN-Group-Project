// models for seeding
const bcrypt = require('bcryptjs');
const saltRounds = parseInt(process.env.SALT_ROUNDS);


module.exports.generateUsers = async (userCount, adminCount) => {
    let userList = [];
    try {
        for( let i=0; i<userCount; i++ ) {
            const user = {
                username: `user-${i}`,
                email: `user-${i}@test.com`,
                password:`User${i}!pw123`,
                admin: i < adminCount
                    ? true
                    : false
            }
            user.password = await bcrypt.hash(user.password, saltRounds);
            userList.push(user);
        }
        return userList;
    } catch(e) {
        console.log(e)
    }
    
}