jui.define("util.dom.event", [ ], function() {

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

    // Util Function
    var each = function (arr, callback, context) {
        for(var i = 0, len = arr.length; i < len; i++) {
            callback.call(context, arr[i], i);
        }
    };

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
            element.addEventListener(type, handler);
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

    var bind = function (func, context) {
        return function () {
            func.apply(context, arguments);
        };
    }


    /**
     * @class util.dom.Event
     *
     */
    var Event = {

        /**
         * @method on
         *
         * add event listener at element
         *
         * @param {Element} element
         * @param {String} type event's name
         * @param {Function} handler
         * @param {Object} context
         */
        on : function (element, type, handler, context) {
            var eo;

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
                        Event.off(this.element, this.type, this.handler);
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
                        Event.off(this.element, this.type, this.selector, this.handler);
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
         * @param data
         */
        trigger : function (element, type, data) {
            triggerEvent(element, type, data);
        }
    };

    return Event;
});