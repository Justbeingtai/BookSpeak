const moment = require('moment');

function messageForum(username, text) {
    return {
        username,
        text,
        time: moment().format('MM/DD/YYYY h:mm')
    };
}

module.exports = messageForum;