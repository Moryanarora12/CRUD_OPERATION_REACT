const bcrypt = require('bcrypt');
const { assertType } = require('graphql');
const saltRounds = 10;
module.exports={
    Query:{
        users: async(_,args,{knex})=>{
            const user = knex("users").select("*");
            return user;
        },
        user: async(_,{id},{knex})=>{
            const user = knex("users").where({id}).first();
            return user;
        }
    },
    Mutation:{
        addUser: async (_,{name,email,password,address,country,zip_code},{knex})=>{
            const existingMail = await knex("users").where({email}).first();
            if(existingMail){
                throw new Error("Email Already Exists");
            }
            if (!name || !email || !password || !address || !country || !zip_code) {
                return "Please fill in all the required details";
            }

            const hashedPassword = await bcrypt.hash(password,saltRounds);
            await knex("users").insert({
                name,
                email,
                password:hashedPassword,
                address,
                country,
                zip_code
            });
            return "Successfully Submitted"
        },
        deleteUser: async (_,{id},{knex})=>{
            const dltUser = await knex("users").where({id}).delete();
            if(dltUser){
                return "Successfully Deleted";
            }else{
                console.error("Invalid");
            }
        },
        updateUser: async(_,{id,name,email,password,address,country,zip_code},{knex})=>{
            const hashedPassword = await bcrypt.hash(password,saltRounds);
            const update = await knex("users").where({id}).update({name,email,password:hashedPassword,address,country,zip_code});
            if(update){
                return "Successfully Updated";
            }else{
                return "Invalid";
            }
        }
    }
}