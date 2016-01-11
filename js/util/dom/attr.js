jui.define("util.dom.attr", ["util.base"], function (_) {

	// Util Function
	var each = function (arr, callback, context) {
		for (var i = 0, len = arr.length; i < len; i++) {
			callback.call(context, i, arr[i]);
		}
	};

	/**
	 * @class util.dom.Attr
	 *
	 */
	var Attr = {


		/**
		 * @method getAttr
		 *
		 * get attributes
		 *
		 *      // 1. get attribute
		 *      $.getAttr(element, 'title');
		 *
		 * @param {Element} element
		 * @param {String} key
		 * @returns {string}
		 */
		getAttr: function (element, key) {

			if (element.nodeType == 3) return;

			return element.getAttribute(key);
		},

		/**
		 * @method getAllAttr
		 *
		 *  get selected all attributes
		 *
		 * @param {Element} element
		 * @param {Array} arr
		 * @returns {Object}
		 */
		getAllAttr: function (element, arr) {

			if (element.nodeType == 3) return;
			var obj = {};
			each(arr, function (i, key) {
				obj[key] = element.getAttribute(key);
			});
			return obj;
		},

		/**
		 * @method getAllData
		 *
		 * get all data values
		 *
		 * @param element
		 * @param arr
		 * @returns {{}}
		 */
		getAllData: function (element, arr) {
			if (element.nodeType == 3) return;
			var obj = {};
			arr = arr || Object.keys(element.attributes);
			each(arr, function (i, key) {
				var hasDataAttribute = typeof element.attributes['data-' + key] !== 'undefined';

				if (hasDataAttribute) {
					obj[key] = element.getAttribute('data-' + key);
				} else {
					obj[key] = element.dataset[key];
				}
			});
			return obj;
		},

		/**
		 * @method setAttr
		 *
		 * set attributes
		 *
		 *      dom.setAttr(element, { title : 'value' });
		 *
		 * @param {Element} element
		 * @param {String} values
		 */
		setAttr: function (element, key, value) {
			element.setAttribute(key, value);
		},

		/**
		 * @method setAllAttr
		 *
		 * set all attributes
		 *
		 * @param element
		 * @param values
		 */
		setAllAttr: function (element, values) {
			values = values || {};
			each(Object.keys(values), function (i, key) {
				var attrKey = key;
				var attrValue = values[attrKey];

				element.setAttribute(attrKey, attrValue);
			});
		},

		/**
		 * @method removeAttr
		 *
		 * remove attribute
		 *
		 *      dom.removeAttr(element, key);
		 *
		 *      dom.removeAttr(element, [key, key2, key3]);
		 *
		 * @param {Element} element
		 * @param {String} key
		 */
		removeAttr: function (element, key) {

			if (Array.isArray(key)) {
				each(key, function (i, it) {
					element.removeAttribute(it);
				});
			} else {
				element.removeAttribute(key);
			}

			return this;
		},

		/**
		 * @method getData
		 *
		 * get data properties
		 *
		 * @param element
		 * @param key
		 * @returns {*}
		 */
		getData: function (element, key) {
			element.juiData = element.juiData || {};

			if (typeof element.juiData[key] !== 'undefined') {
				return element.juiData[key];
			}

			var data = element.getAttribute('data-' + key);
			if (typeof data !== 'undefined') {
				return data;
			}

			return;
		},

		/**
		 * @method getAllData
		 *
		 * get all data properties
		 *
		 * @param element
		 * @returns {*}
		 */
		getAllData: function (element) {
			var data = _.deepClone(element.juiData);

			// get data-* properties
			each(Object.keys(element.attributes), function (i, key) {
				if (key.indexOf("data-") > -1) {
					var realKey = key.replace('data-', '');
					if (typeof data[realKey] === 'undefined') {
						data[key]
					}
				}
			});

			return data;
		},


		/**
		 * @method setData
		 *
		 * set data
		 *
		 * @param element
		 * @param key
		 * @param value
		 */
		setData: function (element, key, value) {
			element.juiData = element.juiData || {};
			element.juiData[key] = value;
		},

		/**
		 * @method setAllData
		 *
		 * @param element
		 * @param datas
		 */
		setAllData: function (element, datas) {
			element.juiData = element.juiData || {};

			for (var key in datas) {
				element.juiData[key] = datas[key];
			}
		},


		/**
		 * @method getValue
		 *
		 * get value attribute for element
		 *
		 * @param element
		 * @returns {*}
		 */
		getValue: function (element) {
			var v;

			if (element.nodeName == "SELECT") {
				v = element.options[element.selectedIndex].value;
			} else {
				v = element.value;
			}

			return v;
		},

		/**
		 * @method setValue
		 *
		 * set value attribute for element
		 *
		 * @param element
		 * @param value
		 */
		setValue: function (element, value) {
			var values = Array.isArray(value) ? value : [value];

			if (element.nodeName == "SELECT") {
				var selected = false;
				each(element.options, function (i, opt) {
					if (values.indexOf(opt.value) > -1) {
						opt.selected = true;
						selected = true;
					}
				});

				if (!selected) {
					element.selectedIndex = -1;
				}
			} else if (element.type == "checkbox" || element.type == "radio") {
				element.checked = (element.value === value);
			} else {
				element.value = value;
			}

		}
	};

	return Attr;
});