"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var PORT = 37539;
var app = express();
app.set('port', PORT);
app.use('/public', express.static(path.join(__dirname, '..', 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', '/front-page.html'));
});
app.get('/ds/linked-list', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', '/linked-list.html'));
});
app.get('/ds/binary-tree', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', '/binary-tree.html'));
});
app.get('/ds/avl-tree', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', '/avl-tree.html'));
});
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500 - Server Error');
});
app.listen(app.get('port'), function () {
    console.log('express has started on port:' + PORT);
});
