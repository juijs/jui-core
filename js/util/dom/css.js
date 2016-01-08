jui.define("util.dom.css", [ ], function() {



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
        removeClass = function (element, className) {
            element.className = element.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
        };
    }

    /**
     * @class util.dom.CSS
     *
     */
    var CSS = {

        /**
         * @method css
         *
         * get the computed style properties of element
         *
         *      //1. get all style
         *      var allStyle = dom.css(element);
         *      allStyle.backgroundColor;
         *
         *      //2. get one property
         *      dom.css(element, 'background-color');
         *
         *      // 3. get all properties
         *      dom.css(element, ['background-color', 'attr']);
         *
         *      //3. set style properties
         *      dom.css(element, { 'background-color': 'yellow' });
         *
         * @param element
         * @param key
         * @returns {*}
         */
        css : function (element, styles, value) {
            var style = window.getComputedStyle ? getComputedStyle(element, null) : element.currentStyle;

            if (typeof styles === 'string') {
                if (arguments.length == 2) {
                    return style[styles];
                } else  if (arguments.length == 3){
                    return element.style[styles] = value ;
                }

            } else if (Array.isArray(styles)) {
                var obj = {};
                each(styles, function(key) {
                    obj[key] = style[key];
                });
                return obj;
            } else if (typeof styles === 'object') {
                for(var k in styles) {
                    element.style[k] = styles[k];
                }
            }

            return style;
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

        /**
         * @method toggle
         *
         * toggle show or hide for element
         *
         * @param element
         * @param value
         * @returns {feature}
         */
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
         *      $("#id").toggleClass("className");
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
         * @method width
         *
         * TODO: get or set width
         *
         * @param element
         * @param width
         */
        width : function (element, width) {
            var w = this.outerWidth(element);

            if (arguments.length == 1) {
                var style = this.css(element);

                w -= parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft);
                w -= parseFloat(style.borderRightWidth) + parseFloat(style.paddingRight);

                if (style.boxSizing == 'border-box') {
                    w -= parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                }

                return w;
            } else if (arguments.length == 2) {
                this.css(element, width);
            }

        },

        /**
         * @method height
         *
         * TODO: get or set height
         *
         * @param element
         * @param height
         */
        height : function (element, height) {

            var h = this.outerHeight(element);

            if (arguments.length == 1) {
                var style = this.css(element);

                h -= parseFloat(style.borderTopWidth) + parseFloat(style.paddingTop);
                h -= parseFloat(style.borderBottomWidth) + parseFloat(style.paddingBottom);

                if (style.boxSizing == 'border-box') {
                    h -= parseFloat(style.marginTop) + parseFloat(style.marginBottom);
                }

                return h;
            } else if (arguments.length == 2) {
                this.css(element, height);
            }

        },


        /**
         * @method outerWidth
         *
         * @param element
         * @returns {number}
         */
        outerWidth: function(element, withMargin) {
            var width = element.offsetWidth;

            if (withMargin) {
                var style = this.css(element);
                width += parseInt(style.marginLeft) + parserInt(style.marginRight);
            }

            return width;
        },

        /**
         * @method outerHeight
         *
         * @param element
         * @returns {number}
         */
        outerHeight : function (element, withMargin) {
            var height = element.offsetHeight;

            if (withMargin) {
                var style = this.css(element);
                height += parseInt(style.marginTop) + parserInt(style.marginBottom);
            }

            return height;
        }

    };

    return CSS;
});