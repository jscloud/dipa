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
    base: {
      src: ['src/base/*.js'],
      dest: 'assets/compiled/base.js',
    },
    app: {
      src: ['src/templates.js', 'src/core.js'],
      dest: 'assets/compiled/app.js',
    },
  },
*/

  uglify: {
    minJS: {
      files: {
        'assets/compiled/base.min.js': ['src/base/jquery.min.js', 'src/base/jquery.scrolly.min.js', 'src/base/paste.js', 'src/base/progress.min.js', 'src/base/skel.min.js', 'src/base/sweet-alert.min.js', 'src/base/responsive_init.js'],
        'assets/compiled/app.min.js': ['src/templates.js', 'src/core.js'],
      }
    }
  },

});

  // grunt.loadTasks('tasks');
  // grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['jst', 'uglify']);
};