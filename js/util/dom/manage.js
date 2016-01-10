jui.define("util.dom.manage", [ ], function() {
    var Manage = {

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
                element.parentNode.insertBefore(newElement, element.nextElementSibling);
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
        }
    };

    return Manage;
});