module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mocha: {
      index: ['test/index.html']
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'classy-slider.js',
        //'test/**/*.js',
        'demo/**/*.js'
      ],
      options: {
        ignores: ['test/lib/**/*.js'],
        jshintrc: './.jshintrc'
      }
    },

    sass: {
      dist: {
        files: {
          'classy-slider.css': 'styles/classy-slider.scss'
        }
      },
      dev: {
        files: {
          'demo/demo.css': 'styles/demo.scss'
        },
        options: {
          outputStyle: 'compressed'
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost'
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['jshint']
      },
      scss: {
        files: ['styles/**/*.scss'],
        tasks: ['sass'],
        options: {
          //atBegin: true,
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-node-version');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('prepare', ['node_version', 'sass']);
  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('run', ['node_version', 'connect', 'watch']);
};
