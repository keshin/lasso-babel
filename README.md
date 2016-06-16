lasso-babel
==============

This Node.js module is a plugin for the [Lasso.js](https://github.com/lasso-js/lasso), that provides support to compile JavaScript with [Babel](https://babeljs.io/).

## Install

```sh
$ npm install --save lasso-babel
```

Install [Babel preset](https://babeljs.io/docs/plugins/) you need for your project

```
$ npm install --save babel-preset-es2015
```

## Usage

In your dependencies list in `browser.json`, just go ahead and all your source .jsx files
```js
[
    "babel:main.js",
    "babel:components/toolbar.js",
    ...
]
```
And add `lasso-babel` as the required plugin in `lasso-config.json`

```js
{
	"plugins": [
	    {
            "plugin": "lasso-babel",
            "config": {
            	"presets": ["es2015"]
        	}
        }
	    ...
	],
	...
}
```

You can also put the [Options](http://babeljs.io/docs/usage/options/) to [.babelrc](https://babeljs.io/docs/usage/babelrc/) if you'd like to.