const query = require('../services/db');
const {
    multipleColumnSet,
    insertionColumnSet
} = require('../helper/sqlQueryHelperFunctions');


class UserLogin {

    tableName = 'user_login';

    findAll = async(params,getColumns='*') => {

        let sql = `SELECT ${getColumns} FROM ${this.tableName}`;

        if(params && Object.keys(params).length > 0)
        {
            let {
                columnSet,
                values
            } = multipleColumnSet(params);
    
            sql +=  ` where ${columnSet} `;
            console.log(sql,[...values]);
            return await query(sql,[...values]);
        }

        const result = await query(sql);
        return result;
    }

}

module.exports = new UserLogin;