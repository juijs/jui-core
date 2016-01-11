jui.define("util.dom.core", ["util.dom.selector", "util.dom.manage"], function ($selector, $manage) {

	/**
	 * @class util.dom.Core
	 *
	 */
	var Core = {
		/**
		 * @method create
		 *
		 * create element by option
		 *
		 *      // 1. set options
		 *      dom.create({
         *          tag : 'div',
         *          style : {
         *             marginLeft : '0px',
         *             'z-index' : 10
         *          },
         *          className : 'test main',
         *          html : 'wow html',
         *          text : 'this is text',
         *          children : [
         *              { tag : 'p', className : 'description', html : yellow },
         *              .....
         *          ]
         *     });
		 *
		 *     // 2. set string same to  dom.create({ tag : 'div', className : 'my-class your-class' })
		 *     dom.create('div');
		 *
		 *     // 3. set tag same to dom.create({ tag : 'div', className : 'name' })
		 *     dom.create("<div class='name'></div>");
		 *
		 * @param {Object} opt
		 * @returns {Element}
		 */
		create: function (opt, isFragment) {
			opt = opt || {tag: 'div'};
			isFragment = typeof isFragment == 'undefined' ? true : isFragment;

			if (typeof opt == 'string') {
				var str = opt.trim();

				// if str is start with '<' character, run html parser
				if (str.indexOf("<") == 0) {
					// html parser
					var fakeDom = document.createElement('div');
					fakeDom.innerHTML = str;

					var list = $selector.children(fakeDom);
					$manage.remove(fakeDom);

					if (isFragment) {
						return this.createFragment(list);
					} else {
						return list;
					}
				} else {
					// tag
					tag = str;
					className = "";
				}

				opt = {tag: tag, className: className};
			}

			var element = document.createElement(opt.tag || 'div');

			if (opt.className) {
				element.className = opt.className;
			}

			if (opt.attr) {
				var keys = Object.keys(opt.attr);
				for (var i = 0, len = keys.length; i < len; i++) {
					var key = keys[i];
					element.setAttribute(key, opt.attr[key]);
				}
			}

			if (opt.style) {
				var s = element.style;
				for (var k in opt.style) {
					s[k] = opt.style[k];
				}
			}

			if (opt.html) {
				element.innerHTML = html;
			} else if (opt.text) {
				element.textContent = html;
			}

			if (opt.children && opt.children.length) {
				var fragment = document.createDocumentFragment();

				for (var i = 0, len = opt.children.length; i < len; i++) {
					fragment.appendChild(this.create(opt.children[i]));
				}

				element.appendChild(fragment);
			}

			return element;
		},

		/**
		 * @method createText
		 *
		 * create text node
		 *
		 * @param {String} text
		 * @returns {TextNode}
		 */
		createText: function (text) {
			return document.createTextNode(text);
		},

		/**
		 * @method createFragment
		 *
		 * create fragment object
		 *
		 * @param {Array|Eleemnt} list
		 * @returns {DocumentFragment}
		 */
		createFragment: function (list) {
			var target = list;

			if (!target.length) {
				target = [target];
			}

			var fragment = document.createDocumentFragment();
			for (var i = 0, len = target.length; i < len; i++) {
				fragment.appendChild(target[i]);
			}

			return fragment;
		},


		/**
		 * @method position
		 *
		 * Get the offset position of an element relative to its parent
		 *
		 * @param {Element} element
		 * @returns {{top: (Number|number), left: (Number|number)}}
		 */
		position: function (element) {
			return {top: element.offsetTop, left: element.offsetLeft};
		},


		/**
		 * @method offset
		 *
		 * Get the position of an element relative to the document
		 *
		 * @param {Element} element
		 * @returns {{top: *, left: *}}
		 */
		offset: function (element) {

			var rect = element.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return {
				top: rect.top + scrollTop,
				left: rect.left + scrollLeft
			};

		},

		/**
		 * @method width
		 *
		 * get width of element, including only padding but without border
		 *
		 * @param element
		 * @returns {*}
		 */
		innerWidth: function (element) {
			if (element == window || element == document) {
				return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			}
			return element.clientWidth;
		},
		/**
		 * @method height
		 *
		 * get height of element, including only padding but without border
		 *
		 * @param element
		 * @returns {*}
		 */
		innerHeight: function (element) {
			if (element == window || element == document) {
				return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			}
			return element.clientHeight;
		}
	};

	return Core;
});