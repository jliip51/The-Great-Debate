"use strict";

var expect = require("chai").expect;
var uniqueCategories = require("./controllers/controller.js");

var dbresult = [{Posts: { dataValues: { id: 1, category: 'a'}}, Posts: {dataValues: { id: 2, category: 'b'}}, Posts: {dataValues: { id: 3, category: 'b'}}, Posts: {dataValues: { id: 4,category: 'a'}}, Posts: {dataValues: { id: 5, category: 'a'}}}];
var obj = {}

describe("uniqueCategories", () => {
  it("return array without duplicate values", () => {
    expect(uniqueCategories(dbresult, obj, function(cb){}).to.equal(["a", "b", "c"]));
  });
});
