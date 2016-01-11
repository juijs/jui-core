jui.define("util.dom.css", [], function () {

	// Util Function
	var each = function (arr, callback, context) {
		for (var i = 0, len = arr.length; i < len; i++) {
			callback.call(context, i, arr[i]);
		}
	};

	var hasClass, addClass, removeClass;

	if ('classList' in document.documentElement) {
		hasClass = function (element, className) {
			return element.classList.contains(className);
		};

		addClass = function (element, className) {
			element.classList.add(className);
		};

		removeClass = function (element, className) {
			element.classList.remove(className);
		};
	} else {
		hasClass = function (element, className) {
			return new RegExp('\\b' + className + '\\b').test(element.className);
		};
		addClass = function (element, className) {
			if (!hasClass(element, className)) {
				element.className += ' ' + className;
			}
		};
		removeClass = function (element, className) {
			element.className = element.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
		};
	}

	var getComputedStyle = function (element) {
		return window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;
	};

	/**
	 * @class util.dom.CSS
	 *
	 */
	var CSS = {


		getCss: function (element, key) {
			var style = getComputedStyle(element);

			return style[key];
		},

		getAllCss: function (element, styles) {
			var style = getComputedStyle(element);

			var obj = {};
			each(styles || [], function (i, key) {
				obj[key] = style[key];
			});
			return obj;
		},

		setCss: function (element, key, value) {
			element.style[key] = value;
		},

		setAllCss: function (element, styles) {
			for (var k in styles) {
				element.style[k] = styles[k];
			}
		},

		/**
		 * @method show
		 *
		 * show element
		 *
		 * @param element
		 * @param value
		 */
		show: function (element, value) {
			element.style.display = value || 'block';

			return this;
		},

		/**
		 * @method hide
		 *
		 * hide element
		 *
		 * @param element
		 */
		hide: function (element) {
			element.style.display = 'none';

			return this;
		},

		/**
		 * @method toggle
		 *
		 * toggle show or hide for element
		 *
		 * @param element
		 * @param value
		 */
		toggle: function (element, value) {
			var display = this.getCss(element, 'display');

			if (display == 'none') {
				this.show(element, value);
			} else {
				this.hide(element);
			}
		},

		/**
		 * @method hasClass
		 *
		 *
		 *
		 * @param {Element} element
		 * @param {String} className
		 * @returns {*}
		 */
		hasClass: function (element, className) {
			return hasClass(element, className);
		},

		/**
		 * @method addClass
		 *
		 * @param {Element} element
		 * @param {String} className
		 */
		addClass: function (element, className) {
			addClass(element, className);
		},

		/**
		 * @method removeClass
		 *
		 * @param {Element} element
		 * @param {String} className
		 */
		removeClass: function (element, className) {
			removeClass(element, className);
		},


		/**
		 * @method toggleClass
		 *
		 *      $("#id").toggleClass("className");
		 *
		 * @param element
		 * @param className
		 */
		toggleClass: function (element, className) {
			if (hasClass(element, className)) {
				removeClass(element, className);
			} else {
				addClass(element, className);
			}
		},

		/**
		 * @method width
		 *
		 * @param element
		 * @param width
		 */
		width: function (element, width) {
			var w = this.outerWidth(element);

			if (arguments.length == 1) {
				var style = getComputedStyle(element);

				w -= parseFloat(style.borderLeftWidth || 0) + parseFloat(style.paddingLeft || 0);
				w -= parseFloat(style.borderRightWidth || 0) + parseFloat(style.paddingRight || 0);

				if (style.boxSizing == 'border-box') {
					w -= parseFloat(style.marginLeft || 0) + parseFloat(style.marginRight || 0);
				}

				return w;
			} else if (arguments.length == 2) {
				this.getCss(element, width);
			}

		},

		/**
		 * @method height
		 *
		 *
		 * @param element
		 * @param height
		 */
		height: function (element, height) {

			var h = this.outerHeight(element);

			if (arguments.length == 1) {
				var style = getComputedStyle(element);

				h -= parseFloat(style.borderTopWidth || 0) + parseFloat(style.paddingTop || 0);
				h -= parseFloat(style.borderBottomWidth || 0) + parseFloat(style.paddingBottom || 0);

				if (style.boxSizing == 'border-box') {
					h -= parseFloat(style.marginTop || 0) + parseFloat(style.marginBottom || 0);
				}

				return h;
			} else if (arguments.length == 2) {
				this.getCss(element, height);
			}

		},


		/**
		 * @method outerWidth
		 *
		 * @param element
		 * @returns {number}
		 */
		outerWidth: function (element, withMargin) {
			var width = element.offsetWidth;

			if (withMargin) {
				var style = getComputedStyle(element);
				width += parseInt(style.marginLeft || 0) + parserInt(style.marginRight || 0);
			}


			return width;
		},

		/**
		 * @method outerHeight
		 *
		 * @param element
		 * @returns {number}
		 */
		outerHeight: function (element, withMargin) {
			var height = element.offsetHeight;

			if (withMargin) {
				var style = getComputedStyle(element);
				height += parseInt(style.marginTop) + parserInt(style.marginBottom);
			}

			return height;
		}

	};

	return CSS;
});