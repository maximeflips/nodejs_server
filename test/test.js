/**
 * Created by Adrien on 27/11/2016.
 */
var assert = require("assert");
var todo_utils = require('../todo_utils');

describe('#Check Error', function() {
    before('todo_utils._init()', function() {
        // runs before all tests in this block
        todo_utils._init();
    });

    describe('#Todo is null', function () {
        beforeEach('todo_utils._init()', function() {
            // runs before each test in this block
            todo_utils._init();
        });

        it('todo_utils._getAll should throw an error : todo is null', function () {
            assert.throws(function() { todo_utils._getAll((todoList) => { console.log(todoList); }) }, /todo is null/);
        });
        it('todo_utils._add should throw an error : todo is null', function () {
            assert.throws(function() { todo_utils._add('things', (todoList) => { console.log(todoList); }) }, /todo is null/);
        });
        it('todo_utils._get should throw an error : todo is null', function () {
            assert.throws(function() { todo_utils._get(0, (thing) => { console.log(thing); }) }, /todo is null/);
        });
        it('todo_utils._del should throw an error : todo is null', function () {
            assert.throws(function() { todo_utils._del(0, (thing) => { console.log(thing); }) }, /todo is null/);
        });
    });

    describe('#Bad id', function () {
        beforeEach('todo_utils._init & _new & _add(things 1) & _add(things 2) & _add(things 3)', function() {
            todo_utils._init();
            todo_utils._new();
            todo_utils._add('Things 1', (todoList) => {});
            todo_utils._add('Things 2', (todoList) => {});
            todo_utils._add('Things 3', (todoList) => {});
        });

        it('todo_utils._get(-1) should throw an error : bad id', function () {
            assert.throws(function() { todo_utils._get(-1, (thing) => { console.log(thing); }) }, /bad id/);
        });

        it('todo_utils._get(4) should throw an error : bad id', function () {
            assert.throws(function() { todo_utils._get(4, (thing) => { console.log(thing); }) }, /bad id/);
        });
    });


    after('todo_utils._init()', function() {
        // runs after all tests in this block
        todo_utils._init();
    });
});

describe('# Check success', function() {
    before('todo_utils._init()', function() {
        // runs before all tests in this block
        todo_utils._init();
    });

    describe('#Add 1 element array', function () {
        beforeEach('todo_utils._init & _new', function() {
            todo_utils._init();
            todo_utils._new();
        });

        it('todo_utils._add("A good thing") should return : "[A good thing]" and length of the list should be 1', function () {
            todo_utils._add('A good thing', (todoList) => {
                assert.deepEqual(todoList, ['A good thing']);
                assert.equal(todoList.length, 1);
            });
        });
    });

    describe('#Add 3 element array', function () {
        beforeEach('todo_utils._init & _new', function() {
            todo_utils._init();
            todo_utils._new();
            todo_utils._add('A good thing', (todoList) => {});
            todo_utils._add('A good thing', (todoList) => {});
        });

        it('3 todo_utils._add("A good thing") should return : "["A good thing", "A good thing", "A good thing"]" and length of the list should be 3', function () {
            todo_utils._add('A good thing', (todoList) => {
                assert.deepEqual(todoList, ['A good thing', 'A good thing', 'A good thing']);
                assert.equal(todoList.length, 3);
            });
        });
    });

    describe('#Get', function () {
        beforeEach('todo_utils._init & _new & _add(A thing) & _add(A good thing) & _add(Another thing)', function() {
            todo_utils._init();
            todo_utils._new();
            todo_utils._add('A thing', (todoList) => {});
            todo_utils._add('A good thing', (todoList) => {});
            todo_utils._add('Another thing', (todoList) => {});
        });

        it('todo_utils._get(1) should return : "A good thing"', function () {

            todo_utils._get(1, (thing) => {
                assert.equal(thing, 'A good thing');
            });
        });

        it('todo_utils._get(0) should return : "A good thing"', function () {
            todo_utils._del(0, (thing) => {});
            todo_utils._get(0, (thing) => {
                assert.equal(thing, 'A good thing');
            });
        });
    });
    describe('#Del', function () {
        beforeEach('todo_utils._init & _new & _add(A thing) & _add(A good thing) & _add(Another thing)', function() {
            todo_utils._init();
            todo_utils._new();
            todo_utils._add('A thing', (todoList) => {});
            todo_utils._add('A good thing', (todoList) => {});
            todo_utils._add('Another thing', (todoList) => {});
        });

        it('todo_utils._del(1) should return : "A good thing" and length of the list should be 2', function () {

            todo_utils._del(1, (thing) => {
                assert.equal(thing, 'A good thing');
            });

            todo_utils._getAll((list) => {
                assert.equal(list.length, 2);
            });
        });
    });


    after('todo_utils._init()', function() {
        // runs after all tests in this block
        todo_utils._init();
    });
});