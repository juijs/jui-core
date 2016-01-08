jui.define("util.dom.domchain", [ "util.dom.core", "util.dom.attr", "util.dom.css", "util.dom.event", "util.dom.manage", "util.dom.selector" ], function($core, $attr, $css, $event, $manage, $selector) {

    // Util Function
    var each = function (arr, callback, context) {
        for(var i = 0, len = arr.length; i < len; i++) {
            callback.call(context, i, arr[i]);
        }
    };

    var merge = function (arr) {
        var total = [];
        each(arr, function (i, list) {
            each(list, function (j, item) {
                total.push(item);
            });
        });

        return total;
    };

    var regForId = /^#([\w-]+)$/;
    var regForClass = /^\.([\w-]+)$/;
    var regForTag = /^([\w-]+)$/;

    /**
     * @class util.dom.DomChain
     *
     * dom chaining class
     *
     * @private
     * @param {String|Array} search
     * @param {Element|DomChain} context
     * @constructor
     */
    function DomChain(search, context) {

        var result, list = [];

        if (typeof search == 'string') {

            if (search.indexOf("<") > -1) {
                list = $core.create(search, false);
            } else if (result = regForId.exec(search)) {
                list = [$selector.id(result[1], context)];
            } else if (result = regForClass.exec(search)) {
                list = $selector.className(result[1], context);
            } else if (result = regForTag.exec(search)) {
                list = $selector.tag(result[1], context);
            } else {
                list = $selector.find(search, context);
            }
        } else if (search.length) {
            list = search;
        } else if (search.nodeType) {
            list = [search];
        }

        for(var i = 0, len = list.length; i < len; i++) {
            this[i] = list[i];
        }

        this.length = list.length;
        this.context = context;
        this.selector = search;
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
                if (contents.domchain) {
                    this.empty();
                    return this.append(contents);
                } else {
                    this.each(function (i, el){
                        $manage.html(el, contents);
                    });
                    return this;
                }

            } else {
                return this.length > 0 && $manage.html(this[0]);
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
                this.each(function (i, el){  $manage.text(el, contents); });
                return this;
            } else {
                return this.length > 0 && $manage.text(this[0]);
            }
        },

        /**
         * @method is
         *
         * matches selector
         *
         * @param {String|Element|DomChain} selector
         * @returns {Boolean}
         */
        is : function (selector) {
            if (typeof selector == 'string') {
                return $selector.matches(this[0], selector);
            } else {
                if (selector.domchain) {
                    return this[0] === selector[0];
                } else {
                    return this[0] === selector;
                }

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
            this.each(function(i, el) {
                $manage.unwrap(el);
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
            new DomChain(wrapElement).each(function(i, wrapEl) {
                self.each(function(i, el) {
                    $manage.wrap(el, wrapEl);
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
            this.each(function(i, el) {
                $manage.empty(el);
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
            this.each(function(i, el) {
                $manage.remove(el);
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
                $css.hasClass(this[0], className);
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
            this.each(function(i, el){
                $css.addClass(el, className);
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
            this.each(function(i, el){
                $css.removeClass(el, className);
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
            this.each(function(i, el){
                $css.toggleClass(el, className);
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
                var cloneElement = newElement.domchain ? newElement.fragment() : $manage.clone(newElement);
            }

            this.each(function(i, el) {
                $manage.after(el, cloneElement);
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
                var cloneElement = newElement.domchain ? newElement.fragment() : $manage.clone(newElement);
            }

            this.each(function(i, el) {
                $manage.before(el, cloneElement);
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
            return $core.createFragment(this);
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
                var cloneElement = newElement.domchain ? newElement.fragment() : $manage.clone(newElement);
            }

            this.each(function(i, el) {
                $manage.append(el, cloneElement);
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
                var cloneElement = newElement.domchain ? newElement.fragment() : $manage.clone(newElement);
            }

            this.each(function(i, el) {
                $manage.prepend(el, cloneElement);
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

        replace : function (newElement) {

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

            if (typeof key == 'string') {
                if (arguments.length == 1) {
                    return $css.css(this[0], key);
                } else if (arguments.length == 2) {
                    $css.css(this[0], key, value);
                }
            } else if (typeof key == 'object') {
                this.each(function(i, el) {
                    $css.css(el, key);
                });
            }

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
            return this.length > 0 && $core.position(this[0]);
        },

        /**
         * @method offset
         *
         *      $("#id").offset();
         *
         * @returns {boolean|*|{top, left}|{top: *, left: *}}
         */
        offset: function () {
            return this.length > 0 && $core.offset(this[0]);
        },

        /**
         * @method outerWidth
         *
         *      $("#id").outerWidth();
         *
         * @returns {boolean|*}
         */
        outerWidth: function(withMargin) {
            return this.length> 0 && $css.outerWidth(this[0], withMargin);
        },

        /**
         * @method outerHeight
         *
         *      $("#id").outerHieght();
         *
         * @returns {boolean|*}
         */
        outerHeight: function(withMargin) {
            return this.length> 0 && $css.outerHeight(this[0], withMargin);
        },

        innerWidth : function () {
            return this.length > 0 && $css.innerWidth(this[0]);
        },

        innerHeight : function () {
            return this.length > 0 && $css.innerHeight(this[0]);
        },

        /**
         * @method width
         *
         * get or set width
         *
         * @param element
         * @param width
         */
        width : function (width) {
            var count = arguments.length;
            if (count == 0) {
                return $css.width(this[0]);
            }

            $css.width(this[0], width);

            return this;
        },

        /**
         * @method height
         *
         * get or set height
         *
         * @param element
         * @param height
         */
        height : function (height) {
            var count = arguments.length;
            if (count == 0) {
                return $css.height(this[0]);
            }

            $css.height(this[0], height);

            return this;
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

            this.each(function(i, el) {
                args[0] = el;
                $event.on.apply($event, args);
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

            this.each(function(i, el) {
                args[0] = el;
                $event.one.apply($event, args);
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

            this.each(function(i, el) {
                args[0] = el;
                $event.off.apply($event, args);
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
            this.each(function(i, el) {
                $event.trigger(el, type, args);
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
            this.each(function(i, el) {
                $css.show(el, value);
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
            this.each(function(i, el) {
                $css.hide(el);
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
            this.each(function(i, el) {
                $css.toggle(el);
            });

            return this;
        },

        /**
         * @method next
         *
         *      dom("#id").next();
         *
         * @param {Function] [filter=undefined]
         * @returns {DomChain}
         */
        next: function (filter) {
            return this.map(function() {
                return $selector.next(this, filter);
            });
        },

        /**
         * @method prev
         *
         *      dom("#id").prev();
         *
         * @param {Function] [filter=undefined]
         * @returns {DomChain}
         */
        prev: function (filter) {
            return this.map(function() {
                return $selector.prev(this, filter);
            });
        },

        /**
         * @method closest
         *
         * @param selector
         * @returns {util.dom.DomChain}
         */
        closest: function (selector) {
            return new DomChain(this.length > 0 && $selector.closest(this[0], selector));
        },

        /**
         * @method parent
         *
         * get parent element for DomChain
         *
         *      $("id").parent().css({ ... });
         *
         * @returns {*}
         */
        parent : function () {
            if (this[0]) {
                return new DomChain(this[0].parentNode);
            }

            return null;
        },

        /**
         * @method children
         *
         * get all children in DOM tree
         *
         *      $(".parent").children();
         *
         * @returns {DomChain}
         */
        children : function (selector) {

            if (selector) {
                var filter = function (el) {
                    return $selector.matches(el, selector);
                };
            } else {
                var filter = function (el) {
                    return true;
                };
            }


            return this.map(function (i, el) {
                return $selector.children(el, filter);
            }, true);
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
            each(this, function (i, el) {
                callback.call(el, i, el);
            });
            return this;
        },

        /**
         * @method map
         *
         * get wrapped list from dom tree
         *
         * @param {Function} callback
         * @returns {DomChain}
         */
        map : function (callback, isMerge) {
            var list = [];
            this.each(function(i, el) {
                list[list.length] = callback.call(el, i, el);
            });

            if (isMerge) {
                list = merge(list);
            }

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
         * @returns {DomChain}
         */
        filter : function (callback) {
            var list = [];
            this.each(function(i, el) {

                var result = callback.call(el, i, el);

                if (result) {
                    list[list.length] = this;
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
        attr : function (key, value) {

            var count = arguments.length;

            if (count == 1) {       // get

                if (typeof key == 'string' || Array.isArray(key)) {
                    return $attr.attr(this[0], key);
                } else {
                    return this.each(function(i, el) {
                        $attr.attr(el, key);
                    });
                }

            } else if (count == 2) {

                if (typeof value == 'function') {
                    return this.each(function(index, el) {
                        var oldValue = $attr.get(el, key);
                        $attr.attr(el, key, value.call(el, index, oldValue));
                    });
                } else {
                    return this.each(function(i, el) {
                        $attr.attr(el, key, value);
                    });
                }

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
                $attr.removeAttr(this[0], key);
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
                return this.length > 0 && $attr.data(this[0], datas);
            } else {
                this.each(function (i, el) {
                    $attr.data(el, datas);
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
         * @returns {DomChain}
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
         * @returns {*|DomChain}
         */
        first : function () {
            return this.eq(0);
        },

        /**
         * @method last
         *
         * get last element in DOM tree
         *
         * @returns {*|DomChain}
         */
        last : function () {
            return this.eq(-1);
        },

        /**
         * @method find
         *
         * find by selector
         *
         * @param selector
         * @returns {util.dom.DomChain}
         */
        find : function (selector) {
            return this.map(function() {
                return $selector.find(this, selector);
            }, true);
        }


    };

    //////////////////////////////
    // event alias
    //
    //  $("#id").click() is  $("#id").trigger('click');
    //
    //  $("#id").click(function() { });  is $("#id").on('click', function() { });
    //
    ////////////////////////////
    var eventNameList = (
        "blur focus focusin focusout resize scroll " +
        "click dblclick mousedown mouseup mousemove mouseover " +
        "mouseout mouseenter mouseleave change select " +
        "submit keydown keypress keyup contextmenu"
    ).split(' ');

    each(eventNameList, function( index, event) {
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

    return DomChain;
});