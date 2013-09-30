module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mocha: {
      test: {
        src: ['test/index.html'],
        options: {
          reporter: 'List',
          run: true
        }
      }
    },

    jshint: {
      files: ['**/*.js'],
      options: {
        ignores: [
          'node_modules/**/*.js',
          'test/lib/**/*.js'
        ],
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
