"use strict"
const chai = require('chai')

const Template = require('../index')

const should = chai.should()

describe('Template', function () {
    it("should work", () => {
        let tmpl = new Template('test/test.tmpl', {})
        tmpl.toString().should.equal('1\n    2\n    3\n4')
    })

    it("should be fine", () => {
        let tmpl = new Template('test/test3.tmpl', {})
        tmpl.toString().should.equal('1\n    2\n    3\n4')
    })

    it("should have tests", () => {
        true.should.equal(true)
    })
})
