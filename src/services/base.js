import prismaClient from '../../prisma';

export default class BaseService {
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
}
