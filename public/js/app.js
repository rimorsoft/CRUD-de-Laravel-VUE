/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__) {

"use strict";
new Vue({
    name: 'Crud',
    el: '#crud',
    created: function created() {
        this.getKeeps(1);
    },

    data: {
        keeps: [],
        pagination: {},
        newKeep: '',
        fillKeep: { id: '', keep: '' },
        errors: '',
        offset: 3
    },
    computed: {
        isActived: function isActived() {
            return this.pagination.current_page;
        },
        pagesNumber: function pagesNumber() {
            if (!this.pagination.to) {
                return [];
            }

            var from = this.pagination.current_page - this.offset;
            if (from < 1) {
                from = 1;
            }

            var to = from + this.offset * 2;
            if (to >= this.pagination.last_page) {
                to = this.pagination.last_page;
            }

            var pagesArray = [];
            while (from <= to) {
                pagesArray.push(from);
                from++;
            }

            return pagesArray;
        }
    },
    methods: {
        getKeeps: function getKeeps(page) {
            var _this = this;

            axios.get('api/tasks?page=' + page).then(function (response) {
                _this.keeps = response.data.tasks.data, _this.pagination = response.data.pagination;
            }).catch(function (error) {
                console.log(error);
            });
        },
        editKeep: function editKeep(keep) {
            this.fillKeep.id = keep.id;
            this.fillKeep.keep = keep.keep;
            $('#edit').modal('show');
        },
        updateKeep: function updateKeep(id) {
            var _this2 = this;

            axios.put('api/tasks/' + id, this.fillKeep).then(function (response) {
                _this2.getKeeps();
                _this2.fillKeep = { 'id': '', 'keep': '' };
                _this2.errors = [];
                $('#edit').modal('hide');
                toastr.success(response.data.message);
            }).catch(function (error) {
                _this2.errors = 'Corrija para poder editar con éxito';
            });
        },
        deleteKeep: function deleteKeep(keep) {
            var _this3 = this;

            axios.delete('api/tasks/' + keep.id).then(function (response) {
                //eliminamos
                _this3.getKeeps(); //listamos
                toastr.success(response.data.message); //mensaje
            }).catch(function (error) {
                console.log(error);
            });
        },
        createKeep: function createKeep() {
            var _this4 = this;

            axios.post('api/tasks', { keep: this.newKeep }).then(function (response) {
                _this4.getKeeps();
                _this4.newKeep = '';
                _this4.errors = [];
                $('#create').modal('hide');
                toastr.success(response.data.message);
            }).catch(function (error) {
                _this4.errors = 'Corrija para poder crear con éxito';
            });
        },
        changePage: function changePage(page) {
            this.pagination.current_page = page;
            this.getKeeps(page);
        }
    }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);