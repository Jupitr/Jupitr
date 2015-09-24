module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          // insert
        ],
        //insert
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: [
          // insert
        ]
      }
    },

    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '': [
            // insert
          ]
        }
      }
    },

    jshint: {
      files: [
        // insert
      ],
      options: {
        force: false,
        jshintrc: '.jshintrc',
        ignores: [
          // insert
        ]
      }
    },

    cssmin: {
      dist: {
        files: {
          //insert
        }
      }
    },

    watch: {
      scripts: {
        files: [
          // insert
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: '', // insert
        tasks: ['cssmin']
      }
    },

    shell: {
      'git-add': {
        command: 'git --no-pager add .',
        options: {
          stdout: true,
          stderr: true,
          // execOptions: { cwd: '../deploy'}
        }
      },
      'git-commit':           {
        command: 'git --no-pager commit -m "update"',
        options: {
          stdout: true,
          stderr: true,
          // execOptions: { cwd: '../deploy'}
        }
      },
      'git-push':             {
        command: 'git --no-pager push heroku master',
        options: {
          failOnError: true,
          stdout: true,
          stderr: true,
          // execOptions: { cwd: '../deploy'}
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('server-prod', [
    'shell'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run([ 'server-prod' ]);
    } else {
      console.log('local server');
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(){
    grunt.task.run([ 'test', 'build', 'upload' ]);
  });

  grunt.registerTask('heroku:production', function(){
    grunt.task.run([ 'build' ]);
  });

  grunt.registerTask('heroku:development', function(){
    grunt.task.run([ 'build' ]);
  });

};
