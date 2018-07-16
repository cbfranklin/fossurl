module.exports = function(grunt) {
    var config;
    var jumpshare;
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            isJumpshareRunning: {
                command: () => 'ps ax | grep -v grep | grep Jumpshare',
                options: {
                    callback: function(err, stdout, stderr, cb) {
                        grunt.config.set('jumpshare', stdout.replace('\n', ''));
                        cb();
                    }
                }
            },
            runJumpshareAppleScript: {
                command: () => 'osascript UploadToJumpshare.scpt "design-language-scss-<%= config.prompt.version %>.zip" "design-language-styles-<%= config.prompt.version %>.zip"',
                options: {
                    callback: function(err, stdout, stderr, cb) {
                        // grunt.log.writeln(stderr);
                        grunt.log.writeln(stdout);
                        cb();
                    }
                }
            }
        },
        gitinfo: {
            options: {
                cwd: '.'
            }
        },
        gittag: {
            release: {
                options: {
                    tag: "<%= config.prompt.version %>"
                }
            }
        },
        gitpush: {
            bitbucket: {
                options: {
                    remote: "<%= config.prompt.bitbucketRemote %>",
                    tags: "<%= config.prompt.version %>"
                }
            },
            github: {
                options: {
                    remote: "<%= config.prompt.githubRemote %>",
                    tags: "<%= config.prompt.version %>"
                }
            },
        },
        compress: {
            src: {
                options: {
                    archive: "design-language-scss-<%= config.prompt.version %>.zip"
                },
                files: [{
                    expand: true,
                    pretty: true,
                    cwd: './',
                    src: ['*.*', '.sass-lint.yml', '!.git', '!Gruntfile-release.js', 'playground/**/*', 'src/**/*'],
                    dest: '.'
                }]
            },
            dist: {
                options: {
                    archive: "design-language-styles-<%= config.prompt.version %>.zip"
                },
                files: [{
                    expand: true,
                    pretty: true,
                    cwd: './dist/',
                    src: ['**/*'],
                    dest: '.'
                }]
            }
        },
        open: {
            file: {
                path: '<%= process.cwd() %>'
            },
        },
        prompt: {
            version: {
                options: {
                    questions: [{
                            config: 'config.prompt.version',
                            type: 'input',
                            message: 'Enter release date',
                            default: function() {
                                var date = new Date();
                                var month = ('0' + (date.getMonth()+1)).slice(-2);
                                var day = ('0' + date.getDate()).slice(-2);
                                var year = date.getFullYear();
                                return year + "." + month + "." + day;
                            },
                            validate: function(value) {
                                var pattern = new RegExp(/^([2][0]\d{2}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01]))$/);
                                var valid = pattern.test(value);
                                return !!valid || 'Follow a valid release tag with a valid date.';
                            }
                        }
                        //,
                        // {
                        //     config: 'config.prompt.uploadToJumpshare',
                        //     type: 'confirm',
                        //     message: "Upload to Jumpshare?",
                        //     default: 'Y'
                        // },
                        // {
                        //     config: 'config.prompt.createGitTag',
                        //     type: 'confirm',
                        //     message: "Create Git tag?",
                        //     default: 'Y'
                        // },
                        // {
                        //     config: 'config.prompt.pushToBitBucket',
                        //     type: 'confirm',
                        //     message: "Push tag to E*TRADE BitBucket?",
                        //     default: 'Y',
                        //     when: function(answers) {
                        //         return answers['config.prompt.createGitTag'];
                        //     }
                        // },
                        // {
                        //     config: 'config.prompt.bitbucketRemote',
                        //     type: 'input',
                        //     message: "What is your BitBucket remote?",
                        //     default: "origin",
                        //     when: function(answers) {
                        //         return answers['config.prompt.pushToBitBucket'] && answers['config.prompt.createGitTag'];
                        //     }
                        // },
                        // {
                        //     config: 'config.prompt.pushToGithub',
                        //     type: 'confirm',
                        //     message: "Push tag to Github?",
                        //     default: 'Y',
                        //     when: function(answers) {
                        //         return answers['config.prompt.createGitTag'];
                        //     }
                        // },
                        // {
                        //     config: 'config.prompt.gitRemote',
                        //     type: 'input',
                        //     message: "What is your Github remote?",
                        //     default: "github",
                        //     when: function(answers) {
                        //         return answers['config.prompt.pushToGithub'] && answers['config.prompt.createGitTag'];
                        //     }
                        // }
                    ],
                    then: function(results) {
                        var version = results["config.prompt.version"];
                        var cwd = process.cwd();
                        var fs = require("fs");
                        var deslangSrcSize = 0;
                        var deslangDistSize = 0;
                        var deslangSrcPath = cwd + "/design-language-scss-" + version + ".zip";
                        var deslangDistPath = cwd + "/design-language-styles-" + version + ".zip";

                        if ((!fs.existsSync(deslangSrcPath)) && (!fs.existsSync(deslangDistPath))) {
                            grunt.task.run("zip");
                        } else {
                            console.log("Looks like you've already got a .zip created!");
                            grunt.task.run("open");
                        }

                        // while (deslangSrcSize >= 0 || deslangDistSize >= 0) {
                        //     setTimeout(function() {
                        //         console.log("still compressing");
                        //         deslangSrcSize = fs.statSync(deslangSrcPath).size;
                        //         deslangDistSize = fs.statSync(deslangSrcPath).size;
                        //     }, 1000);
                        // }

                        var jumpshare = grunt.config('jumpshare');
                        var gitinfo = grunt.config('gitinfo');
                        var branchName = gitinfo.local.branch.current.name;

                        var createGitTag = results["config.prompt.createGitTag"];
                        var pushToBitBucket = results["config.prompt.pushToBitBucket"];
                        var pushToGithub = results["config.prompt.pushToGithub"];

                        if (createGitTag && branchName == "pre-develop" && (pushToGithub || pushToBitBucket)) {
                            grunt.task.run("gittag");
                            if (pushToBitBucket) {
                                grunt.task.run("gitpush:bitbucket");
                                // grunt.log.writeln("run push to bitbucket");
                            }
                            if (pushToGithub) {
                                grunt.task.run("gitpush:github");
                                grunt.log.writeln("run push to github");
                            }
                        } else if (createGitTag || pushToGithub || pushToBitBucket) {
                            grunt.log.writeln("You are on '" + branchName + "'. You must create a tag against 'pre-develop'");
                        }

                        if (results["config.prompt.uploadToJumpshare"] && (jumpshare != "" || jumpshare != "undefined")) {
                            console.log("doing upload");
                            grunt.task.run("shell:runJumpshareAppleScript");
                        }
                    }
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-gitinfo');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('default', ['shell:isJumpshareRunning', 'gitinfo', 'prompt']);
    grunt.registerTask('zip', ['compress', 'open']);

};