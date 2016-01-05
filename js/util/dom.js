jui.define("util.dom", [ ], function() {

    var regForId = /^#([\w-]+)$/;
    var regForClass = /^.([\w-]+)$/;
    var regForTag = /^([\w-]+)$/;

    //
    // reference to https://plainjs.com


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
            return new RegExp('\\b'+ className+'\\b').test(element.className);
        };
        addClass = function (element, className) {
            if (!hasClass(element, className)) { element.className += ' ' + className; }
        };
        removeClass = function (el, className) {
            element.className = element.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
        };
    }

    var addEvent, removeEvent;

    if (window.attachEvent) {
        addEvent = function (element, type, handler) {
            element.attachEvent('on'+type, handler);
        };

        removeEvent = function (element, type, handler) {
            element.detachEvent('on'+type, handler);
        }
    } else {
        addEvent = function (element, type, handler) {
            element.addEventListener(type, handler);;
        };

        removeEvent = function (element, type, handler) {
            element.removeEventListener(type, handler)
        }
    }

    var triggerEvent;

    if ('createEvent' in document) {
        triggerEvent = function (element, type) { // modern browsers, IE9+
            var e = document.createEvent('HTMLEvents');
            element.initEvent(type, false, true);
            element.dispatchEvent(e);
        }
    } else {
        triggerEvent = function (element, type) {
            // IE 8
            var e = document.createEventObject();
            e.eventType = type;
            element.fireEvent('on'+e.eventType, e);
        }
    }


    /**
     * @class util.dom
     *
     * pure dom utility
     *
     *      dom("#id") is equals to dom.id('id');
     *
     *      dom(".class") is equals to dom.className("class");
     *
     *      dom("tag") is equals to dom.tag('tag');
     *
     *      dom(".class > tag > li:first-child") is equals to dom.find(".class > tag > li:first-child");
     *
     * @singleton
     */
    function dom(selector, context) {

        var result = regForId.exec(selector);

        if (result) {
            return dom.id(result[1], context);
        }

        result = regForClass.exec(selector);
        if (result) {
            return dom.className(result[1], context);
        }

        result = regForTag.exec(selector);
        if (result) {
            return dom.tag(result[1], context);
        }

        return dom.find(selector, context);
    }

    var feature = {

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
         *     dom.create('div.my-class.your-class');
         *
         * @param {Object} opt
         * @returns {Element}
         */
        create : function (opt) {
            opt = opt || {tag : 'div'};

            if (typeof opt == 'string') {
                var arr = opt.split(".");

                var tag = arr.shift();
                var className = arr.join(" ");

                opt = { tag : tag, className : className };
            }

            var element = document.createElement(opt.tag || 'div');

            if (opt.className) {
                element.className = opt.className;
            }

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
         * @method createText
         *
         * create text node
         *
         * @param {String} text
         * @returns {TextNode}
         */
        createText : function (text) {
            return document.createTextNode(text);
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
                return element.textContent || element.innerText;
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
                    arr[arr.length] = element;
                }
            } while(element = element.nextSibling);

            return arr;
        },

        next : function (element, filter) {
            while(element = element.nextSibling) {
                if (!filter || filter(element)) {
                    return element;
                }
            }

            return null;
        },

        nextAll: function(element, filter) {
            var arr = [];
            while(element = element.nextSibling) {
                if (!filter || filter(element)) {
                    arr[arr.length] = element;
                }
            }

            return arr;
        },


        prev: function(element, filter) {
            while(element = element.previousSibling) {
                if (!filter || filter(element)) {
                    return element;
                }
            }

            return null;
        },

        prevAll: function(element, filter) {
            var arr = [];
            while(element = element.previousSibling) {
                if (!filter || filter(element)) {
                    arr[arr.length] = element;
                }
            }

            return arr;
        },

        closest: function (element, selector) {
            return closest.call(element, selector);
        },

        /**
         * @method children
         *
         * get chlid nodes for fast performance
         *
         * @param {Element} element
         * @param {Function] [filter=undefined]
         * @returns {*}
         */
        children : function (element, filter) {
            return this.siblings(element.firstChild, filter);
        },

        /**
         * @method replace
         *
         * replace element to new element
         *
         * @param {Element} element
         * @param {Element} newElement
         */
        replace : function (element, newElement) {
          element.parentNode.replaceChild(newElement, element);
        },

        /**
         * @method unwrap
         *
         * unwrap a dom element
         *
         * @param {Element} element
         */
        unwrap : function (element) {
          var parent = element.parentNode;

          while(parent.firstChild) {
              parent.insertBefore(element.firstChild, el);
          }

          this.remove(element);
        },

        /**
         * @method clone
         *
         * create a deep copy of a DOM element
         *
         * @param {Element} element
         * @returns {Element}
         */
        clone : function (element, isCopyChildNodes) {
            isCopyChildNodes = typeof isCopyChildNodes == 'undefined' ? true : isCopyChildNodes;
            return element.cloneNode(isCopyChildNodes);
        },

        /**
         * @method wrap
         *
         *      dom.wrap(element, dom.create('div'));
         *
         * @param element
         * @param wrapElement
         */
        wrap : function (element, wrapElement) {
          this.before(element, wrapElement);
          this.append(wrapElement, element);
        },


        /**
         * @method empty
         *
         * remove all child nodes of an element from the DOM
         *
         * @param element
         */
        empty : function (element) {
          element.innerHTML = "";
        },

        /**
         * @method remove
         *
         * remove an element from the DOM tree
         *
         * @param {Element} element
         */
        remove : function (element) {
            element.parentNode.removeChild(element);
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
        hasClass : function (element, className) {
            return hasClass(element, className);
        },

        /**
         * @method addClass
         *
         * @param {Element} element
         * @param {String} className
         */
        addClass : function (element, className) {
            addClass(element, className);
        },

        /**
         * @method removeClass
         *
         * @param {Element} element
         * @param {String} className
         */
        removeClass : function (element, className) {
            removeClass(element, className);
        },


        /**
         * @method toggleClass
         *
         *
         *
         * @param element
         * @param className
         */
        toggleClass : function (element, className) {
            if (hasClass(element, className)) {
                removeClass(element, className);
            } else {
                addClass(element, className);
            }
        },

        /**
         * @method after
         *
         * insert new element after an existing one in the DOM tree
         *
         * @param {Element} element
         * @param {Element} newElement
         */
        after : function (element, newElement) {
            element.parentNode.insertBefore(newElement, this.next(element));
        },

        /**
         * @method before
         *
         * insert new element before an existing one in the DOM tree
         *
         * @param {Element} element
         * @param {Element} newElement
         */
        before : function (element, newElement) {
            element.parentNode.insertBefore(newElement, element);
        },

        /**
         * @method append
         *
         *
         * @param {Element} element
         * @param {Element} newChildElement
         */
        append : function (element, newChildElement) {
            element.appendChild(newChildElement);
        },

        /**
         * @method prepend
         *
         *
         * @param {Element} element
         * @param {Element} newChildElement
         */
        prepend : function (element, newChildElement) {
            this.before(element.firstChild, newChildElement);
        },

        /**
         * @method css
         *
         * get the computed style properties of element
         *
         *      //1. get all style
         *      var allStyle = dom.css(element);
         *      console.log(allStyle.backgroundColor);
         *
         *      //2. get one property
         *      console.log(dom.css(element, 'background-color');
         *
         *      //3. set style properties
         *      dom.css(element, { 'background-color': 'yellow' });
         *
         * @param element
         * @param key
         * @returns {*}
         */
        css : function (element, styles) {
            var style = window.getComputedStyle ? getComputedStyle(element, null) : element.currentStyle;

            if (typeof styles === 'string') {
                return style[styles];
            } else if (typeof styles === 'object') {
                for(var k in styles) {
                    element.style[k] = styles[k];
                }
            }

            return style;
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
            return { top : element.offsetTop, left : element.offsetLeft };
        },


        /**
         * @method offset
         *
         * Get the position of an element relative to the document
         *
         * @param {Element} element
         * @returns {{top: *, left: *}}
         */
        offset : function (element) {

            var rect = element.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };

        },

        outerWidth: function(element) {
            return element.offsetWidth;
        },
        outerHeight : function (element) {
            return element.offsetHeight;
        },

        /**
         * @method width
         *
         * get width of element, including only padding but without border
         *
         * @param element
         * @returns {*}
         */
        innerWidth : function (element) {
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
        },

        // box-sizing:border-box; 여부에 따라서 width 를 구하는 공식이 달라진다
        width : function (element, width) {

        },

        height : function (element, height) {

        },

        /**
         * @method on
         *
         * add event listener at element
         *
         * @param {Element} element
         * @param {String} type event's name
         * @param {Function} handler
         */
        on : function (element, type, handler) {
            if (arguments.length == 3) {
                addEvent(element, type, handler);
            } else if (arguments.length == 4) {
                var selector = handler;
                var handler = arguments[3];

                addEvent(element, type, function (e) {
                    if (matches.call(e.target || e.srcElement, selector)) {
                        handler(e);
                    }
                });

            }

        },

        /**
         * @method off
         *
         * remove event handler in  listener
         *
         * @param {Element} element
         * @param {String} type event's name
         * @param {Function} handler
         */
        off : function (element, type, handler) {
            removeEvent(element, type, handler);
        },

        /**
         * @method trigger
         *
         * trigger event
         *
         * @param element
         * @param type
         */
        trigger : function (element, type, args) {
            triggerEvent(element, type, args);
        },

        show : function (element, value) {
            element.style.display = value;
        },

        hide : function (element) {
            element.style.display = 'none';
        },

        toggle: function (element, value) {
            var display = this.css(element, 'display');

            if (display == 'none') {
                this.show(element, value);
            } else {
                this.hide(element);
            }
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
         * @method findOne
         *
         * find one element by selector
         *
         */
        findOne : function (selector, parent) {
          return  (parent || document).querySelector(selector);
        },

        /**
         * @method find
         *
         * find elements by selector
         *
         * @returns {NodeList}
         */
        find: function(selector, parent) {
            return  (parent || document).querySelectorAll(selector);
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
         * @method removeAttr
         *
         * remove attribute
         *
         * @param {Element} element
         * @param {String} key
         */
        removeAttr : function (element, key) {
          element.removeAttribute(key);
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
    };

    for(var k in feature) {
        dom[k] = feature[k];
    }

    return dom;
});