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
                    "js/util/math.js",
                    "js/util/template.js",
                    "js/util/color.js",

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
        copy: {
            publish: {
                files: [
                    { expand: true, flatten: true, src: [ "dist/*" ], dest: "../jui-chart/lib", filter: "isFile" },
                    { expand: true, flatten: true, src: [ "dist/*" ], dest: "../jui/lib", filter: "isFile" },
                    { expand: true, flatten: true, src: [ "dist/*" ], dest: "../jui-grid/lib", filter: "isFile" }
                ]
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
