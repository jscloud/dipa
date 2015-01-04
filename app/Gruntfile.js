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

/*
   concat: {
    cssMin: {
      src: ['assets/css/skel.css', 'assets/css/style.css', 'assets/css/style-wide.css', 'assets/css/sweet-alert.css', 'assets/css/progress.css', 'assets/css/custom.css'],
      dest: 'assets/compiled/app.min.css',
    }
  },
*/

  uglify: {
    minJS: {
      files: {
        'assets/compiled/base.min.js': ['src/base/jquery.min.js', 'src/base/jquery.scrolly.min.js', 'src/base/paste.js', 'src/base/progress.min.js', 'src/base/skel.min.js', 'src/base/sweet-alert.min.js', 'src/base/responsive_init.js'],
        'assets/compiled/app.min.js': ['src/templates.js', 'src/core.js'],
      }
    },
  },

});

  // grunt.loadTasks('tasks');

  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['jst', 'uglify']);
};