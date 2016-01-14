module.exports = function(grunt) {
    grunt.initConfig({
        watch : {
            scripts : {
                files : [ "js/**" ],
                tasks : [ "js" ],
                options : {
                    spawn : false
                }
            }
        },
        qunit: {
            options: {
                timeout: 10000
            },
            all: [ "test/*.html", "test/*/*.html" ]
        },
        concat : {
            // jui all 
            dist : {
                src : [
                    // core
                    "js/base.js",

                    // util
                    "js/util/dom.js",
                    "js/util/sort.js",
                    "js/util/keyparser.js",
                    "js/util/base64.js",
                    "js/util/template.js",
                    "js/util/math.js",
                    "js/util/transform.js",
                    "js/util/time.js",
                    "js/util/color.js",

                    "js/util/scale/linear.js",
                    "js/util/scale/circle.js",
                    "js/util/scale/log.js",
                    "js/util/scale/ordinal.js",
                    "js/util/scale/time.js",

                    "js/util/svg/element.js",
                    "js/util/svg/element.transform.js",
                    "js/util/svg/element.path.js",
                    "js/util/svg/element.path.rect.js",
                    "js/util/svg/element.path.symbol.js",
                    "js/util/svg/element.poly.js",
                    "js/util/svg/base.js",
                    "js/util/svg/base3d.js",
                    "js/util/svg.js",

                    // related ui
                    "js/manager.js",
                    "js/collection.js",
                    "js/core.js",
                    "js/event.js"
                ],
                dest : "dist/core.js"
            }
        },
        uglify: {
            dist : {
                files : {
                    "dist/core.min.js" : [ "dist/core.js" ]
                }
            }
        },
        pkg: grunt.file.readJSON("package.json")
    });

    require("load-grunt-tasks")(grunt);

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask("js", [ "concat", "uglify" ]);
    grunt.registerTask("test", [ "qunit" ]);
    grunt.registerTask("default", [ "js", "test" ]);
};
