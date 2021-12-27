const express = require('express')
const router = express.Router();
const sysRedirect = require('../redirects/sysRedirect');

router.get('/404', sysRedirect)

module.exports = router;