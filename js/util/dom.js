jui.define("util.dom", [ "util.base" ], function(_) {
    return {
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
        each: function(selectorOrElements, callback) {
            if(!_.typeCheck("function", callback)) return;

            var elements = null;

            if(_.typeCheck("string", selectorOrElements)) {
                elements = document.querySelectorAll(selectorOrElements);
            } else if(_.typeCheck("array", selectorOrElements)) {
                elements = selectorOrElements;
            }

            if(elements != null) {
                Array.prototype.forEach.call(elements, function(el, i) {
                    callback.apply(el, [ i, el ]);
                });
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
        }
    }
});