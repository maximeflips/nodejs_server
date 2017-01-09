/**
 * Created for DevOps course on 21/11/2016.
 */
const express = require('express');
var jade = require('jade');
var todo_utils = require('./todo_utils');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
const app = express();
const port = 8080;

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.set('views', __dirname + '/views');app.set('view engine', 'jade');

todo_utils._init();
todo_utils._new();

app.get('/', (req, res) => {
    todo_utils._getAll((todoList) => {
        res.render('index',
            { todoList : todoList.join(' - ') }
        );
    });
});

app.get('/detail/:_id', (req, res) => {
    todo_utils._get(req.params._id, (things) => {
        res.render('detail',
            { things : things }
        );
    });
});

app.get('/new', (req, res) => {
    todo_utils._new();
    res.redirect('/');
});

app.post('/add', jsonParser, (req, res) => {
    todo_utils._add(req.body.things, (todoList) => {
        res.redirect('/');
    });
});

app.post('/delete', jsonParser, (req, res) => {
    todo_utils._del(req.body._id, (things) => {
        res.redirect('/');
    });
});

app.post('/get', jsonParser, (req, res) => {
    res.redirect('/detail/' + req.body._id);
});

var listener = app.listen((process.env.PORT || port), (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log('server is listening on ' + listener.address().port)
});