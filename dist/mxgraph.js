/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/mxgraph.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mxgraph/javascript/dist/build.js":
/*!*******************************************************!*\
  !*** ./node_modules/mxgraph/javascript/dist/build.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/***/ }),

/***/ "./src/mxgraph.js":
/*!************************!*\
  !*** ./src/mxgraph.js ***!
  \************************/
/*! exports provided: mx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mx\", function() { return mx; });\nvar mxgraph = __webpack_require__(/*! mxgraph */ \"./node_modules/mxgraph/javascript/dist/build.js\")({\n    mxImageBasePath: \"/public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/src/images\",\n    mxBasePath: \"/public/plugins/agenty-flowcharting-panel/libs/mxgraph/javascript/dist\",\n\n  }),\n  mxGraph = mxgraph.mxGraph,\n  mxShape = mxgraph.mxShape,\n  mxConnectionConstraint = mxgraph.mxConnectionConstraint,\n  mxPoint = mxgraph.mxPoint,\n  mxPolyline = mxgraph.mxPolyline,\n  mxEvent = mxgraph.mxEvent,\n  mxRubberband = mxgraph.mxRubberband,\n  mxCellState = mxgraph.mxCellState;\n\nvar mx = {\n  init() {\n    mxGraph.prototype.getAllConnectionConstraints = function(terminal, source) {\n      if (terminal != null && terminal.shape != null) {\n        if (terminal.shape.stencil != null) {\n          if (terminal.shape.stencil != null) {\n            return terminal.shape.stencil.constraints;\n          }\n        } else if (terminal.shape.constraints != null) {\n          return terminal.shape.constraints;\n        }\n      }\n\n      return null;\n    };\n  },\n  draw() {\n    var container = document.getElementById(\"this.containerDivId\");\n    mxShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true),\n      new mxConnectionConstraint(new mxPoint(0.5, 0), true),\n      new mxConnectionConstraint(new mxPoint(0.75, 0), true),\n      new mxConnectionConstraint(new mxPoint(0, 0.25), true),\n      new mxConnectionConstraint(new mxPoint(0, 0.5), true),\n      new mxConnectionConstraint(new mxPoint(0, 0.75), true),\n      new mxConnectionConstraint(new mxPoint(1, 0.25), true),\n      new mxConnectionConstraint(new mxPoint(1, 0.5), true),\n      new mxConnectionConstraint(new mxPoint(1, 0.75), true),\n      new mxConnectionConstraint(new mxPoint(0.25, 1), true),\n      new mxConnectionConstraint(new mxPoint(0.5, 1), true),\n      new mxConnectionConstraint(new mxPoint(0.75, 1), true)\n    ];\n    // Edges have no connection points\n    mxPolyline.prototype.constraints = null;\n    // Disables the built-in context menu\n    mxEvent.disableContextMenu(container);\n\n    // Creates the graph inside the given container\n    var graph = new mxGraph(container);\n    graph.setConnectable(true);\n\n    // Enables connect preview for the default edge style\n    graph.connectionHandler.createEdgeState = function(me) {\n      var edge = graph.createEdge(null, null, null, null, null);\n\n      return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));\n    };\n\n    // Specifies the default edge style\n    graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] = 'orthogonalEdgeStyle';\n\n    // Enables rubberband selection\n    new mxRubberband(graph);\n\n    // Gets the default parent for inserting new cells. This\n    // is normally the first child of the root (ie. layer 0).\n    var parent = graph.getDefaultParent();\n\n    // Adds cells to the model in a single step\n    graph.getModel().beginUpdate();\n    try {\n      var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);\n      var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);\n      var e1 = graph.insertEdge(parent, null, '', v1, v2);\n    } finally {\n      // Updates the display\n      graph.getModel().endUpdate();\n    }\n  }\n}\n\n\nmx.init();\nmx.draw();\n\n\n//# sourceURL=webpack:///./src/mxgraph.js?");

/***/ })

/******/ });