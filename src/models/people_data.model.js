const query = require('../services/db');
const {
    multipleColumnSet,
    insertionColumnSet,
    insertIntoColumnSet
} = require('../helper/sqlQueryHelperFunctions');


class PeopleData {

    tableName = 'people_data';

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

    add = async(params)=>{

        const {
            columnSet,
            fields,
            values
        } = insertIntoColumnSet(params);

        const sql = `INSERT INTO ${this.tableName}(${columnSet})VALUES (${fields})`;
        console.log(sql,[...values],'<--')
        const result = await query(sql, [...values]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;

    }


}

module.exports = new PeopleData;