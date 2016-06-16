'use strict';
var chai = require('chai');
chai.config.includeStack = true;
require('chai').should();
var expect = require('chai').expect;
var nodePath = require('path');
var fs = require('fs');

var plugin = require('../'); // Load this module just to make sure it works
var lasso = require('lasso');

describe('lasso-babel', function() {


  it('should compile a simple es2015 file', function(done) {
    var myLasso = lasso.create({
      fileWriter: {
        fingerprintsEnabled: false,
        outputDir: nodePath.join(__dirname, 'static')
      },
      bundlingEnabled: true,
      plugins: [{
        plugin: plugin,
        config: {
          ast: false,
          "presets": []
        }
      }]
    });

    myLasso.lassoPage({
      name: 'testPage',
      dependencies: [
        "babel:" + nodePath.join(__dirname, 'fixtures/simple.js')
      ]
    }, function(err, lassoPageResult) {
      if (err) {
        return done(err);
      }

      var output = fs.readFileSync(nodePath.join(__dirname, 'static/testPage.js'), {encoding: 'utf8'});
      expect(output).to.equal(
        '"use strict";\n\n$(function () {\n  var a = {\n    test: [],\n    fun: function fun(a) {\n      console.log(a);\n    },\n\n    text: "text"\n  };\n\n  var str = "I\'m a template string\\n  " + a.text + "\\n";\n});'
      );
      done();
    });
  });

});