jui.define("core", [ "util.base", "util.dom", "manager", "collection" ],
    function(_, $, UIManager, UICollection) {

	/** 
	 * @class core
     * Core classes for all of the components
     *
     * @alias UICore
	 */
	var UICore = function() {

        /**
         * @method emit
         * Generates a custom event. The first parameter is the type of a custom event. A function defined as an option or on method is called
         *
         * @param {String} type Event type
         * @param {Function} args Event Arguments
         * @return {Mixed}
         */
        this.emit = function(type, args) {
            if(!_.typeCheck("string", type)) return;
            var result;

            for(var i = 0; i < this.event.length; i++) {
                var e = this.event[i];

                if(e.type == type.toLowerCase()) {
                    var arrArgs = _.typeCheck("array", args) ? args : [ args ];
                    result = e.callback.apply(this, arrArgs);
                }
            }

            return result;
        }

        /**
         * @method on
         * A callback function defined as an on method is run when an emit method is called
         *
         * @param {String} type Event type
         * @param {Function} callback
         */
        this.on = function(type, callback) {
            if(!_.typeCheck("string", type) || !_.typeCheck("function", callback)) return;
            this.event.push({ type: type.toLowerCase(), callback: callback, unique: false  });
        }

        /**
         * @method off
         * Removes a custom event of an applicable type or callback handler
         *
         * @param {String} type Event type
         */
        this.off = function(type) {
            var event = [];

            for(var i = 0; i < this.event.length; i++) {
                var e = this.event[i];

                if ((_.typeCheck("function", type) && e.callback != type) ||
                    (_.typeCheck("string", type) && e.type != type.toLowerCase())) {
                    event.push(e);
                }
            }

            this.event = event;
        }

        /**
         * @method addValid
         * Check the parameter type of a UI method and generates an alarm when a wrong value is entered
         *
         * @param {String} name Method name
         * @param {Array} params Parameters
         */
        this.addValid = function(name, params) {
            if(!this.__proto__) return;
            var ui = this.__proto__[name];

            this.__proto__[name] = function() {
                var args = arguments;

                for(var i = 0; i < args.length; i++) {
                    if(!_.typeCheck(params[i], args[i])) {
                        throw new Error("JUI_CRITICAL_ERR: the " + i + "th parameter is not a " + params[i] + " (" + name + ")");
                    }
                }

                return ui.apply(this, args);
            }
        }

        /**
         * @method callBefore
         * Sets a callback function that is called before a UI method is run
         *
         * @param {String} name Method name
         * @param {Function} callback
         * @return {Mixed}
         */
        this.callBefore = function(name, callback) {
            if(!this.__proto__) return;
            var ui = this.__proto__[name];

            this.__proto__[name] = function() {
                var args = arguments;

                if(_.typeCheck("function", callback)) {
                    // before 콜백이 false가 아닐 경우에만 실행 한다.
                    if(callback.apply(this, args) !== false) {
                        return ui.apply(this, args);
                    }
                } else {
                    return ui.apply(this, args);
                }
            }
        }

        /**
         * @method callAfter
         * Sets a callback function that is called after a UI method is run
         *
         * @param {String} name Method name
         * @param {Function} callback
         * @return {Mixed}
         */
        this.callAfter = function(name, callback) {
            if(!this.__proto__) return;
            var ui = this.__proto__[name];

            this.__proto__[name] = function() {
                var args = arguments,
                    obj = ui.apply(this, args);

                // 실행 함수의 리턴 값이 false일 경우에는 after 콜백을 실행하지 않는다.
                if(_.typeCheck("function", callback) && obj !== false) {
                    callback.apply(this, args);
                }

                return obj;
            }
        }

        /**
         * @method callDelay
         * Sets a callback function and the delay time before/after a UI method is run
         *
         * @param {String} name Method name
         * @param {Function} callback
         */
        this.callDelay = function(name, callObj) { // void 형의 메소드에서만 사용할 수 있음
            if(!this.__proto__) return;

            var ui = this.__proto__[name],
                delay = (!isNaN(callObj.delay)) ? callObj.delay : 0;

            this.__proto__[name] = function() {
                var self = this,
                    args = arguments;

                if(_.typeCheck("function", callObj.before)) {
                    callObj.before.apply(self, args);
                }

                if(delay > 0) {
                    setTimeout(function() {
                        callFunc(self, args);
                    }, delay);
                } else {
                    callFunc(self, args);
                }
            }

            function callFunc(self, args) {
                var obj = ui.apply(self, args);

                if(_.typeCheck("function", callObj.after) && obj !== false) { // callAfter와 동일
                    callObj.after.apply(self, args);
                }
            }
        }

        /**
         * @method setTpl
         * Dynamically defines the template method of a UI
         *
         * @param {String} name Template name
         * @param {String} html Template markup
         */
        this.setTpl = function(name, html) {
            this.tpl[name] = _.template(html);
        }

        /**
         * @method setOption
         * Dynamically defines the options of a UI
         *
         * @param {String} key
         * @param {Mixed} value
         */
        this.setOption = function(key, value) {
            if(_.typeCheck("object", key)) {
                for(var k in key) {
                    this.options[k] = key[k];
                }
            } else {
                this.options[key] = value;
            }
        }

        /**
         * @method destroy
         * Removes all events set in a UI obejct and the DOM element
         *
         */
        this.destroy = function() {
            if(this.__proto__) {
                for (var key in this.__proto__) {
                    delete this.__proto__[key];
                }
            }
        }
	};

    UICore.build = function(UI) {

        return function(selector, options) {
            var list = [],
                elemList = [];

            if(_.typeCheck("string", selector)) {
                elemList = $.find(selector);
            } else if(_.typeCheck("object", selector)) {
                elemList.push(selector);
            } else {
                elemList.push(document.createElement("div"));
            }

            for(var i = 0, len = elemList.length; i < len; i++) {
                list[i] = jui.createUIObject(UI, selector, i, elemList[i], options);
            }

            // UIManager에 데이터 입력
            UIManager.add(new UICollection(UI.type, selector, options, list));

            // 객체가 없을 경우에는 null을 반환 (기존에는 빈 배열을 반환)
            if(list.length == 0) {
                return null;
            } else if(list.length == 1) {
                return list[0];
            }

            return list;
        }
    }

	UICore.init = function(UI) {
		var uiObj = null;
		
		if(typeof(UI) === "object") {
            uiObj = UICore.build(UI);
			UIManager.addClass({ type: UI.type, "class": uiObj });
		}
		
		return uiObj;
	}

    UICore.setup = function() {
        return {
            /**
             * @cfg {Object} [tpl={}]
             * Defines a template markup to be used in a UI
             */
            tpl: {},

            /**
             * @cfg {Object} [event={}]
             * Defines a DOM event to be used in a UI
             */
            event: {}
        }
    }

    /**
     * @class jui 
     * 
     * @extends core.UIManager
     * @singleton
     */
	window.jui = (typeof(jui) == "object") ? _.extend(jui, UIManager, true) : UIManager;
	
	return UICore;
});