jui.define("util.dom.attr", [ ], function() {

    // Util Function
    var each = function (arr, callback, context) {
        for(var i = 0, len = arr.length; i < len; i++) {
            callback.call(context, i, arr[i]);
        }
    };

    /**
     * @class util.dom.Attr
     *
     */
   var Attr = {


       /**
        * @method get
        *
        * get attributes
        *
        *      // 1. get attribute
        *      dom.get(element, 'title');
        *
        * @param {Element} element
        * @param {String} key
        * @returns {string}
        */
       get : function (element, key) {

           if (element.nodeType == 3) return;

           return element.getAttribute(key);
       },

       /**
        * @method getAll
        *
        *  get selected all attributes
        *
        * @param {Element} element
        * @param {Array} arr
        * @returns {Object}
        */
       getAll : function (element, arr) {

           if (element.nodeType == 3) return;
           var obj = {};
           each(arr, function(i, key) {
               obj[key] = element.getAttribute(key);
           });
           return obj;
       },

        getAllData : function (element, arr) {
            if (element.nodeType == 3) return;
            var obj = {};
            arr = arr || Object.keys(element.attributes);
            each(arr, function(i, key) {
                var hasDataAttribute = typeof element.attributes['data-'+key] !== 'undefined';

                if (hasDataAttribute) {
                    obj[key] = element.getAttribute('data-' + key);
                } else {
                    obj[key] = element.dataset[key];
                }
            });
            return obj;
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

           if (element.nodeType == 3) return;

           values = values || {};
           each(Object.keys(values), function(i, key) {
               var attrKey = key;
               var attrValue = values[attrKey];

               element.setAttribute(attrKey, attrValue);
           });
       },

       /**
        * @method removeAttr
        *
        * remove attribute
        *
        *      dom.removeAttr(element, key);
        *
        *      dom.removeAttr(element, [key, key2, key3]);
        *
        * @param {Element} element
        * @param {String} key
        */
       removeAttr : function (element, key) {

           if (Array.isArray(key)) {
               each(key, function (i, it) {
                   element.removeAttribute(it);
               });
           } else {
               element.removeAttribute(key);
           }

           return this;
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
       data: function (element, key, value) {


           var count = arguments.length;
           var hasDataAttribute = typeof element.attributes['data-'+key] !== 'undefined';

           if (count == 1) {
               // return all data
               return this.getAllData(element);
           } else if (count == 2) {
               if (typeof key == 'string') {
                   if (!hasDataAttribute) {
                       return element.dataset[key];
                   } else {
                       return this.get(element, 'data-' + key);
                   }

               } else if (Array.isArray(key)) {
                   return this.getAllData(element, key);
               } else if (typeof key == 'object') {
                   each(Object.keys(key), function(i, k) {
                       var value = key[k];

                       if (typeof element.attributes['data-'+k] == 'undefined') {
                           element.dataset[k] = value;
                       } else {
                           element.setAttribute('data-'+k, value);
                       }

                   });
               }

           } else if (count == 3) {
               console.log(hasDataAttribute,key,value);
               if (!hasDataAttribute) {
                   element.dataset[key] = value;
                   console.log(element.dataset[key]);
               } else {
                   element.setAttribute('data-'+key, value);
               }
           }
       },

       /**
        * @method attr
        *
        * get or set attributes to element
        *
        *      // get attribute
        *      dom.attr(element, key);
        *
        *      // get all attribute
        *      dom.attr(element, [key, key2, key3] );
        *
        *      // set all attribute
        *      dom.attr(element, { key : value, key1 : value1 } );
        *
        *      // set attribute
        *      dom.attr(element, key, value );
        *
        * @param {Element} element
        * @param {String} key
        * @param {Mixed} value
        * @returns {*|DomChain}
        */
       attr: function(element, key, value) {

           var count = arguments.length;

           if (count == 2) {
               if (typeof key == 'string') {
                   return this.get(element, key);
               } else if (Array.isArray(key)) {
                   return this.getAll(element, key);
               } else if (typeof key == 'object') {
                   this.set(element, key);
               }

           } else if (count == 3) {
               var obj = {};
               obj[key] = value;
               this.set(element, obj);
           }

       },

       val : function (element, value) {
           var count = arguments.length;
           value = value || "";

           // get value
           if (count == 1) {

               var v;

               if (element.nodeName == "SELECT") {
                   v = element.options[element.selectedIndex].value;
               } else {
                   v = element.value;
               }

               return v;
           }
           // set value
           else if (count == 2) {
               var values = Array.isArray(value) ? value : [value ];

               if (element.nodeName == "SELECT") {
                   var selected = false;
                   each(element.options, function(i, opt) {
                       if (values.indexOf(opt.value) > -1) {
                           opt.selected = true;
                           selected = true;
                       }
                   });

                   if (!selected) {
                       element.selectedIndex = -1;
                   }
               } else if (element.type == "checkbox" || element.type == "radio") {
                   element.checked = (element.value === value);
               } else {
                   element.value = value;
               }

           }
       },
   };

    return Attr;
});