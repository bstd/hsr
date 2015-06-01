/**
 * Grunt Build Script
 * - based on grunt v0.4
 */
"use strict";

module.exports = function(grunt){
	// CONFIG
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// cfg directories
		dirs: {
			// temporary folder
			temp: [
				"temp"
			],

			// distribution targets
			dev: [
				"dist/dev"
			],
			sta: [
				"dist/sta"
			],
			prod: [
				"dist/prod"
			],

			// markup
			html: [
				"src/*.html"
			],

			// favico
			favico: [
				"src/*.ico"
			],

			// less/css
			styles: [
				"src/css/*.less",
				"src/css/*.css"
			],

			// js
			scriptsLibraries: [
				"src/js/lib/*.js"
			],
			scriptsHead: [
				"src/js/head/*.js"
			],
			scripts: [
				"src/js/*.js"
			],

			// img
			images: [
				"src/img/*.*"
			],

			// fonts
			fonts: [
				"src/fonts/*.*"
			]
		},



		// PACKAGES

		// cfg clean
		//	https://github.com/gruntjs/grunt-contrib-clean
		//	...
		clean: {
			less_imports: {
				src: ['<%=dirs.temp%>/temp-styles-imports.less']
			},
			dev: {
				src: ['<%=dirs.dev%>/']
			},
			sta: {
				src: ['<%=dirs.sta%>/']
			},
			prod: {
				src: ['<%=dirs.prod%>/']
			}
		},

		// cfg concat
		//	https://github.com/gruntjs/grunt-contrib-concat
		//	collect all scripts, concat in temporary dir (to be minified)
		//	two targets, <head> and end of <body>
		concat: {
			scriptsHead: {
				src: ['<%=dirs.scriptsHead%>'],
				dest: '<%=dirs.temp%>/head.js'
			},
			scripts: {
				src: ['<%=dirs.scriptsLibraries%>','<%=dirs.scripts%>'],
				dest: '<%=dirs.temp%>/script.js'
			}
		},

		// cfg less imports
		//	https://github.com/MarcDiethelm/grunt-less-imports
		//	...
		less_imports: {
			all: {
				options: {},
				src: ['<%=dirs.styles%>'],
				dest: '<%=dirs.temp%>/temp-styles-imports.less'
			}
		},

		// cfg less
		//	https://github.com/gruntjs/grunt-contrib-less
		//	...
		less: {
			development: {
				files: {
					"<%=dirs.temp%>/styles.css": '<%=dirs.temp%>/temp-styles-imports.less'
				}
			}
		},

		// cfg cssminify
		//	https://github.com/gruntjs/grunt-contrib-cssmin
		//	minify css
		cssmin: {
			options: {},
			target: {
				files: {
					'<%=dirs.temp%>/styles.min.css': ['<%=dirs.temp%>/styles.css']
				}
			}
		},

		// cfg uglify
		//	https://github.com/gruntjs/grunt-contrib-uglify
		//	minify javascripts
		uglify: {
			options: {
				mangle: false
			},
			scriptsHead: {
				files: {
					'<%=dirs.temp%>/head.min.js': ['<%=dirs.temp%>/head.js']
				}
			},
			scripts: {
				files: {
					'<%=dirs.temp%>/script.min.js': ['<%=dirs.temp%>/script.js']
				}
			}
		},

		// cfg copy
		//	https://github.com/gruntjs/grunt-contrib-copy
		//	...
		copy: {
			dev: {
				files: [
					// markup
					{ expand: true, flatten: true, src: ['<%=dirs.html%>'], dest: '<%=dirs.dev%>/' },
					// favicons
					{ expand: true, flatten: true, src: ['<%=dirs.favico%>'], dest: '<%=dirs.dev%>/' },
					// minified scripts
					{ expand: true, flatten: true, src: ['<%=dirs.temp%>/*.min.js'], dest: '<%=dirs.dev%>/js/' },
					// minified css
					{ expand: true, flatten: true, src: ['<%=dirs.temp%>/*.min.css'], dest: '<%=dirs.dev%>/css/' },
					// images
					{ expand: true, flatten: true, src: ['<%=dirs.images%>'], dest: '<%=dirs.dev%>/img/' },
					// fonts
					{ expand: true, flatten: true, src: ['<%=dirs.fonts%>'], dest: '<%=dirs.dev%>/fonts/' }
				]
			}/*,
			sta: {
				files: [
					
				]
			},
			prod: {
				files: [
					
				]
			}*/
		},

		// cfg watch
		//	https://github.com/gruntjs/grunt-contrib-watch
		//	run tasks whenever file(s) change(s)
		watch: {
			options: {
				livereload: true,
				spawn: false
			},
			src: {
				files: 'src/**/*.*',
				tasks: ['default']
			}
		}

		// TODO jshint, validate?

		// TODO banner/timestamp


		// cfg Mocha
		// https://github.com/kmiyashiro/grunt-mocha
		/*mocha: {
			all: {
				src: ['tests/testrunner.html'],
				options: {
					log: true,
					logErrors: true
				}
			},
			options: {
				run: true
			}
		}*/
	});


	// NPM TASKS

	// Delete some temporary Files
	grunt.loadNpmTasks('grunt-contrib-clean');

	// load concat
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Import Less files instead of concat for error messages with file and line nr
	grunt.loadNpmTasks('grunt-less-imports');

	// Compile Less to CSS
	grunt.loadNpmTasks('grunt-contrib-less');

	// load cssminify
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// load minify
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Copy files from one place to another
	grunt.loadNpmTasks('grunt-contrib-copy');

	// load watch
	grunt.loadNpmTasks('grunt-contrib-watch');


	// TASKS

	// build
	grunt.registerTask('build', ['clean:dev', 'clean:less_imports', 'concat:scriptsHead', 'concat:scripts', 'less_imports', 'less', 'cssmin', 'uglify', 'copy:dev', 'watch']);

	// default
	grunt.registerTask('default', ['build']);
};
