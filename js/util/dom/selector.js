jui.define("util.dom.selector", [ ], function() {


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
     * @class util.dom.Selector
     *
     */
    var Selector = {

        /**
         * @method id
         *
         * get element by id
         *
         * @return {Element}
         */
        id : function (id, parent) {
            return (parent || document).getElementById(id);
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
        findOne : function (context, selector) {
            return  (context || document).querySelector(selector);
        },

        /**
         * @method find
         *
         * find elements by selector
         *
         * @returns {NodeList}
         */
        find: function(context, selector) {
            return  (context || document).querySelectorAll(selector);
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

        /**
         * @method siblings
         *
         * @param element
         * @param filter
         * @returns {Array}
         */
        siblings: function(element, filter) {
            var arr = [];

            do {
                if (!filter || filter(element)) {
                    arr[arr.length] = element;
                }
            } while(element = element.nextSibling);

            return arr;
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
         * @method next
         *
         *
         * @param element
         * @param filter
         * @returns {*}
         */
        next : function (element, filter) {
            while(element = element.nextSibling) {
                if (!filter || filter(element)) {
                    return element;
                }
            }

            return null;
        },

        /**
         * @method nextAll
         *
         * @param element
         * @param filter
         * @returns {Array}
         */
        nextAll: function(element, filter) {
            var arr = [];
            while(element = element.nextSibling) {
                if (!filter || filter(element)) {
                    arr[arr.length] = element;
                }
            }

            return arr;
        },


        /**
         * @method prev
         *
         * @param element
         * @param filter
         * @returns {*}
         */
        prev: function(element, filter) {
            while(element = element.previousSibling) {
                if (!filter || filter(element)) {
                    return element;
                }
            }

            return null;
        },

        /**
         * @method prevAll
         *
         * @param element
         * @param filter
         * @returns {Array}
         */
        prevAll: function(element, filter) {
            var arr = [];
            while(element = element.previousSibling) {
                if (!filter || filter(element)) {
                    arr[arr.length] = element;
                }
            }

            return arr;
        },

        /**
         * @method closest
         *
         * @param element
         * @param selector
         * @returns {*}
         */
        closest: function (element, selector) {
            return closest.call(element, selector);
        }
    };

    return Selector;
});