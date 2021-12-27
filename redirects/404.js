const express = require('express');
const app = express();

const redirect404 = async (req, res, title, h1Text, h3Text, user, link, linkMessage) => {
    return await res.render('system/system', {
        title: title,
        message: h1Text,
        greeting: h3Text,
        user: user,
        link: link,
        linkMessage: linkMessage,
    });

}

module.exports = redirect404;