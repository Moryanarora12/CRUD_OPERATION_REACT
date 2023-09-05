const knex = require('knex');
const dotenv = require('dotenv');
dotenv.config();
module.exports={
    knex:knex.knex({
        client: 'mysql2',
        connection:{
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database,
            secret: process.env.secret
        },
        pool:{min: 0, max: 7}
    })
}