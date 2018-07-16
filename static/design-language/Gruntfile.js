module.exports = function(grunt) {
    var utils = require('../xeon-global/grunt.utilities.js')(grunt);
    var appName = grunt.option('appName') || 'edesign-language';
    grunt.initConfig({
        globalOptions: utils.requireFile('./grunt.config.options.js'),
        pkg: grunt.file.readJSON('package.json'),
        options: {
            appName: appName,
            isTrunkCode: true,
            warUrl:grunt.option('warurl'),
            maven: {
                artifactId: '<%= options.appName %>',
                groupId: 'com.etrade.xeon',
                packaging: 'war',
                versionRelease: '0.1-P1',
                versionSnapshot: '0.1',
                warFiles: [{
                    expand: true,
                    cwd: '../<%= globalOptions.paths.devSite %>',
                    src: [
                        '<%= globalOptions.paths.context %><%= options.appName %>/**'
                    ],
                    dest: ''
                }],
                warPath: '../<%= globalOptions.paths.wars %>'
            },
            paths: {
                devSite: '../<%= globalOptions.paths.devSite %><%= globalOptions.paths.context %><%= options.appName %>',
                distSite: '../<%= globalOptions.paths.distSite %><%= globalOptions.paths.context %><%= options.appName %>',
                webappSite: '../../<%= globalOptions.paths.webappSite %><%= globalOptions.paths.context %><%= options.appName %>'
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    sourcemap: 'none',
                    cwd: 'src/styles',
                    src: ['*.scss'],
                    dest: '<%= options.paths.distSite %>',
                    ext: '.css'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    sourcemap: 'none',
                    cwd: 'src/styles',
                    src: ['*.scss'],
                    dest: '<%= options.paths.devSite %>',
                    ext: '.css'
                }]
            },
            webapp: {
                files: [{
                    expand: true,
                    sourcemap: 'none',
                    cwd: 'src/styles',
                    src: ['*.scss'],
                    dest: '<%= options.paths.devSite %>',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= options.paths.distSite %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= options.paths.distSite %>',
                    ext: '.css'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= options.paths.devSite %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= options.paths.devSite %>',
                    ext: '.css'
                }]
            },
            webapp: {
                files: [{
                    expand: true,
                    cwd: '<%= options.paths.distSite %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= options.paths.distSite %>',
                    ext: '.css'
                }]
            }
        },
        browserSync: {
            bsFiles: {
                src : './dist/**/*.css'
            },
            options: {
                server: {
                    baseDir: "./"
                },
                ghostMode: false,
                watchTask: true,
            }
        },
        copy: {
            dev: {
                files: [
                    {
                        expand: true, 
                        flatten: true, 
                        dest: '<%= options.paths.devSite %>', 
                        src: ['./src/styles/**/*.css'] 
                    },
                    {
                        expand: true, 
                        flatten: true, 
                        dest: '<%= options.paths.devSite %>/fonts', 
                        src: [
                                './node_modules/material-design-icons/iconfont/*', 
                                '!./node_modules/material-design-icons/iconfont/*.md', 
                                './src/fonts/ETrade-Fort/*',
                                './src/fonts/et-iconography/*'
                            ] 
                    },
                    {
                        expand: true,
                        flatten: true,
                        dest: '<%= options.paths.devSite %>/images',
                        src: [
                            './src/images/footer/*'
                        ]
                    }
                ]
            },
            webapp: {
                files: [
                    {
                        expand: true, 
                        flatten: true, 
                        dest: '<%= options.paths.webappSite %>', 
                        src: ['./src/styles/**/*.css'] },
                    {
                        expand: true, 
                        flatten: true, 
                        dest: '<%= options.paths.webappSite %>/fonts', 
                        src: [
                                './node_modules/material-design-icons/iconfont/*', 
                                '!./node_modules/material-design-icons/iconfont/*.md', 
                                './src/fonts/ETrade-Fort/*',
                                './src/fonts/et-iconography/*'
                            ] 
                    },
                    {
                        expand: true,
                        flatten: true,
                        dest: '<%= options.paths.webappSite %>/images',
                        src: [
                            './src/images/footer/*'
                        ]
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true, 
                        flatten: true, 
                        dest: '<%= options.paths.distSite %>', 
                        src: ['./src/styles/**/*.css'] 
                    },
                    {
                        expand: true, 
                        flatten: true, 
                        dest: '<%= options.paths.distSite %>/fonts', 
                        src: [
                                './node_modules/material-design-icons/iconfont/*', 
                                '!./node_modules/material-design-icons/iconfont/*.md', 
                                './src/fonts/ETrade-Fort/*',
                                './src/fonts/et-iconography/*'
                            ] 
                    },
                    {
                        expand: true,
                        flatten: true,
                        dest: '<%= options.paths.distSite %>/images',
                        src: [
                            './src/images/footer/*'
                        ]
                    }
                ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 5% in US', 'ie 9']
            },
            dev:{
                files:{
                    '<%= options.paths.devSite %>/edesign-language.css':'<%= options.paths.devSite %>/edesign-language.css'
                }
            },
            webapp:{
                files:{
                    '<%= options.paths.webappSite %>/edesign-language.css':'<%= options.paths.webappSite %>/edesign-language.css'
                }
            },
            dist:{
                files:{
                    '<%= options.paths.distSite %>/edesign-language.css':'<%= options.paths.distSite %>/edesign-language.css'
                }
            }
        },
        usebanner: {
            options: {
                position: 'top',
                banner: '/** Design Language r<%= pkg.version %> **/',
                linebreak: true
            },
            dev: {
                files: {
                    src: ['<%= options.paths.devSite %>/edesign-language.css']
                }
            },
            webappSite: {
                files: {
                    src: ['<%= options.paths.webappSite %>/edesign-language.css']
                }
            },
            dist: {
                files: {
                    src: ['<%= options.paths.distSite %>/edesign-language.css']
                }
            },
        },
        jshint: {
            options: {
                jshintrc: '../xeon-global/.jshintrc',
                reporter: require('jshint-stylish')
            },
            dev: {
                options: {
                    force: true,
                },
                src: [
                    'Gruntfile.js'
                ]
            }
        },
        sasslint: {
            options: {
                configFile: './.sass-lint.yml',
            },
            target: ['src/styles/**/*.scss']
        },
        watch: {
            files: "./src/**/*",
            tasks: ["sass-complete"]
        },
        maven_deploy: {
            options: {
                artifactId: '<%= options.maven.artifactId %>',
                goal: 'install',
                groupId: '<%= options.maven.groupId %>',
                injectDestFolder: 'false',
                packaging: '<%= options.maven.packaging %>',
                snapshot: true,
                version: '<%= options.maven.versionSnapshot %>'
            },
            'nexus-internal-release': {
                options: {
                    file: '<%= options.maven.warPath %><%= options.maven.artifactId %>-' +
                        '<%= options.maven.versionRelease %>.<%= options.maven.packaging %>',
                    goal: 'deploy',
                    snapshot: false,
                    url: 'http://nexus.etrade.com/content/repositories/internal-releases/',
                    version: '<%= options.maven.versionRelease %>'
                },
                files: '<%= options.maven.warFiles %>'
            },
            'nexus-internal-snapshot': {
                options: {
                    file: '<%= options.maven.warPath %><%= options.maven.artifactId %>-' +
                        '<%= options.maven.versionSnapshot %>-SNAPSHOT.<%= options.maven.packaging %>',
                   goal: 'deploy',
                    url: 'http://nexus.etrade.com/content/repositories/internal-snapshots/',
                },
                files: '<%= options.maven.warFiles %>'
            },
            'm2-release': {
                options: {
                    snapshot: false,
                    file: '<%= options.maven.warPath %><%= options.maven.artifactId %>-' +
                        '<%= options.maven.versionRelease %>.m2.<%= options.maven.packaging %>',
                    version: '<%= options.maven.versionRelease %>',
                    goal: (function() { return (grunt.option('warurl'))? 'deploy' : 'install'; }()),
                    url: (function() { return (grunt.option('warurl'))? 'file://'+grunt.option('warurl') : ''; }())
                },
                files: '<%= options.maven.warFiles %>'
            },
            'm2-snapshot': {
                options: {
                    file: '<%= options.maven.warPath %><%= options.maven.artifactId %>-' +
                        '<%= options.maven.versionSnapshot %>-SNAPSHOT.m2.<%= options.maven.packaging %>',
                    goal: (function() { return (grunt.option('warurl'))? 'deploy' : 'install'; }()),
                    url: (function() { return (grunt.option('warurl'))? 'file://'+grunt.option('warurl') : ''; }())
                },
                files: '<%= options.maven.warFiles %>'
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-maven-deploy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-banner');
 
    grunt.registerTask('sass-complete', [
        'sass', 'autoprefixer', 'copy', 'cssmin', 'usebanner'
    ]);

    /////////////////////////////////////////////
    // Task aliases
    /////////////////////////////////////////////
    grunt.registerTask('war', 'Create WAR File', utils.createWarFile);
    // grunt.registerTask('minify', ['useref', 'concat', 'uglify']);
 
    grunt.registerTask('preprocess', [
        // These tasks are run by xeon-global before copy, jshint, and sass
        'sasslint'
    ]);
    grunt.registerTask('postprocess', [
        // These tasks are run by xeon-global after copy, jshint, and sass
        'sass-complete'
    ]);
   
 
   
    grunt.registerTask('uatConfig', 'Udpates to UAT config', function(){
        grunt.config.set('options.isTrunkCode', false);
    });
   
    grunt.registerTask('ditConfig', 'Udpates to DIT config', function(){
        grunt.config.set('options.maven.versionSnapshot', 'DIT-0.1');
    });
 
    grunt.registerTask('preWar', ['sasslint', 'sass-complete']);
 
    grunt.registerTask('jenkins', [
        // These tasks are run by Jenkins CI server
        'preWar', 'war:deploy'
    ]);
   
    grunt.registerTask('dit', [
     // These tasks are run by SIT builds
      'ditConfig', 'preWar', 'war:install','war:deploy'
    ]);
    
    grunt.registerTask('sit', [
         // These tasks are run by SIT builds
        'preWar', 'war:install','war:deploy'
     ]);
    grunt.registerTask('test', [
        // These tasks are run by SIT builds
        'preWar', 'war:install'
    ]);
   
    grunt.registerTask('uat', [
          // These tasks are run by UAT builds
         'uatConfig','preWar', 'war:install', 'war:deploy'
    ]);
 
};
