var express = require('express');
var router = express.Router();
var contacts = require('../modules/contactos');
var url = require('url');

router.get('/contacts', function (request, response) {
    var get_params = url.parse(request.url, true).query;
    if (Object.keys(get_params).length == 0) {
        response.setHeader('content-type', 'application/json');
        response.end(JSON.stringify(contacts.list()));
    }
    else {
        response.setHeader('content-type', 'application/json');
        response.end(JSON.stringify(contacts.query_by_arg(get_params.arg, get_params.value)));
    }
});
router.get('/contacts/:number', function (request, response) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(contacts.query(request.params.number)));
});
router.get('/groups', function (request, response) {
    console.log('groups');
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(contacts.list_groups()));
});
router.get('/groups/:name', function (request, response) {
    console.log('groups');
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(contacts.get_members(request.params.name)));
});

module.exports = router;