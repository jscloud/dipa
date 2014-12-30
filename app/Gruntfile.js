'use strict';

module.exports = function(grunt) {
  grunt.initConfig({

    jst: {
      compile: {
        options: {
          templateSettings: {
            variable: 'obj'
          }
        },
        files: {
          "assets/js/templates.js": ["templates/**/*.html"]
        }
      },
    },

  });

  // grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jst');

  grunt.registerTask('default', ['jst']);
};
