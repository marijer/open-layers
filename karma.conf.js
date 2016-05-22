// Karma configuration
// Generated on Sun May 15 2016 09:43:04 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/**/!(*.spec).js': ['babel', 'coverage'],
        'app/!(*.spec).js': ['babel', 'coverage']
    },

    files : [ 
        'node_modules/openlayers/dist/ol-debug.js',
        'node_modules/d3/d3.min.js',
        'app/**/*.js',
        'app/**/*.spec.js'
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['systemjs', 'jasmine'],

   // plugins: ['karma-systemjs', 'karma-babel-preprocessor', 'karma-jasmine'],

    // // karma.conf.js 
    systemjs: {
        // Path to your SystemJS configuration file 
        configFile: 'app/system.config.js',

        serveFiles: [
            'lib/**/*.js'
        ],
 
        // list of files / patterns to load in the browser
        files: [
        ],

        // SystemJS configuration specifically for tests, added after your config file. 
        // Good for adding test libraries and mock modules 
        config: {
             transpiler: 'babel',
            paths: {

            }
        },
        testFileSuffix: 'spec.js'
    },

    babelPreprocessor: {
            options: {
                sourceMap: 'inline'
            },
            sourceFileName: function(file) {
                return file.originalPath;
            }
        },
    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
