jui.define("util.dom", [ "util.dom.domchain" ], function(DomChain) {

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


    return dom;
});