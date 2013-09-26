module.exports = function(grunt) {

  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),

    mocha: {
      index: [ 'test/index.html' ]
    },

    jshint: {
      files: ['Gruntfile.js', 'classy-slider.js', 'test/**/*.js', 'demo/**/*.js'],
      options: {
        ignores: ['test/lib/**/*.js'],
        jshintrc: './.jshintrc'
      }
    },

    exec: {
      run: {
        cmd: 'python -m SimpleHTTPServer'
      }
    }

  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('run', ['exec:run']);
};
