const databaseService = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB,
        }
    });

    const table = 'items';

    const getAll = () => {
        return knex(table).select().orderBy('id','desc');
    }

    const getEgress = () => {
        return knex(table).where({type:'egress'}).select().orderBy('id','desc');
    }

    const getIngress = () => {
        return knex(table).where({type:'ingress'}).select().orderBy('id','desc');
    }

    const getBudget = () => {
        return knex(table).select().orderBy('id','desc').limit(10);
    }

    const insertItem = ({ concept,amount,type,create_time }) => {
        return knex(table).insert({
            concept: concept,
            amount: amount,
            type: type,
            create_time: create_time
        });
    }

    const modifyItem = (itemId, { id,concept,amount }) => {
        return knex(table).where({id:itemId}).update({
            id: id,
            concept: concept,
            amount: amount
        },['concept', 'amount'], { includeTriggerModifications: true });
    }

    const deleteItem = (itemId) => {
        return knex(table).where({id:itemId}).del();
    }

    return {
        getAll,
        getEgress,
        getIngress,
        insertItem,
        getBudget,
        modifyItem,
        deleteItem
    }
}

module.exports = {
    databaseService,
}