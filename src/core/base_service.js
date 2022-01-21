import prismaClient from '../../prisma';

export default class BaseService {
    /**
     * @param {Object} connection
     */
    connection;

    constructor(model) {
        this.connection = prismaClient[model];
    }

    /**
     * @param {Object} params
     * @returns Array[{*}]
     */
    findMany(params = {}) {
        return this.connection.findMany(params);
    }

    /**
     * @param {Object} params
     * @returns Object
     */
    findUnique(params) {
        return this.connection.findUnique(params);
    }

    /**
     * @param {Object} params
     * @returns {*}
     */
    findFirst(params) {
        return this.connection.findFirst(params);
    }

    /**
     * @param {Object} params
     * @returns {*}
     */
    groupBy(params) {
        return this.connection.groupBy(params);
    }

    /**
     * @param {Object} data
     * @returns {data}
     */
    create(data) {
        return this.connection.create(data);
    }

    /**
     * @param data
     * @returns {*}
     */
    createMany(data) {
        return this.connection.createMany({ data });
    }

    /**
     * @param {Object} conditions
     */
    deleteMany(conditions = {}) {
        return this.connection.deleteMany({
            where: conditions,
        });
    }
}
