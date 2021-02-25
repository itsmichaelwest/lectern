/**
 * Scaffold channel API
 */
const createChannel = require('../database/channel/createChannel')

function updateChannel(channel) {
    createChannel(channel)
}

module.exports = {
    updateChannel
}