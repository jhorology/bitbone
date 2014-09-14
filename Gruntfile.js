module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: [
                'src/**/*.js',
                'package.json',
                '.jshintrc'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        concat: {
            files: {
                src: [
                    'src/application.js',
                    'src/arranger.js',
                    'src/ranged-value.js',
                    'src/automatable-ranged-value.js',
                    'src/beat-time.js',
                    'src/boolean-value.js',
                    'src/channel.js',
                    'src/clip-launcher-scenes-or-slots.js',
                    'src/clip-launcher-slots.js',
                    'src/clip.js',
                    'src/modulation-source.js',
                    'src/macro.js',
                    'src/device.js',
                    'src/cursor-device.js',
                    'src/source-selector.js',
                    'src/track.js',
                    'src/cursor-track.js',
                    'src/groove.js',
                    'src/mixer.js',
                    'src/primary-device.js',
                    'src/track-bank.js',
                    'src/transport.js',
                    'src/user-control-bank.js'
                ],
                dest: '<%= pkg.name %>.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= pkg.name %>-mini.js': '<%= pkg.name %>.js'
                }
            }
        },
        watch: {
            files: ['<%= concat.file.src %>'],
            tasks: ['concat', 'uglify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
