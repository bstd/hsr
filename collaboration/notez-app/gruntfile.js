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
			expressStyles: [
				"public/css"
			],
			expressScripts: [
				"public/js"
			],

			// less/css
			styles: [
				"source/css/*.less",
				"source/css/*.css"
			],

			// js
			scriptsLibraries: [
				"source/js/lib/*.js"
			],
			scripts: [
				"source/js/*.js"
			]
		},



		// PACKAGES

		// cfg clean
		//	https://github.com/gruntjs/grunt-contrib-clean
		//	...
		clean: {
			temp: {
				src: ['<%=dirs.temp%>/']
			},
			express: {
				src: ['<%=dirs.expressStyles%>/','<%=dirs.expressScripts%>/']
			}
		},

		// cfg concat
		//	https://github.com/gruntjs/grunt-contrib-concat
		//	collect all scripts, concat in temporary dir (to be minified)
		//	two targets, <head> and end of <body>
		concat: {
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
			express: {
				files: [
					// minified scripts
					{ expand: true, flatten: true, src: ['<%=dirs.temp%>/*.min.js'], dest: '<%=dirs.expressScripts%>/' },
					// minified css
					{ expand: true, flatten: true, src: ['<%=dirs.temp%>/*.min.css'], dest: '<%=dirs.expressStyles%>/' }
				]
			}
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
				files: 'source/**/*.*',
				tasks: ['default']
			}
		}

		// TODO jshint, validate?

		// TODO banner/timestamp
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
	grunt.registerTask('build', ['clean:temp', 'clean:express', 'concat:scripts', 'less_imports', 'less', 'cssmin', 'uglify', 'copy:express', 'watch']);

	// default
	grunt.registerTask('default', ['build']);
};
