jui.define("util.dom", [ "util.base" ], function(_) {

    var ElementPrototype = Element.prototype;

    var matches = ElementPrototype.matches ||
        ElementPrototype.matchesSelector ||
        ElementPrototype.webkitMatchesSelector ||
        ElementPrototype.msMatchesSelector ||
        function(selector) {
            var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
        };

    var closest = ElementPrototype.closest ||
        function(selector) {
            var el = this;
            while (!matches.call(el, selector)) el = el.parentNode;
            return el;
        };

    /**
     * @class util.dom
     *
     * pure dom utility
     *
     * @singleton
     */
    return {

        /**
         * @method create
         *
         * create element by option
         *
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
         * @param {Object} opt
         * @returns {Element}
         */
        create : function (opt) {
            opt = opt || {tag : 'div'};

            var element = document.createElement(opt.tag || 'div');

            if (opt.className) element.className = opt.className;

            if (opt.attr) {
                var keys = Object.keys(opt.attr);
                for(var i = 0, len = keys.length; i < len; i++) {
                    var key = keys[i];
                    element.setAttribute(key, opt.attr[key]);
                }
            }

            if (opt.style) {
                var s = element.style;
                for(var k in opt.style) {
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

                for(var i = 0, len = opt.children.length; i < len; i++) {
                    fragment.appendChild(this.create(opt.children[i]));
                }

                element.appendChild(fragment);
            }

            return element;
        },


        /**
         * @method html
         *
         * get or set  html string
         *
         * @param {Element} element
         * @param {String} contents
         *
         * @returns {*}
         */
        html : function (element, contents) {
            if (arguments.length == 1){
                return element.innerHTML;
            }

            element.innerHTML = contents;
        },

        /**
         * @method text
         *
         * get or set text string
         *
         * @param element
         * @param contents
         * @returns {*}
         */
        text : function (element, contents) {
            if (arguments.length == 1){
                return element.textContent;
            }

            element.textContent = contents;
        },

        /**
         * @method matches
         *
         * get matched element
         *
         * @param selector
         * @returns {*}
         */
        matches : function (element, selector) {
            return matches.call(element, selector);
        },

        siblings: function(element, filter) {
          var arr = [], first = element.parentNode.firstChild;

            do {
                if (!filter || filter(element)) {
                    arr.push(element);
                }
            } while(element = element.nextSibling);

            return arr;
        },

        nextSiblings: function(element, filter) {
            var arr = [];
            while(element = element.nextSibling) {
                if (!filter || filter(element)) {
                    arr.push(element);
                }
            }

            return arr;
        },

        prevSiblings: function(element, filter) {
            var arr = [];
            while(element = element.previousSibling) {
                if (!filter || filter(element)) {
                    arr.push(element);
                }
            }

            return arr;
        },

        closest: function (element, selector) {
            return closest.call(element, selector);
        },

        /**
         * @method id
         *
         * get element by id
         *
         * @return {Element}
         */
        id : function (id) {
            return document.getElementById(id);
        },

        /**
         * @method tag
         *
         * find elements by tag name
         *
         * @param {String} tagName
         * @param {Element} [parent=document] parent element,
         * @return {ElementList}
         */
        tag : function (tagName, parent) {
           return (parent || document).getElementsByTagName(tagName);
        },

        /**
         * @method className
         *
         * find elements by class name
         *
         * @param {String} className
         * @param {Element} [parent=document]  parent element
         * @returns {NodeList}
         */
        className : function (className, parent) {
            return (parent || document).getElementsByClassName(className);
        },

        /**
         * @method one
         *
         * find one element by querySelector
         *
         */
        one : function (selector, parent) {
          return  (parent || document).querySelector(selector);
        },

        /**
         * @method find
         *
         * find elements by selector
         *
         * @returns {*}
         */
        find: function() {
            var args = arguments;

            if(args.length == 1) {
                if(_.typeCheck("string", args[0])) {
                    return document.querySelectorAll(args[0]);
                }
            } else if(args.length == 2) {
                if(_.typeCheck("object", args[0]) && _.typeCheck("string", args[1])) {
                    return args[0].querySelectorAll(args[1]);
                }
            }

            return [];
        },

        /**
         * @method each
         *
         * loop for element list
         *
         * @param selectorOrElements
         * @param callback
         */
        each: function(selectorOrElements, callback) {
            if(!_.typeCheck("function", callback)) return;

            var elements = null;

            if(_.typeCheck("string", selectorOrElements)) {
                elements = document.querySelectorAll(selectorOrElements);
            } else if(_.typeCheck("array", selectorOrElements)) {
                elements = selectorOrElements;
            }

            if(elements != null) {

                for(var i = 0, len = elements.length; i < len; i++) {
                    var el = elements[i];
                    callback.apply(el, [i, el]);
                }
            }
        },

        /**
         * @method get
         *
         * get attributes
         *
         *      // 1. get attribute
         *      dom.get(element, 'title');
         *
         *      // 2. set attribute
         *      dom.set(element, { title : 'value' });
         *
         * @param {Element} element
         * @param {String} key
         * @returns {string}
         */
        get : function (element, key) {
            return element.getAttribute(key);
        },

        /**
         * @method set
         *
         * set attributes
         *
         *      dom.set(element, { title : 'value' });
         *
         * @param {Element} element
         * @param {String} values
         */
        set: function (element, values) {

            var elements = element.length ? element : [element];
            values = values || {};
            var keys = Object.keys(values);

            for(var index = 0, elementCount = elements.length; index < elementCount; index++) {
                var element = elements[i];

                for(var i = 0, len = keys.length; i < len; i++ ) {
                    var attrKey = keys[i];
                    var attrValue = values[attrKey];
                    element.setAttribute(attrKey, attrValue);
                }
            }
        },

        /**
         * @method data
         *
         * set dataset values
         *
         *      dom.data(element, 'title');     // get element.dataset.title or element.data-title attribute
         *
         *      dom.data(element, { title : 'value' });   // set data values
         *
         * @param element
         * @param one
         * @returns {*|string}
         */
        data: function (element, one) {
            one = one || {};
            if (typeof one === 'string') {
                return element.dataset[one] || this.get(element, 'data-' + one);
            } else if (typeof one === 'object') {
                var keys = Object.keys(one);
                for(var i = 0, len = keys.length; i < len; i++) {
                    var key = keys[i];
                    var value = one[key];
                    element.dataset[key] = value;
                }

            }
        },

        attr: function(selectorOrElements, keyOrAttributes) {
            if(!_.typeCheck([ "string", "array" ], selectorOrElements))
                return;

            var elements = document.querySelectorAll(selectorOrElements);

            if(_.typeCheck("object", keyOrAttributes)) { // set
                for(var i = 0; i < elements.length; i++) {
                    for(var key in keyOrAttributes) {
                        elements[i].setAttribute(key, keyOrAttributes[key]);
                    }
                }
            } else if(_.typeCheck("string", keyOrAttributes)) { // get
                if(elements.length > 0) {
                    return elements[0].getAttribute(keyOrAttributes);
                }
            }
        },

        remove: function(selectorOrElements) {
            this.each(selectorOrElements, function() {
                this.parentNode.removeChild(this);
            });
        },

        offset: function(elem) {
            function isWindow(obj) {
                /* jshint eqeqeq: false */
                return obj != null && obj == obj.window;
            }

            function getWindow(elem) {
                return isWindow(elem) ?
                    elem :
                    elem.nodeType === 9 ?
                    elem.defaultView || elem.parentWindow :
                        false;
            }

            var docElem, win,
                box = { top: 0, left: 0 },
                doc = elem && elem.ownerDocument;

            if ( !doc ) {
                return;
            }

            docElem = doc.documentElement;

            // Make sure it's not a disconnected DOM node
            /*/
             if ( !global.jquery.contains( docElem, elem ) ) {
             return box;
             }
             /**/

            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            var strundefined = typeof undefined;
            if ( typeof elem.getBoundingClientRect !== strundefined ) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow( doc );

            return {
                top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
                left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
            };
        }
    }
});