"use strict";
var babel = require('babel-core');

function compileFile(path, config, callback) {
  babel.transformFile(path, config, function(error, result) {
    if (error) {
      callback(error);
    } else {
      callback(null, result.code);
    }
  });
}

var jsType = "babel";

module.exports = function babelPlugin(lasso, config) {
  lasso.dependencies.registerJavaScriptType(
    jsType, {
      properties: {
        "path": "string"
      },
      init: function(lassoContext, callback) {
        if (!this.path) {
          return callback(new Error('"path" is required'));
        }
        // NOTE: resolvePath can be used to resolve a provided relative path to a full path
        this.path = this.resolvePath(this.path);
        callback();
      },
      read: function(context, callback) {
        compileFile(this.path, config, callback);
      },
      getSourceFile: function() {
        return this.path;
      }
    }
  );
  lasso.dependencies.registerRequireExtension(
    jsType, {
      read: function(path, lassoContext, callback) {
        compileFile(path, callback);
      },

      getLastModified: function(path, lassoContext, callback) {
        lassoContext.getFileLastModified(path, callback);
      }
  });
};