if (typeof module == 'object' && module.exports) {
    try {
        module.exports = require("./base/base.js");

        require("./util/dom.js");
        require("./util/sort.js");
        require("./util/keyparser.js");
        require("./util/base64.js");
        require("./util/math.js");
        require("./util/template.js");
        require("./util/color.js");
        require("./base/manager.js");
        require("./base/collection.js");
        require("./base/core.js");
        require("./base/event.js");
    } catch(e) {
        console.warn("JUI_WARNING_MSG: Base module does not exist");
    }
}