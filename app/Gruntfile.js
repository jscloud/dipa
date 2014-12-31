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
          "src/templates.js": ["templates/**/*.html"]
        }
      },
    },

   concat: {
    base: {
      src: ['src/base/*.js'],
      dest: 'assets/compiled/base.js',
    },
    app: {
      src: ['src/templates.js', 'src/core.js'],
      dest: 'assets/compiled/app.js',
    },
  },

  });

  // grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
grunt.registerTask('default', ['jst', 'concat']);
};