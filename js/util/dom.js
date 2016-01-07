jui.define("util.dom", [ ], function() {

    var regForId = /^#([\w-]+)$/;
    var regForClass = /^\.([\w-]+)$/;
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

            if (typeof element[type] == 'function') {
                element[type]();
            } else {
                var e = document.createEvent('HTMLEvents');
                e.initEvent(type, false, true);
                element.dispatchEvent(e);
            }

        }
    } else {
        triggerEvent = function (element, type) {
            if (typeof element[type] == 'function') {
                element[type]();
            } else {
                // IE 8
                var e = document.createEventObject();
                e.eventType = type;
                element.fireEvent('on' + e.eventType, e);
            }
        }
    }

    // Util Function
    var each = function (arr, callback, context) {
        for(var i = 0, len = arr.length; i < len; i++) {
            callback.call(context, arr[i], i);
        }
    };

    var filter = function (arr, callback, context) {
        var list = [];
        for(var i = 0, len = arr.length; i < len; i++) {
            if (callback.call(context, arr[i], i)) {
                list.push(arr[i]);
            }
        }

        return list;
    };

    var merge = function (arr) {
        var total = [];
        each(arr, function (list) {
            each(list, function (item) {
                total.push(item);
            });
        });

        return total;
    };

    var bind = function (func, context) {
        return function () {
            func.apply(context, arguments);
        };
    }

    // Event List Manager
    var events = [];

    var restructEvents = function () {
        var list = [];
        each(events, function(eventObject) {
            if (!eventObject.removed) {
                list.push(eventObject);
            }
        });

        events = list;
    }


    /**
     * @class util.DomChain
     *
     * dom chaining class
     *
     * @private
     * @param {String|Array} selector
     * @param {Element|DomChain} context
     * @constructor
     */
    function DomChain(selector, context) {

        if (typeof selector == 'function') {
            feature.ready(selector);
            return;
        }

        var result, list = [];

        if (typeof selector == 'string') {

            if (selector.indexOf("<") > -1) {
                list = feature.create(selector, false);
            } else if (result = regForId.exec(selector)) {
                list = [dom.id(result[1], context)];
            } else if (result = regForClass.exec(selector)) {
                list = dom.className(result[1], context);
            } else if (result = regForTag.exec(selector)) {
                list = dom.tag(result[1], context);
            } else {
                list = dom.find(selector, context);
            }
        } else if (selector.length) {
            list = selector;
        } else if (selector.nodeType) {
            list = [selector];
        }

        for(var i = 0, len = list.length; i < len; i++) {
            this[i] = list[i];
        }
        this.length = list.length;
        this.context = context;
        this.selector = selector;
    }

    DomChain.prototype = {

        domchain : true,

        /**
         * @method html
         *
         *      // get html
         *      dom("#id").html();
         *
         *      // set html
         *      dom("#id").html("html text");
         *
         *
         * @param contents
         * @returns {*}
         */
        html : function (contents) {
            if (arguments.length) {
                this.each(function (el){
                   feature.html(el, contents);
                });
                return this;
            } else {
                return this.length > 0 && feature.html(this[0]);
            }
        },

        /**
         * @method text
         *
         *      // get text
         *      dom("#id").html();
         *
         *      // set text
         *      dom("#id").html("html text");
         *
         * @param {String} contents
         * @returns {*}
         */
        text : function (contents) {
            if (arguments.length) {
                this.each(function (el){  feature.text(el, contents); });
                return this;
            } else {
                return this.length > 0 && feature.text(this[0]);
            }
        },

        /**
         * @method unwrap
         *
         *      dom("#id").unwrap();
         *
         * @returns {DomChain}
         */
        unwrap : function () {
            this.each(function(el) {
                feature.unwrap(el);
            });

            return this;
        },

        /**
         * @method wrap
         *
         *      dom("#id").wrap(dom.create('div'));
         *
         *      dom("#id").wrap(dom("#id2"));
         *
         * @param wrapElement
         */
        wrap : function (wrapElement) {
            var self = this;
            new DomChain(wrapElement).each(function(wrapEl) {
                self.each(function(el) {
                    feature.wrap(el, wrapEl);
                });
            });
        },

        /**
         * @method empty
         *
         * empty string
         *
         * @returns {DomChain}
         */
        empty : function () {
            this.each(function(el) {
               feature.empty(el);
            });
            return this;
        },


        /**
         * @method remove
         *
         * remove an element from the DOM tree
         *
         * @returns {DomChain}
         */
        remove : function () {
            this.each(function(el) {
                feature.remove(el);
            });

            return this;
        },

        /**
         * @method hasClass
         *
         * check element has class name
         *
         * @param {String} className
         * @returns {Boolean}
         */
        hasClass : function (className) {
            if (this.length > 0) {
                feature.hasClass(this[0], className);
            }
            return false;
        },

        /**
         * @method addClass
         *
         * @param {String} className
         * @returns {DomChain}
         */
        addClass : function (className) {
            this.each(function(el){
                feature.addClass(el, className);
            });

            return  this;
        },

        /**
         * @method removeClass
         *
         *      dom(".my-class").removeClass("my-class");
         *
         * @param {String} className
         */
        removeClass: function (className) {
            this.each(function(el){
                feature.removeClass(el, className);
            });

            return  this;
        },

        /**
         * @method toggleClass
         *
         *      dom("#id").toggleClass("my-class");
         *
         * @param {String} className
         */
        toggleClass : function (className) {
            this.each(function(el){
                feature.toggleClass(el, className);
            });

            return this;
        },

        /**
         * @method after
         *
         *      dom("#id").after($("#id2"));
         *
         *      dom("#id").after(dom.createText("text"));
         *
         *      dom("#id").after(dom.create("div"));
         *
         * @param newElement
         */
        after : function(newElement) {

            if (typeof newElement == 'string') {
                var cloneElement = newElement;
            } else {
                var cloneElement = newElement.domchain ? newElement.fragment() : feature.clone(newElement);
            }

            this.each(function(el) {
                feature.after(el, cloneElement);
            });

            return this;
        },

        /**
         * @method before
         *
         *      dom("#id").before($("#id2"));
         *
         *      dom("#id").before(dom.createText("text"));
         *
         *      dom("#id").before(dom.create('div'));
         *
         * @param newElement
         * @returns {DomChain}
         */
        before : function (newElement) {

            if (typeof newElement == 'string') {
                var cloneElement = newElement;
            } else {
                var cloneElement = newElement.domchain ? newElement.fragment() : feature.clone(newElement);
            }

            this.each(function(el) {
                feature.before(el, cloneElement);
            });

            return this;
        },

        /**
         * @method fragment
         *
         * create document frament for DOM tree
         *
         * @returns {*|DocumentFragment}
         */
        fragment : function () {
            return feature.createFragment(this);
        },

        /**
         * @method append
         *
         *      dom("#id").append(dom("#id2"));
         *
         *      dom("#id").append(1, 2, 3);
         *
         *      dom("#id").append(dom.create('div'), dom.create('span'), dom.create('h1'));
         *
         * @param newElement
         * @returns {DomChain}
         */
        append : function (newElement) {

            if (typeof newElement == 'string') {
                var cloneElement = newElement;
            } else {
                var cloneElement = newElement.domchain ? newElement.fragment() : feature.clone(newElement);
            }

            this.each(function(el) {
                feature.append(el, cloneElement);
            });

            return this;
        },

        /**
         * @method appendTo
         *
         * append element to selector
         *
         * @param selector
         * @returns {*|DomChain}
         */
        appendTo : function (selector) {
            var dom = new DomChain(selector);
            return dom.append(this);
        },

        /**
         * @method prepend
         *
         * prepend newElement to DOM tree
         *
         * @param newElement
         * @returns {DomChain}
         */
        prepend: function (newElement) {

            if (typeof newElement == 'string') {
                var cloneElement = newElement;
            } else {
                var cloneElement = newElement.domchain ? newElement.fragment() : feature.clone(newElement);
            }

            this.each(function(el) {
                feature.prepend(el, cloneElement);
            });

            return this;
        },

        /**
         * @method prependTo
         *
         * prepend element to selector
         *
         * @param selector
         * @returns {*|DomChain}
         */
        prependTo : function (selector) {
            return new DomChain(selector).prepend(this);
        },

        /**
         * @method css
         *
         *      dom("#id").css("background-color");
         *
         *      dom("#id").css("background-color", 'yellow');
         *
         *      dom("#id").css({ "background-color" : "yellow" });
         *
         *
         * @param {String|Object} key
         * @param {Mixed} [value=undefined]
         * @returns {*}
         */
        css : function (key, value) {

            var styles = key;

            if (typeof key == 'string') {
                if (arguments.length == 1) {
                    return feature.css(this[0], key);
                } else if (arguments.length == 2) {
                    styles = {};
                    styles[key] = value;
                }
            }

            this.each(function(el) {
                feature.css(el, styles);
            });

            return this;
        },

        /**
         * @method position
         *
         * get position
         *
         *      $("#id").position();
         *
         * @returns {boolean|*|{top, left}|{top: (Number|number), left: (Number|number)}}
         */
        position: function() {
            return this.length > 0 && feature.position(this[0]);
        },

        /**
         * @method offset
         *
         *      $("#id").offset();
         *
         * @returns {boolean|*|{top, left}|{top: *, left: *}}
         */
        offset: function () {
            return this.length > 0 && feature.offset(this[0]);
        },

        /**
         * @method outerWidth
         *
         *      $("#id").outerWidth();
         *
         * @returns {boolean|*}
         */
        outerWidth: function() {
            return this.length> 0 && feature.outerWidth(this[0]);
        },

        /**
         * @method outerHeight
         *
         *      $("#id").outerHieght();
         *
         * @returns {boolean|*}
         */
        outerHeight: function() {
            return this.length> 0 && feature.outerHeight(this[0]);
        },

        /**
         * @method on
         *
         * add event listener at element
         *
         *      // add click event
         *      $("#id").on("click", function(e) {
         *
         *      });
         *
         *      // add click event with delegate
         *      $("#id").on("click", ".btn" or element, function (e) {
         *          console.log('.btn element', e.target, '#id element', this);
         *      });
         *
         * @param {String} type
         * @param {Function} handler
         */
        on : function (type, handler) {

            var args = arguments.length == 2 ? [null, type, handler] : [null, arguments[0], arguments[1], arguments[2]];

            this.each(function(el) {
                args[0] = el;
                feature.on.apply(feature, args);
            });


            return this;
        },

        /**
         * @method one
         *
         * add event that is only run once
         *
         * @param type
         * @param handler
         * @returns {DomChain}
         */
        one : function (type, handler) {

            var args = arguments.length == 2 ? [null, type, handler] : [null, arguments[0], arguments[1], arguments[2]];

            this.each(function(el) {
                args[0] = el;
                feature.one.apply(feature, args);
            });

            return this;
        },

        /**
         * @method off
         *
         * remove event
         *
         *      // delete all event
         *      $("#id").off();
         *
         *      // delete click event
         *      $("#id").off('click');
         *
         *      // delete click event for handler
         *      $("#id").off('click', handler);
         *
         *      // delete click event for selector
         *      $("#id").off('click', 'selector' or element);
         *
         *      // delete click event for selector with handler
         *      $("#id").off('click', 'selector' or element, handler);
         *
         *
         * @param type
         * @param handler
         */
        off : function (type, handler) {

            var args = [];
            var count = arguments.length;

            if (count == 0) {
                args = [null];
            } else if (count == 1) {
                args = [null, type];
            } else if (count == 2) {
                args = [null, type, handler];
            } else if (count == 3) {
                args = [null, arguments[3], arguments[1], arguments[2]];
            }

            this.each(function(el) {
                args[0] = el;
                feature.off.apply(feature, args);
            });

            return this;
        },

        /**
         * @method trigger
         *
         * @param type
         * @param args
         */
        trigger : function (type, args) {
            this.each(function(el) {
              feature.trigger(el, type, args);
            });

            return this;
        },

        /**
         * @method show
         *
         * show element in DOM tree
         *
         * @param value
         * @returns {DomChain}
         */
        show: function (value) {
          this.each(function(el) {
             feature.show(el, value);
          });

          return this;
        },

        /**
         * @method hide
         *
         *      $("#id").hide();
         *
         * @returns {DomChain}
         */
        hide : function () {
            this.each(function(el) {
                feature.hide(el);
            });

            return this;
        },

        /**
         * @method toggle
         *
         *      $("#id").toggle();
         *
         * @returns {DomChain}
         */
        toggle : function() {
            this.each(function(el) {
                feature.toggle(el);
            });

            return this;
        },

        /**
         * @method val
         *
         * get value attribute of element
         *
         *      $("#id").val();
         *
         * set value attribute
         *
         *      $("#id").val('test');
         *
         * @param {Mixed} [value=undefined]
         * @returns {*}
         */
        val : function (value) {
            if (this.length == 0) return;

            var node = this[0];

            // get value
            if (arguments.length == 0) {

                var value;

                if (node.nodeName == "SELECT") {
                    value = node.options[node.selectedIndex].value;
                } else {
                    value = node.value;
                }

                return value;
            }
            // set value
            else if (arguments.length == 1) {
                var values = Array.isArray(value) ? value : [value ];

                if (node.nodeName == "SELECT") {
                    var selected = false;
                    each(node.options, function(opt, i) {
                        if (values.indexOf(opt.value) > -1) {
                            opt.selected = true;
                            selected = true;
                        }
                    });

                    if (!selected) {
                        node.selectedIndex = -1;
                    }
                } else if (node.type == "checkbox" || node.type == "radio") {
                    node.checked = (node.value === value);
                } else {
                    node.value = value;
                }

            }

            return this;
        },

        /**
         * @method next
         *
         *      dom("#id").next();
         *
         * @param {Function] [filter=undefined]
         * @returns {util.DomChain}
         */
        next: function (filter) {
            return this.map(function(el) {
                return feature.next(el, filter);
            });
        },

        /**
         * @method prev
         *
         *      dom("#id").prev();
         *
         * @param {Function] [filter=undefined]
         * @returns {util.DomChain}
         */
        prev: function (filter) {
            return this.map(function(el) {
                return feature.prev(el, filter);
            });
        },

        closest: function (selector) {
            return new DomChain(this.length > 0 && feature.closest(this[0], selector));
        },

        /**
         * @method children
         *
         * get all children in DOM tree
         *
         *      $(".parent").children();
         *
         * @returns {util.DomChain}
         */
        children : function () {
            return new DomChain(merge(this.map(function (el, i) {
                return feature.children(el);
            })));
        },

        /**
         * @method each
         *
         * traverse element in dom tree
         *
         *      $(".class").each(function(el) {
         *          console.log($(el).html());
         *      });
         *
         * @param {Function} callback
         * @returns {DomChain}
         */
        each : function (callback) {
            each(this, callback, this);
            return this;
        },

        /**
         * @method map
         *
         * get wrapped list from dom tree
         *
         * @param {Function} callback
         * @returns {util.DomChain}
         */
        map : function (callback) {
            var list = [];
            this.each(function(el, i) {
                list[list.length] = callback.call(this, el, i);
            });

            return new DomChain(list);
        },


        /**
         * @method filter
         *
         *      $(".class").filter(function(el) {
         *          return el.nodeName == 'BUTTON';
         *      });
         *
         * @param callback
         * @returns {util.DomChain}
         */
        filter : function (callback) {
            var list = [];
            this.each(function(el, i) {

                var result = callback.call(this, el, i);

                if (result) {
                    list[list.length] = el;
                }
            });

            return new DomChain(list);
        },

        /**
         * @method attr
         *
         * @param attrs
         * @returns {*}
         */
        attr : function (attrs) {
            if (typeof attrs == 'string') {
                return this.length > 0 && feature.get(this[0], attrs);
            } else {
                this.each(function (el, i) {
                    feature.set(el, attrs);
                });

                return this;
            }
        },

        /**
         * @method removeAttr
         *
         * remove attribute for element
         *
         * @param {String} key
         * @returns {DomChain}
         */
        removeAttr : function (key) {
            if (this.length > 0) {
                feature.removeAttr(this[0], key);
            }

            return this;
        },

        /**
         * @method data
         *
         * set or get data
         *
         * @param {String|Object} datas
         * @returns {*}
         */
        data: function (datas) {
            if (typeof datas == 'string') {
                return this.length > 0 && feature.data(this[0], datas);
            } else {
                this.each(function (el, i) {
                    feature.data(el, datas);
                });

                return this;
            }
        },

        /**
         * @method eq
         *
         * get element of index
         *
         * if index is minus, find element from last
         *
         * @param {Number} index
         * @returns {util.DomChain}
         */
        eq : function (index) {
            var i = (index < 0) ? this.length + index : index;
            return new DomChain(this[i]);
        },

        /**
         * @method first
         *
         * get first element in DOM tree
         *
         * @returns {*|util.DomChain}
         */
        first : function () {
            return this.eq(0);
        },

        /**
         * @method last
         *
         * get last element in DOM tree
         *
         * @returns {*|util.DomChain}
         */
        last : function () {
            return this.eq(-1);
        }
    };

    // alias
    var eventNameList = (
        "blur focus focusin focusout resize scroll " +
        "click dblclick mousedown mouseup mousemove mouseover " +
        "mouseout mouseenter mouseleave change select " +
        "submit keydown keypress keyup contextmenu"
    ).split(' ');

    each(eventNameList, function( event) {
        DomChain.prototype[event] = function(  ) {
            var count = arguments.length;

            if (count == 0) {
                this.trigger( event );
            } else if (count == 1) {
                this.on(event, arguments[0]);
            } else if (count == 2) {
                this.on(event, arguments[0], arguments[1]);
            }
        };
    });


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
        return new DomChain(selector, context || document);
    }



    var feature = {

        /**
         * @method ready
         *
         * Running code when the document is ready
         *
         * @param func
         */
        ready : function (func) {
            // in case the document is already rendered
            if (document.readyState!='loading') func();
            // modern browsers
            else if (document.addEventListener) {
                addEvent(document, 'DOMContentLoaded', func);
            }
            // IE <= 8
            else {
                addEvent(document, 'readystatechange', function() {
                    if (document.readyState == 'complete') func();
                });
            }
        },

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
        create : function (opt, isFragment) {
            opt = opt || {tag : 'div'};
            isFragment = typeof isFragment == 'undefined' ? true : isFragment;

            if (typeof opt == 'string') {
                var str  = opt.trim();

                // if str is start with '<' character, run html parser
                if (str.indexOf("<") == 0) {
                    // html parser
                    var fakeDom = document.createElement('div');
                    fakeDom.innerHTML = str;

                    var list = this.children(fakeDom);
                    this.remove(fakeDom);

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
         * @method createFragment
         *
         * create fragment object
         *
         * @param {Array|Eleemnt} list
         * @returns {DocumentFragment}
         */
        createFragment : function (list) {
            var target = list;

            if (!target.length) {
                target = [target];
            }

            var fragment = document.createDocumentFragment();
            for(var i = 0, len = target.length; i < len ;i++) {
                fragment.appendChild(target[i]);
            }

            return fragment;
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
            if (element.parentNode) {
                element.parentNode.removeChild(element);
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
            if (typeof newChildElement == 'string') {
                element.insertAdjacentHTML("afterend", newChildElement);
            } else {
                element.parentNode.insertBefore(newElement, this.next(element));
            }

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
            if (typeof newChildElement == 'string') {
                element.insertAdjacentHTML("beforebegin", newChildElement);
            } else {
                element.parentNode.insertBefore(newElement, element);
            }
        },

        /**
         * @method append
         *
         *
         * @param {Element} element
         * @param {Element} newChildElement
         */
        append : function (element, newChildElement) {
            if (typeof newChildElement == 'string') {
                element.insertAdjacentHTML("beforeend", newChildElement);
            } else {
                console.log(element, newChildElement);
                element.appendChild(newChildElement);
            }

        },

        /**
         * @method prepend
         *
         *
         * @param {Element} element
         * @param {Element} newChildElement
         */
        prepend : function (element, newChildElement) {
            if (typeof newChildElement == 'string') {
                element.insertAdjacentHTML("afterbegin", newChildElement);
            } else {
                this.before(element.firstChild, newChildElement);
            }
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
        on : function (element, type, handler, context) {
            var eo;

            console.log(arguments.length, arguments);

            if (arguments.length == 3) {

                eo = {
                    element : element,
                    type : type,
                    context : context,
                    originalHandler : handler
                };

                eo.handler = bind(function(e) {
                    this.originalHandler.apply(this.context || this.element, arguments);

                    // only run once
                    if (this.handler.one) {
                        feature.off(this.element, this.type, this.handler);
                    }
                }, eo);

                events.push(eo);

                addEvent(eo.element, eo.type, eo.handler);


            } else if (arguments.length == 4) {
                var selector = handler;
                handler = context;
                context = arguments[4];

                eo = {
                    element : element,
                    type : type,
                    context : context,
                    selector : selector,
                    originalHandler : handler
                };

                eo.handler = bind(function(e) {

                    var target = e.target || e.srcElement;

                    if (typeof this.selector == 'string') {
                        if (matches.call(target, this.selector)) {
                            this.originalHandler.apply(this.context || this.element, arguments);
                        }
                    } else if (this.selector.length) {
                        var list = filter(this.selector, function (el) {
                            return target === el;
                        });

                        if (list.length > 0) {
                            this.originalHandler.apply(this.context || this.element, arguments);
                        }
                    }

                    // only run once
                    if (this.handler.one) {
                        feature.off(this.element, this.type, this.selector, this.handler);
                    }

                }, eo);

                events.push(eo);

                addEvent(eo.element, eo.type, eo.handler);

            }

            return eo;

        },

        /**
         * @method one
         *
         * add event that is only run once
         *
         *      dom.one(element, 'click', function(e) {
         *
         *      });
         *
         *      dom.one(element, 'click', '.btn', function(e) {
         *
         *      });
         *
         * @param element
         * @param type
         * @param handler
         * @param context
         */
        one : function (element, type, handler, context) {
            this.on.apply(this, arguments).handler.one = true ;
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

            var len = arguments.length;
            var checkFilter = function () { return false };

            if (len == 1) {
                checkFilter = function (eo) {
                    return (eo.element == element);
                };

            } else if (len == 2) {
                checkFilter = function (eo) {
                    return (eo.element == element && eo.type == type);
                };

            } else if (len == 3) {

                if (typeof handler == 'function') {
                    checkFilter = function (eo) {
                        return (eo.element == element && eo.type == type && eo.handler == handler);
                    };
                } else {
                    checkFilter = function (eo) {
                        return (eo.element == element && eo.type == type && eo.selector == handler);
                    };
                }


            } else if (len == 4) {
                var selector = handler;
                handler = arguments[3];

                checkFilter = function (eo) {
                    return (eo.element == element && eo.type == type && eo.handler == handler && eo.selector == selector);
                };
            }

            each(events, function (eo) {
                if (checkFilter(eo)) {
                    eo.removed = true;
                    removeEvent(eo.element, eo.type, eo.handler);
                }
            });

            restructEvents();
        },

        /**
         * @method trigger
         *
         * trigger event
         *
         * @param element
         * @param type
         */
        trigger : function (element, type, data) {
            triggerEvent(element, type, data);
        },

        /**
         * @method show
         *
         * show element
         *
         * @param element
         * @param value
         */
        show : function (element, value) {
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
        hide : function (element) {
            element.style.display = 'none';

            return this;
        },

        toggle: function (element, value) {
            var display = this.css(element, 'display');

            if (display == 'none') {
                this.show(element, value);
            } else {
                this.hide(element);
            }

            return this;
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

        /*
        remove: function(selectorOrElements) {
            this.each(selectorOrElements, function() {
                this.parentNode.removeChild(this);
            });
        }, */

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


    each(Object.keys(feature), function(key) {
        dom[key] = feature[key];
    });

    return dom;
});