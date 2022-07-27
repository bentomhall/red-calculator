/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/main.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".container {\n\tmargin-top: 16px;\n}\n#output-table{\n\tborder: 1px solid black;\n\tborder-collapse: collapse;\n\tmargin-left: 16px;\n}\ntd, th {\n\tborder: 1px solid black;\n\ttext-align: center;\n\tpadding: 4px;\n}\n#chart {\n\tmax-width: 800px;\n\tmax-height: 400px;\n}\nlabel {\n\tdisplay: block;\n}\ntextarea {\n\tmin-width: 450px;\n}\n.form-container {\n\tdisplay: flex;\n\tflex-flow: row;\n}\n.form-element {\n\tmargin-right: 16px;\n}", "",{"version":3,"sources":["webpack://./src/css/main.css"],"names":[],"mappings":"AAAA;CACC,gBAAgB;AACjB;AACA;CACC,uBAAuB;CACvB,yBAAyB;CACzB,iBAAiB;AAClB;AACA;CACC,uBAAuB;CACvB,kBAAkB;CAClB,YAAY;AACb;AACA;CACC,gBAAgB;CAChB,iBAAiB;AAClB;AACA;CACC,cAAc;AACf;AACA;CACC,gBAAgB;AACjB;AACA;CACC,aAAa;CACb,cAAc;AACf;AACA;CACC,kBAAkB;AACnB","sourcesContent":[".container {\n\tmargin-top: 16px;\n}\n#output-table{\n\tborder: 1px solid black;\n\tborder-collapse: collapse;\n\tmargin-left: 16px;\n}\ntd, th {\n\tborder: 1px solid black;\n\ttext-align: center;\n\tpadding: 4px;\n}\n#chart {\n\tmax-width: 800px;\n\tmax-height: 400px;\n}\nlabel {\n\tdisplay: block;\n}\ntextarea {\n\tmin-width: 450px;\n}\n.form-container {\n\tdisplay: flex;\n\tflex-flow: row;\n}\n.form-element {\n\tmargin-right: 16px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/main.css":
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/classes/cleric.js":
/*!*******************************!*\
  !*** ./src/classes/cleric.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utility_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/util */ "./src/utility/util.js");
/* harmony import */ var _utility_dice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility/dice */ "./src/utility/dice.js");



class Cleric {
	modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	calculate(type, level, provider, mode, resources, options) {
			let sfDamage = this.sacredFlame(type, level, provider, mode);
			if (resources) {
					let swDamage = this.sacredWeapon(resources.uptime, level, provider, mode);
					return {damage: sfDamage.damage + (swDamage?.damage ?? 0), accuracy: (swDamage?.accuracy ?? sfDamage.accuracy + sfDamage.accuracy)/2};
			}
			return sfDamage;
	}

	sacredFlame(type, level, provider, mode) {
			let modifier = this.modifiers[level - 1];
			let extra = 0;
			if (type == 'bs' && level > 8) { extra = _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8; }
			else if (type == 'ps' && level > 8) { extra = modifier; }
			let {fail} = provider.vsDex(level, mode, modifier, 'flat');
			let dice = this.cantripDice(level);
			let baseDamage = dice*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8 + extra;
			return {damage: fail*baseDamage, accuracy: fail};
	}

	sacredWeapon(uptime, level, provider, mode) {
			if (level < 3) { return {damage: 0.0, accuracy: null};}
			let modifier = this.modifiers[level - 1];
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
			let baseDamage = _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8 + modifier;
			let critDamage = 2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8 + modifier;
			return {damage: _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(1, baseDamage, critDamage, hit, crit) * uptime, accuracy: hit};
	}

	cantripDice(level) {
			if (level < 5) { return 1;}
			else if (level < 11) { return 2;}
			else if (level < 17) { return 3;}
			return 4;
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cleric);

/***/ }),

/***/ "./src/classes/druid.js":
/*!******************************!*\
  !*** ./src/classes/druid.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utility_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/util */ "./src/utility/util.js");
/* harmony import */ var _utility_dice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility/dice */ "./src/utility/dice.js");


class Druid {
	modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	calculate(type, level, provider, mode, resources, options) {
			if (type != 'moon') { throw new Error('Not implemented');}
			if (level == 1) {
					return this.produceFlame(level, provider, mode);
			}
			return this.bearForm(level, provider, mode);
	}

	produceFlameDice = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4];
	produceFlame(level, provider, mode) {
			let dice = this.produceFlameDice[level -1];
			let modifier = this.modifiers[level - 1];
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
			return {damage: _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(1, dice*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8, 2*dice*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8, hit, crit), accuracy: hit};
	}

	bearForm(level, provider, mode) {
			let modifier = 6;
			let damageMod = 4;
			if (level >= 6) { modifier = 7; damageMod = 5;}
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat-unproficient');
			let damage = _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(1, _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8 + damageMod, 2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8 + damageMod, hit, crit) + _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(1, 2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d6+4, 4*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d6+4, hit, crit);
			return {damage, accuracy: hit};
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Druid);

/***/ }),

/***/ "./src/classes/fighter.js":
/*!********************************!*\
  !*** ./src/classes/fighter.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utility_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/util */ "./src/utility/util.js");
/* harmony import */ var _utility_dice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility/dice */ "./src/utility/dice.js");



class Fighter {
	baseModifiers = [3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	featAt4Modifiers = [3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
	_damage = new Map([
			['snb', {base: _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8, crit: 2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8, extra: 2}],
			['gs', {base: 2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d6, crit: 4*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d6, extra:1.33}],
			['gs_pa', {base: 2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d6, crit:4*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d6, extra: 1.33}],
			['gwm_pam', {base: _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d10, crit:2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d10, extra: 0.9}],
			['pam', {base: _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d10, crit:2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d10, extra: 0.9}]
	]);
	calculate(type, level, provider, accuracyMode, resources, options) {
			let aSUse = 0;
			if (resources) {
					let surges = this.actionSurges(level, resources.rests);
					aSUse = surges / resources.rounds;
			}
			let params = this._damage.get(type);
			if (!params) {throw new Error(`Type ${type} not implemented`);}
			let index = level - 1;
			let modifier =  this.baseModifiers[index];
			if (type == 'gwm_pam') {
					modifier = this.featAt4Modifiers[index];
			}
			let accuracyMod = modifier;
			let bonusDamage = 0;
			let extraPerHit = params.extra;
			if (type == 'gs_pa' || (type == 'gwm_pam' && level >=4)) {
					accuracyMod -= 5;
					extraPerHit += 10;
			}
			let {hit, crit} = provider.vsAC(level, accuracyMode, accuracyMod, this.extraCrit(level), 'flat');
			let damagePerHit = params.base + modifier + extraPerHit;
			let damagePerCrit = params.crit + modifier + extraPerHit;
			if (type == 'gwm_pam') {
					if (level >= 4) {
							bonusDamage = _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(1, _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d4+modifier+10.75, 2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d4+modifier+10.75, hit, crit);
					} else {
							bonusDamage = _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(1, _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d4+modifier+.75, 2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d4+modifier+0.75, hit, crit);
					}
			} else if (type == 'pam') {
					bonusDamage = _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(1, _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d4+modifier+.75, 2*_utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d4+modifier+0.75, hit, crit);
			}
			let attacks = this.attacks(level);
			return {damage:(1+aSUse)*_utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(attacks, damagePerHit, damagePerCrit, hit, crit)+bonusDamage, accuracy: hit};
	}

	attacks(level) {
			if (level < 5) { return 1;}
			else if (level < 11) { return 2;}
			else if (level < 20) { return 3;}
			return 4;
	}
	extraCrit(level) {
			if (level < 3) { return 0;}
			else if (level < 15) { return 1;}
			return 2
	}
	actionSurges(level, shortRests) {
			if (level < 2) { return 0;}
			else if (level < 17) { return 1*(shortRests+1);}
			return 2*(shortRests+1);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fighter);

/***/ }),

/***/ "./src/classes/monk.js":
/*!*****************************!*\
  !*** ./src/classes/monk.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utility_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/util */ "./src/utility/util.js");
/* harmony import */ var _utility_dice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility/dice */ "./src/utility/dice.js");


class Monk{
	modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	calculate(type, level, provider, mode, resources, options) {
			let base = 0;
			let {rounds, rests} = resources ?? {rounds:0, rests:0};
			let flurryDamage = 0;
			let extraDamage = 0;
			let flurryRounds = 0;
			if (rounds && rests) {
					flurryRounds = Math.min(rounds, level*rests);
					flurryDamage = this.flurry(level, provider, mode, flurryRounds) / rounds;
			}
			if (type == 'unarmed') {
					base = this.unarmedStrike(level, provider, mode);
			} else if (type == 'qs') {
					base = this.quarterstaff(level, provider, mode);
			} else if (type == 'mercy') {
					base = this.quarterstaff(level, provider, mode);
					let uses = 0
					if (rounds && level < 11) {
							uses = Math.max(0, level - rounds);
					} else if (rounds) {
							uses = rounds;
					}
					extraDamage = base.accuracy*this.handOfHarm(level, uses, rounds);
			} else if (type == 'astral') {
					base = this.quarterstaff(level, provider, mode);
					if (level > 3) {
							flurryRounds = Math.min(rounds - 1, level*rests);
							flurryDamage = this.flurry(level, provider, mode, flurryRounds) / rounds;
							extraDamage = this.astralArms(level, provider, mode, flurryRounds, rounds);
					}
			}
			else {
					alert(`Mode ${type} not implemented`);
					throw new Error(`Mode ${type} not implemented`);
			}
			return {damage: base.damage + flurryDamage + extraDamage, accuracy:base.accuracy};
	}

	quarterstaff(level, provider, mode) {
			let weaponDie = _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d10;
			let unarmedDie = this.martialArtsDie(level);
			let modifier = this.modifiers[level - 1];
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
			let {weapon, unarmed} = this.attacks(level, true);
			let weaponDamage = weaponDie + modifier;
			let unarmedDamage = unarmedDie + modifier;
			let weaponCrit = 2*weaponDie + modifier;
			let unarmedCrit = 2*unarmedDie + modifier;
			return {damage: _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(weapon, weaponDamage, weaponCrit, hit, crit) + _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(unarmed, unarmedDamage, unarmedCrit, hit, crit), accuracy: hit};
	}

	unarmedStrike(level, provider, mode) {
			let modifier = this.modifiers[level - 1];
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
			let dieSize = this.martialArtsDie(level);
			let baseDamage = dieSize + modifier;
			let critDamage = 2*dieSize + modifier;
			let attacks = this.attacks(level, false).unarmed;
			return {damage: _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(attacks, baseDamage, critDamage, hit, crit), accuracy: hit};
	}

	attacks(level, useWeapon){
			if (!useWeapon) {
					if (level < 5) { return {unarmed:2, weapon: 0} }
					return {unarmed: 3, qs: 0};
			} else {
					if (level < 5) { return {weapon: 1, unarmed: 1}}
					return {weapon: 2, unarmed: 1}
			}
	}

	flurry(level, provider, mode, rounds) {
			if (level == 1) { return 0; }
			let modifier = this.modifiers[level - 1];
			let dieSize = this.martialArtsDie(level);
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
			let baseDamage = dieSize + modifier;
			let critDamage = 2*dieSize + modifier;
			let attacks = rounds;
			return _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(attacks, baseDamage, critDamage, hit, crit);
	}

	martialArtsDie(level) {
			let dieSize;
			if (level < 5) {dieSize = _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d4;}
			else if (level < 11) { dieSize = _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d6;}
			else if (level < 17) { dieSize = _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d8;}
			else {dieSize = _utility_dice__WEBPACK_IMPORTED_MODULE_1__["default"].d10;}
			return dieSize;
	}

	handOfHarm(level, uses, rounds) {
			if (level < 3) { return 0;}
			let die = this.martialArtsDie(level);
			return (die + modifiers[level - 1])*Math.min(uses, rounds)/rounds;
	}

	astralArms(level, provider, mode, flurryRounds, rounds, targets = 1) {
			if (level < 3) { return 0;}
			let modifier = modifiers[level - 1];
			let die = this.martialArtsDie(level);
			let {fail} = provider.vsDex(level, mode, modifier, 'flat');
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
			let armsDamage = targets*fail*2*die;
			if (level < 11) {
					return armsDamage / rounds;
			} else if (level < 17) {
					return (armsDamage + hit*die*flurryRounds)/rounds;
			} else if (Math.max(rounds, level) >= flurryRounds + 4) {
					armsDamage += hit*die*(flurryRounds);
					return (armsDamage/rounds) + getDamageWithCrits(1, die+modifier, 2*die+modifier, hit, crit);
			}
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Monk);


/***/ }),

/***/ "./src/classes/presets.js":
/*!********************************!*\
  !*** ./src/classes/presets.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class PresetCalculator {
    constructor(accuracyProvider, presets) {
        this._accuracyProvider = accuracyProvider;
        this._map = presets;
        this._rogue = this._map.get('red_baseline').obj;
    }

    calculate(preset, level, accuracyMode) {
        let {obj, type, resources, options} = this._map.get(preset);
        if (!obj) {
            let msg = `Preset ${preset} not supported`;
            alert(msg)
            throw new Error(msg);
        }
        let raw = obj.calculate(type, level, this._accuracyProvider, accuracyMode, resources, options);
        let red = this._rogue.calculateRED(level, this._accuracyProvider, accuracyMode, 0).damage;
        return {red: raw.damage/red, raw: raw.damage, accuracy: raw.accuracy};
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PresetCalculator);








/***/ }),

/***/ "./src/classes/rogue.js":
/*!******************************!*\
  !*** ./src/classes/rogue.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utility_dice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/dice */ "./src/utility/dice.js");
/* harmony import */ var _utility_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility/util */ "./src/utility/util.js");



class Rogue {
	constructor() {
			this.attacks = 1;
			this.sneakAttack = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
			this.modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	}

	calculate(type, level, provider, accuracyMode, resources = null, options=null) {
			switch(type) {
					case 'red':
							return this.calculateRED(level, provider, accuracyMode, options);
					case 'twf':
							return this.calculateTWF(level, provider, accuracyMode);
			}
	}

	calculateRED(level, provider, mode, options=null) {
			let index = level - 1;
			let mod = this.modifiers[index];
			if (options) {
					let advantage = provider.vsAC(level, mode, mod, 0, 'advantage');
					let disadvantage = provider.vsAC(level, mode, mod, 0, 'disadvantage');
					let flat = provider.vsAC(level, mode, mod, 0, 'flat');
					let aDamage = options.advantage*this.mainHand(index, advantage.hit, advantage.crit, 0, 0) + this.sneakAttackWithAccuracy(index, advantage.hit, advantage.crit, 1);
					let dDamage = options.disadvantage*this.mainHand(index, disadvantage.hit, disadvantage.crit, 0, 0);
					let fDamage = (1 - options.advantage - options.disadvantage) * this.mainHand(index, flat.hit, flat.crit, 0, 0) + this.sneakAttackWithAccuracy(index, flat.hit, flat.crit, 1);
					let averageAccuracy = options.advantage * advantage.hit + options.disadvantage * disadvantage.hit + (1 - options.advantage - options.disadvantage) * flat.hit;
					return {damage: aDamage + dDamage + fDamage, accuracy: averageAccuracy};
			} else {
					let {hit, crit} = provider.vsAC(level, mode, this.modifiers[index], 0, 'flat');
					let damage = this.mainHand(index, hit, crit, 0, 0, true, _utility_dice__WEBPACK_IMPORTED_MODULE_0__["default"].d6) + this.sneakAttackWithAccuracy(index, hit, crit, 1);
					return {damage, accuracy: hit};
			}
	}

	calculateTWF(level, provider, mode) {
			let index = level - 1;
			let modifier = this.modifiers[index];
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
			let damage = this.mainHand(index, hit, crit) + this.mainHand(index, hit, crit, -1*modifier, 0) + this.sneakAttackWithAccuracy(index, hit, crit, 2);
			return {damage, accuracy: hit};
	}

	mainHand(index, hit, crit, extraStatic = 0, extraDice = 0, dieSize = _utility_dice__WEBPACK_IMPORTED_MODULE_0__["default"].d6) {
			let modifier = this.modifiers[index];
			let damagePerHit = dieSize + modifier + extraDice + extraStatic;
			let damagePerCrit = 2 * dieSize + modifier + extraDice + extraStatic;
			return _utility_util__WEBPACK_IMPORTED_MODULE_1__["default"].getDamageWithCrits(1, damagePerHit, damagePerCrit, hit, crit);
	}

	sneakAttackWithAccuracy(index, hit, crit, attacks) {
		let dice = this.sneakAttack[index]*_utility_dice__WEBPACK_IMPORTED_MODULE_0__["default"].d6;
		if (attacks == 1) {
			return hit*dice + 2*crit*dice;
		}
		//only 2 attacks possible here
		let chance = 2 - hit - crit;
		return dice * (hit*chance + 2*crit*chance);
		
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rogue);

/***/ }),

/***/ "./src/classes/warlock.js":
/*!********************************!*\
  !*** ./src/classes/warlock.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utility_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/util */ "./src/utility/util.js");


class Warlock {
	modifiers = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	calculate(hasAB, level, provider, mode, resources, options) {
			let {slots, spellLevel} = this.getSlots(level);
			let modifier = this.modifiers[level - 1];
			let staticExtra = hasAB && level > 1 ? modifier : 0;
			let hexDamage = resources ? this.getHexUptime(resources.rounds, spellLevel, resources.duration)*Dice.d6 : 0;
			let attacks = this.getAttacks(level);
			let {hit, crit} = provider.vsAC(level, mode, modifier, 0, 'flat');
			return {damage: _utility_util__WEBPACK_IMPORTED_MODULE_0__["default"].getDamageWithCrits(attacks, Dice.d10+staticExtra+hexDamage, 2*Dice.d10+staticExtra+2*hexDamage, hit, crit), accuracy: hit};
	}

	getSlots(level) {
			let slotLevel = Math.min(Math.ceil(level / 2), 5);
			if (level == 1) {
					return {slots: 1, spellLevel: slotLevel}
			} else {
					return {slots: 2, spellLevel: slotLevel}
			}
	}

	getAttacks(level) {
			if (level < 5) { return 1;}
			else if (level < 11) { return 2;}
			else if (level < 17) { return 3;}
			return 4;
	}

	getHexUptime(rounds, spellLevel, duration) {
			if (duration > 2*rounds) { return 1.0; }
			else if (duration > rounds && spellLevel > 2) {
					return 1.0;
			} else {
					return 1.0/Math.max(duration, rounds);
			}
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Warlock);

/***/ }),

/***/ "./src/utility/accuracy.js":
/*!*********************************!*\
  !*** ./src/utility/accuracy.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const proficiency = [2, 2, 2, 2, 3, 3, 3 ,3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
class DMG {
    _armorData = {
        bossAC: [13, 14, 15, 15, 15, 16, 16, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19],
        halfLevelAC: [13, 13, 13, 13, 13, 13, 13, 14, 14, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 17],
        onLevelAC: [13, 13, 13, 14, 15, 15, 15, 16, 16, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19]
    }
    _dexSave = {
        boss: [2, 2, 2, 3, 2, 2, 3, 4, 2, 3, 4, 3, 6, 5, 5, 5, 6, 7, 6, 8],
        halfLevel: [1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 3],
        onLevel: [2, 1, 2, 2, 2, 2, 3, 2, 2, 3, 4, 2, 3, 4, 3, 6, 5, 5, 5, 6]
    }
    armorForLevel(level, mode) {
        switch (mode) {
            case 'boss':
                return this._armorData.bossAC[level - 1];
            case 'half':
                return this._armorData.halfLevelAC[level - 1];
            case 'equal':
                return this._armorData.onLevelAC[level - 1];
            case 'ignore':
                return -10000;
            default:
                throw new Error('invalid mode: ' + mode);
        }
    }
    saveForLevel(level, mode) {
        switch (mode) {
            case 'boss':
                return this._dexSave.boss[level - 1];
            case 'half':
                return this._dexSave.halfLevel[level - 1];
            case 'equal':
                return this._dexSave.onLevel[level - 1];
            case 'ignore':
                return -10000;
            default:
                throw new Error('invalid mode: '+mode);
        }
    }
}

class AccuracyProvider {
    constructor(source) {
        switch (source) {
            case 'dmg':
                this._armorSource = new DMG();
                break;
            default:
                throw new Error(`Source ${source} not supported`);
        }
        this._flat = new FlatRoll();
        this._advantage = new Advantage();
        this._disadvantage = new Disadvantage();
    }

    vsAC(level, mode, modifier, extraCritRange, rollType) {
        let fullMod = modifier + proficiency[level - 1];
        let ac = this._armorSource.armorForLevel(level, mode);
        let toHit = ac-fullMod;
        let toCrit = 20-extraCritRange;
        let hit;
        let crit;
        if (mode == 'ignore') {
            hit = this._flat.probability(-1000);
            crit = this._flat.probability(toCrit);
        } else if (rollType == 'flat') {
            hit = this._flat.probability(toHit);
            crit = this._flat.probability(toCrit);
        } else if (rollType == 'advantage') {
            hit = this._advantage.probability(toHit);
            crit = this._advantage.probability(toCrit);
        } else if (rollType == 'disadvantage'){
            hit = this._disadvantage.probability(toHit);
            crit = this._disadvantage.probability(toCrit);
        } else if (rollType = 'flat-unproficient') {
            hit = this._flat.probability(ac - modifier);
            crit = this._flat.probability(toCrit);
        }
        return {
            hit: Math.max(0, Math.min(hit, 1-crit-0.05)),
            crit
        }
    }

    vsDex(level, mode, modifier, rollType) {
        let dc = 8 + modifier + proficiency[level - 1];
        let saveBonus = this._armorSource.saveForLevel(level, mode);
        let success = 0;
        if (mode == 'ignore') {}
        else if (mode == 'flat') {
            success = this._flat.probability(dc-saveBonus);
        } else if (rollType == 'advantage') {
            success = this._advantage.probability(dc-saveBonus);
        } else if (rollType == 'disadvantage') {
            success = this._disadvantage.probability(dc - saveBonus);
        }
        success = Math.max(0, success);
        return {fail: 1-success}
    }
}

class FlatRoll {
    probability(x) {
        return 0.05*(21-x);
    }
}

class Advantage {
    probability(x) {
        return (21-x)*(x+19)/400;
    }
}

class Disadvantage {
    probability(x) {
        return Math.pow(21-x,2)/400;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccuracyProvider);

/***/ }),

/***/ "./src/utility/dice.js":
/*!*****************************!*\
  !*** ./src/utility/dice.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Dice {
	static d4 = 2.5;
	static d6 = 3.5;
	static d8 = 4.5;
	static d10 = 5.5;
	static d12 = 6.5;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dice);

/***/ }),

/***/ "./src/utility/util.js":
/*!*****************************!*\
  !*** ./src/utility/util.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Util {
    static average(data) {
        return data.reduce((p,c)=>p+c,0)/data.length;
    }
    
    static round(value, decimals = 2) {
        let scaleFactor = Math.pow(10, decimals);
        return Math.round(value*scaleFactor)/scaleFactor;
    }
    static getRandomColor() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

		static getDamageWithCrits(attacks, damagePerHit, damagePerCrit, hitChance, critChance) {
			return attacks*(damagePerCrit*critChance + damagePerHit*hitChance);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Util);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_accuracy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility/accuracy */ "./src/utility/accuracy.js");
/* harmony import */ var _utility_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility/util */ "./src/utility/util.js");
/* harmony import */ var _classes_presets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/presets */ "./src/classes/presets.js");
/* harmony import */ var _classes_rogue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/rogue */ "./src/classes/rogue.js");
/* harmony import */ var _classes_fighter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classes/fighter */ "./src/classes/fighter.js");
/* harmony import */ var _classes_warlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./classes/warlock */ "./src/classes/warlock.js");
/* harmony import */ var _classes_cleric__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./classes/cleric */ "./src/classes/cleric.js");
/* harmony import */ var _classes_monk__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./classes/monk */ "./src/classes/monk.js");
/* harmony import */ var _classes_druid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./classes/druid */ "./src/classes/druid.js");
/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./css/main.css */ "./src/css/main.css");











function createChart(ctx, datasets) {
	return new Chart(ctx, {
			type: 'line',
			data: {
					labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
					datasets: datasets
			},
			options: {
					scales: {
							y: {
									beginAtZero: true,
									min: 0,
									grace: 1
							}
					},
					spanGaps: false
			}
	});
}

function calculate() {
	const presets = [...selector.options].filter(x => x.selected).map(x => x.value);
	const [accuracyMode, armorSource] = (document.getElementById('accuracy-mode')?.value ?? 'ignore-dmg').split('-');
	const accuracyProvider = new _utility_accuracy__WEBPACK_IMPORTED_MODULE_0__["default"](armorSource);
	const calculator = new _classes_presets__WEBPACK_IMPORTED_MODULE_2__["default"](accuracyProvider, allPresets);
	let datasets = [];
	let tableData = [];
	let selectedTableMode = tableMode.value;
	let customData = customEntry.value ? JSON.parse(customEntry.value) : new Array(20).fill(0);
	for (let preset of presets) {
			let redData = [];
			let rawData = [];
			let accuracyData = [];
			let name = getPresetName(preset);
			for (let level=1; level <= 20; level++) {
					if (preset == 'custom') {
							let {red, raw, accuracy} = calculator.calculate('red_baseline', level, accuracyMode);
							let custom = customData[level - 1];
							let customRed = custom ? custom/raw : null;
							redData.push(customRed);
							rawData.push(custom);
							accuracyData.push(accuracy);
					} else {
							let {red, raw, accuracy} = calculator.calculate(preset, level, accuracyMode);
							redData.push(red);
							rawData.push(raw);
							accuracyData.push(accuracy*100);
					}
			}
			let average;
			let data;
			switch (selectedTableMode) {
					case 'red':
							average = _utility_util__WEBPACK_IMPORTED_MODULE_1__["default"].average(redData);
							tableData.push([name, ...redData, average]);
							data = redData;
							break;
					case 'dpr':
							average = _utility_util__WEBPACK_IMPORTED_MODULE_1__["default"].average(rawData);
							tableData.push([name, ...rawData, average]);
							data = rawData;
							break;
					case 'accuracy':
							average = _utility_util__WEBPACK_IMPORTED_MODULE_1__["default"].average(accuracyData);
							tableData.push([name, ...accuracyData, average]);
							data = accuracyData;
							break;
					default:
							break;
			}
			datasets.push(
					{
							label: name,
							data: structuredClone(data),
							borderColor: _utility_util__WEBPACK_IMPORTED_MODULE_1__["default"].getRandomColor()
					}
			);
	}
	fillTable(table, tableData);
	chart = createChart(ctx, datasets);
}

function getPresetName(preset) {
	return allPresets.get(preset)?.name ?? 'Not Supported';
}

function getPresets() {
	let _rogue = new _classes_rogue__WEBPACK_IMPORTED_MODULE_3__["default"]();
	let _fighter = new _classes_fighter__WEBPACK_IMPORTED_MODULE_4__["default"]();
	let _warlock = new _classes_warlock__WEBPACK_IMPORTED_MODULE_5__["default"]();
	let _cleric = new _classes_cleric__WEBPACK_IMPORTED_MODULE_6__["default"]();
	let _monk = new _classes_monk__WEBPACK_IMPORTED_MODULE_7__["default"]();
	let _druid = new _classes_druid__WEBPACK_IMPORTED_MODULE_8__["default"]();
	return new Map([
			['red_baseline', {name: 'Baseline Rogue', obj: _rogue, type:'red', resources: null}],
			['rogue_twf', {name: 'TWF rogue', obj: _rogue, type:'twf', resources: null}],
			['custom', {name: 'Custom Data', obj: null, type: null, resources: null, options: null}],
			['rogue_advantage', {name: 'RED with constant advantage', obj: _rogue, type:'red', resources: null, options:{advantage:1, disadvantage:0}}],
			['champion_snb_nr', {name: 'SnB Champion Fighter (No Action Surge)', obj: _fighter, type:'snb', resources: null}],
			['champion_snb_3', {name: 'SnB Champion Fighter (1 SR / 3 rounds)', obj: _fighter, type:'snb', resources: {rounds: 3, rests: 0}}],
			['champion_snb_6', {name: 'SnB Champion Fighter (1 SR / 6 rounds)', obj: _fighter, type:'snb', resources: {rounds: 6, rests: 0}}],
			['champion_snb_9', {name: 'SnB Champion Fighter (1 SR / 9 rounds)', obj: _fighter, type:'snb', resources: {rounds: 9, rests: 0}}],
			['champion_snb_4', {name: 'SnB Champion Fighter (1 SR / 4 rounds)', obj: _fighter, type:'snb', resources: {rounds: 4, rests: 0}}],
			['champion_gs_nr', {name: 'GS Champion Fighter (No Action Surge)', obj: _fighter, type:'gs', resources: null}],
			['champion_gs_3', {name: 'GS Champion Fighter (1 SR / 3 rounds)', obj: _fighter, type:'gs', resources: {rounds: 3, rests: 0}}],
			['champion_gs_6', {name: 'GS Champion Fighter (1 SR / 6 rounds)', obj: _fighter, type:'gs', resources: {rounds: 6, rests: 0}}],
			['champion_gs_9', {name: 'GS Champion Fighter (1 SR / 9 rounds)', obj: _fighter, type:'gs', resources: {rounds: 9, rests: 0}}],
			['champion_gs_4', {name: 'GS Champion Fighter (1 SR / 4 rounds)', obj: _fighter, type:'gs', resources: {rounds: 4, rests: 0}}],
			['champion_gs_pa_9', {name: 'GWF (GS) Champion Fighter (Always Power Attack, 1 SR / 9 rounds)', obj: _fighter, type:'gs_pa', resources: {rounds: 9, rests: 0}}],
			['champion_gwm_pam_9', {name: 'GWF (glaive) Champion Fighter (PAM at 1, Always Power Attack from 4, 1 SR / 9 rounds)', obj: _fighter, type:'gwm_pam', resources: {rounds: 9, rests: 0}}],
			['champion_pam_9', {name: 'GWF (glaive) Champion Fighter (PAM at 1, no GWM, 1 SR / 9 rounds)', obj: _fighter, type:'pam', resources: {rounds: 9, rests: 0}}],
			['warlock_ab_nr', {name: 'Warlock (EB/AB, no hex)', obj: _warlock, type:true, resources: null}],
			['warlock_no_ab_nr', {name: 'Warlock (EB, no AB, no hex)', obj: _warlock, type:false, resources: null}],
			['warlock_ab_hex', {name: 'Warlock (EB/AB, unlimited hex)', obj: _warlock, type: true, resources: {rounds: 1, duration: 100}}],
			['cleric_sf_nr', {name: 'Cleric (Sacred Flame only, Blessed Strikes)', obj: _cleric, type: 'bs', resources: null}],
			['cleric_sf_sw100', {name: 'Cleric (BS, Sacred Flame + Sacred Weapon, 100% uptime)', obj: _cleric, type: 'bs', resources: {uptime: 1.0}}],
			['cleric_sfps_nr', {name: 'Cleric (Sacred Flame only, Potent Spellcasting)', obj: _cleric, type: 'ps', resources: null}],
			['cleric_sfps_sw100', {name: 'Cleric (PS, Sacred Flame + Sacred Weapon, 100% uptime)', obj: _cleric, type: 'ps', resources: {uptime: 1.0}}],
			['monk_unarmed_nr', {name: 'Monk (Unarmed, no ki)', obj: _monk, type: 'unarmed', resources: null}],
			['monk_qs_nr', {name: 'Monk (quarterstaff, no ki)', obj: _monk, type: 'qs', resources: null}],
			['monk_qs_flurry30', {name: 'Monk (quarterstaff, flurry, 1 SR/3 rounds)', obj: _monk, type:"qs", resources: {rounds: 3, rests: 1}}],
			['monk_qs_flurry40', {name: 'Monk (quarterstaff, flurry, 1 SR/4 rounds)', obj: _monk, type:"qs", resources: {rounds: 4, rests: 1}}],
			['monk_qs_flurry60', {name: 'Monk (quarterstaff, flurry, 1 SR/6 rounds)', obj: _monk, type:'qs', resources: {rounds: 6, rests: 1}}],
			['monk_qs_flurry90', {name: 'Monk (quarterstaff, flurry, 1 SR/9 rounds)', obj: _monk, type:'qs', resources: {rounds: 9, rests: 1}}],
			['monk_mercy_flurry90', {name: 'Mercy Monk (quarterstaff, flurry, 1 SR/9 rounds, remaining ki on HoH)', obj: _monk, type:'mercy', resources: {rounds: 9, rests: 1}}],
			['monk_astral_flurry90', {name: 'Astral Monk (quarterstaff, flurry, 1 SR/9 rounds, 1 combat)', obj: _monk, type:'astral', resources: {rounds: 9, rests: 1}}],
			['druid_moon_bear100', {name: 'Moon druid (brown/polar bear only)', obj: _druid, type:'moon', resources: null, options: null}]
	]);
}

function fillTable(table, rowData) {
	let headers = ['Preset', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 'Average'];
	let head = document.createElement('thead');
	let body = document.createElement('tbody');

	for (let i=0; i < headers.length; i++) {
			let cell = document.createElement('th');
			cell.appendChild(document.createTextNode(headers[i]));
			head.appendChild(cell);
	}
	for (let row of rowData) {
			let rowElement = document.createElement('tr');
			for (let data of row) {
					let cell = document.createElement('td');
					let num = parseFloat(data);
					if (num) {
							cell.appendChild(document.createTextNode(_utility_util__WEBPACK_IMPORTED_MODULE_1__["default"].round(num)));
					} else {
							cell.appendChild(document.createTextNode(data));
					}
					
					rowElement.appendChild(cell);
			}
			body.appendChild(rowElement);
	}
	table.appendChild(head);
	table.appendChild(body);
}
function getPresetOptions(presets, parent) {
	presets.forEach(v => {
			let option = document.createElement('option');
			option.value = v[0];
			option.innerText = v[1];
			parent.appendChild(option);
	})
}
function doCleanup(chart, table) {
	chart?.destroy();
	table.innerHTML = '';
}

function onSelectorChanged(event) {
	doCleanup(chart, table);
	calculate();
}

let ctx; 
let table; 
let selector;
let tableMode; 
let customEntry; 
let allPresets;
let chart;
document.addEventListener('DOMContentLoaded', function(event) {
	ctx = document.getElementById('chart').getContext("2d");
	table = document.getElementById('output-table');
	selector = document.getElementById('preset-selector');
	tableMode = document.getElementById('table-mode');
	customEntry = document.getElementById('custom-damage');
	doCleanup(chart, table);
	allPresets = getPresets();
	let optionNames = Array.from(allPresets.entries()).map(x => [x[0], x[1].name]);
	getPresetOptions(optionNames, selector);
	selector.value = optionNames[0][0];
	calculate();

	selector.addEventListener('change', onSelectorChanged);
	tableMode.addEventListener('change', onSelectorChanged);
	document.getElementById('accuracy-mode').addEventListener('change', onSelectorChanged);
});


})();

/******/ })()
;
//# sourceMappingURL=main.js.map