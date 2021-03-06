/**
 * MongoDB bottom data access layer.
 */
const MongoClient = require('mongodb').MongoClient;
const config = require('./config').config;

const mongoConfig = {
    url: config.mongoDBConnectionURL,
    db: config.dbName,
    telegramConfigCollection: 'telegram_config',
    validatorCollection: 'validators',
    chatCollection: 'chats',
    pendingBlockNotificationCollection: 'pending_block_notifications',
    rankHistoryCollection: 'rank_history',
    rewardCollection: 'rewards',
    rewardFetchInfoCollection: 'reward_fetch_info'
}

let mongoDBClient;
let mongoDB;

async function getMongoDB() {
    const mongo = new MongoClient(
        mongoConfig.url, 
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    mongoDBClient = await mongo.connect();
    if (!mongoDBClient) {
        throw new Error('Mongo connection error: client is null.');
    }
    const db = mongoDBClient.db(mongoConfig.db);
    if (!db) {
        throw new Error('Mongo connection error: database is null.');
    }
    return db;
}

async function connectMongoDB() {
    mongoDB = await getMongoDB();
}

async function disconnectMongoDB() {
    if (mongoDBClient) {
        await mongoDBClient.close();
    }
}

async function getValidatorCollection() {
    return await mongoDB.collection(mongoConfig.validatorCollection);
}

async function getChatCollection() {
    return await mongoDB.collection(mongoConfig.chatCollection);
}

async function getTelegramConfigCollection() {
    return await mongoDB.collection(mongoConfig.telegramConfigCollection);
}

async function getPendingBlockNotificationCollection() {
    return await mongoDB.collection(mongoConfig.pendingBlockNotificationCollection);
}

async function getRankHistoryCollection() {
    return await mongoDB.collection(mongoConfig.rankHistoryCollection);
}

async function getRewardCollection() {
    return await mongoDB.collection(mongoConfig.rewardCollection);
}

async function getRewardFetchInfoCollection() {
    return await mongoDB.collection(mongoConfig.rewardFetchInfoCollection);
}

module.exports = {
    connectMongoDB: connectMongoDB,
    disconnectMongoDB: disconnectMongoDB,
    getValidatorCollection: getValidatorCollection,
    getChatCollection: getChatCollection,
    getTelegramConfigCollection: getTelegramConfigCollection,
    getPendingBlockNotificationCollection: getPendingBlockNotificationCollection,
    getRankHistoryCollection: getRankHistoryCollection,
    getRewardCollection: getRewardCollection,
    getRewardFetchInfoCollection: getRewardFetchInfoCollection
};
