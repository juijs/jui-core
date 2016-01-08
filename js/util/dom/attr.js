jui.define("util.dom.attr", [ ], function() {

    // Util Function
    var each = function (arr, callback, context) {
        for(var i = 0, len = arr.length; i < len; i++) {
            callback.call(context, arr[i], i);
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
           var obj = {};
           each(arr, function(key) {
               obj[key] = element.getAttribute(key);
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

           values = values || {};
           each(Object.keys(values), function(key) {
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
               each(key, function (it) {
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
       data: function (element, one) {
           one = one || {};
           if (typeof one === 'string') {
               return element.dataset[one] || this.get(element, 'data-' + one);
           } else if (typeof one === 'object') {
               each(Object.keys(one), function(key) {
                   var value = one[key];
                   element.dataset[key] = value;
               });
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

           return  this;
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
   };

    return Attr;
});