﻿// NAMESPACE: self contained via IIFE
//	jquery scope
//	window, document directly accessible
//	undefined immutable
;(function($, window, document, undefined) {
	"use strict";

	//---
	// HELPERS
	//

	/**
		set theme if cookie found

		@param {jQuery} $context
	*/
	function setTheme($context) {
		var strCookieStyle = Cookies.get('theme');

		if (typeof strCookieStyle !== 'undefined') {
			$context.find('.js-switch-style').val(strCookieStyle);
			setSkin(strCookieStyle);
		}
	}

	/**
		change theme via styleswitcher
		add/remove .skin-... classes on <html>
		update cookie

		@param {String|Number} code
	*/
	function setSkin(code) {
		var arrSkins = ['skin-blackwhite'],
			strAllSkins = arrSkins.join(' ');// extendability for more skins

		$('html').removeClass(strAllSkins);

		if (code !== 'default') {
			$('html').addClass(arrSkins[code]);
		}

		//  store chosen code in cookie
		Cookies.set('theme', code, { expires: 100 });
	}

	/**
		filter by:
			- 'done'

		@param {Array} array
		@param {String} only

		@return {Array} arrResult
	*/
	function filter(array, only) {
		var arrResult,
			filter;
console.log('filter by:',only);

		if (typeof only !== 'undefined') {
			switch (only) {
				case 'done':
					arrResult = $.map(array, function(n, i) {
//console.log('n,i:',n,i);
						if ('done' in n && n.done) {// key in object || object.hasOwnProperty(key)
							return n;
						}
					});
					break;
			}
console.log('result:',arrResult);
			return arrResult;
		}
		else {
console.log('invalid filter');
		}
	}

	/**
		sort by

		TODO
	*/
	function sort(array, by) {
		var arrResult,
			sorter;
console.log('sort by:',by);
		if (typeof by !== 'undefined') {
			switch (by) {
				case 'due':
					arrResult = array.sort(function(a,b) {
console.log('dueDate compare:');
console.log('a:',a);
console.log('b:',b);
console.log('a.dueDate:',a.dueDate);
console.log('b.dueDate:',b.dueDate);
						return a.dueDate - b.dueDate;
					});
					break;
				case 'created':
					arrResult = array.sort(function(a,b) {
console.log('created compare:');
console.log('a:',a);
console.log('b:',b);
console.log('a.created:',a.created);
console.log('b.created:',b.created);
						return a.created - b.created;
					});
					break;
				case 'importance':
					arrResult = array.sort(function(a,b) {
console.log('importance compare:');
console.log('a:',a);
console.log('b:',b);
console.log('a.importance:',a.importance);
console.log('b.importance:',b.importance);
						// higher value first
						return b.importance - a.importance;
					});
					break;
			}
console.log('result:',arrResult);

			return arrResult;
		}
		else {
console.log('invalid sorter');
		}
	}


	// TODO replace with REST/expressjs
	/* Revealing Module */
	// Todo Finish Module
	var notesEntry = (function() {
		var newItem = {};
		var arrStorage = [];

		/**
		 load all stored items
		 from window.localStorage
		 into arrStorage

		 return {Array} arrStorage
		 */
		function loadItems() {


			for (var i = 1, l = localStorage.length; i <= l; i++) {// start with index 1
				console.log('storage item:',i,getItem(i));
				arrStorage.push(getItem(i));
			}

			return arrStorage;
		}

		/**
		 getItem

		 @param {String} key
		 @return {Object}
		 */
		function getItem(key) {
			if (typeof key !== 'undefined') {
				if (clientSupportsLocalStorage) {
					return JSON.parse(localStorage.getItem(key));
				}
				else {
					// TODO cookie alternative
				}
			}
		}
		/**
		 setItem

		 @param {String} key
		 @param {String} value
		 */
		function setItem(key, value) {
			if (typeof key !== 'undefined' && typeof value !== 'undefined') {
				if (clientSupportsLocalStorage) {
					// try catch quota limit when storing
					// exception handling up to date?
					try {
						localStorage.setItem(key, JSON.stringify(value));
					} catch(domException) {
						if (domException.name === 'QuotaExceededError' ||
							domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
							alert('localStorage Limit erreicht');
						}
					}
				}
				else {
					// TODO cookie alternative
				}
			}
		}
		// Get Notes Item
		function getNotes(id) {
			return getItem(id);
		}
		// Change Notes Item - done function
		function changeNotes(id, changeItem) {
			setItem(id, changeItem);
		}
		// add Notes Items
		function addNotes(id, title, text, importanceValue, created, dueDate, done) {
			newItem = {
				id: id,
				title: title,
				text: text,
				importance: importanceValue,// save with importance 0 if empty
				created: created,// TODO
				dueDate: dueDate,
				done: done
			};
			setItem(id, newItem);
			console.log( "newItem:" + newItem );
		}
		function showNotes() {
			return loadItems();
		}
		// explicitly return public methods when this object is instantiated
		return {
			addNotesEntry : addNotes,
			getNotesEntry : getNotes,
			changeNotesEntry : changeNotes,
			showNotesEntry : showNotes
		};

	} )();


	//---
	// DOM READY
	//
	(function($) {
		var $ctx = $(document).find('.js-module'),
			isMainView = $ctx.find('.js-init').length !== 0,
			arrItems = [],
			$noItems = $ctx.find('.js-no-items');
console.log('$ctx=',$ctx);
console.log('isMainView=',isMainView);


		// avoid ajax caching
		$.ajaxSetup({ cache: false });


		// check if main view active
		if (isMainView) {
			//---
			// MAIN VIEW
			//


			// set theme
			setTheme($ctx);


			// create new note
			$ctx.on('click', '.js-new', function(e){
				e.preventDefault();

				location.href = '/notes/new';
			});


			// switch style
			$ctx.on('change', '.js-switch-style', function(e){
console.log('switch style');
				var strVal = $(this).val(),
					codeSkin = isFinite(parseInt(strVal,10)) ? parseInt(strVal,10) : 'default';

				setSkin(codeSkin);
			});


			// edit via data-item
			$ctx.on('click', '.js-edit', function(e){
				e.preventDefault();

				var $item = $(this),
					i = $item.data('item');

				location.href = '/notes/' + i;
			});


			// toggle item detail and icon
			$ctx.on('click', '.js-expand', function(e){
console.log('toggle item detail and icon');
				var $this = $(this),
					$p = $this.find('p'),
					$icon = $this.find('i');

				$this.toggleClass('state-expanded');
				$p.toggleClass('ellipsis');
				$icon.toggleClass('icon-zoom-in').toggleClass('icon-zoom-out');
			});


			// click checkbox: update item.done to :checked ? true:false
			$ctx.on('click', '.js-done', function(e){
console.log('update item.done');
				var $this = $(this),
					id = $this.val(),
					blnDone = $this.is(':checked'),
					blnProceed = false,
					tmpData = {};

				// ask confirmation before proceeding
				blnProceed = window.confirm('Erledigung bestätigen?');

				if (blnProceed) {
					$.when(
						// get note by id
						$.getJSON('/notes/' + id, function(data) {})
					).then(function(data, textStatus, jqXHR) {
						// if we use the same notezStore function, we have to pass in the same names as with form fields
						tmpData = {
							id: data.id,
							inpTitle: data.title,
							inpDescription: data.text,
							importance: data.importance,
							inpDue: data.dueDate,
							inpDone: !data.done// toogle boolean
						}
//console.log('tmpData=',tmpData);
//console.log(tmpData.inpDone);

						// RESTful PUT for id with updated tmpData
						$.ajax({
							type: 'put',
							url: '/notes/' + id,
							dataType: 'json',
							data: tmpData,
							success: function(data, status, jqXHR) {
//console.log('success data=',data);
//console.log('status=',status);
							},
							error: function(jqXHR, status) {
//console.log(jqXHR, status);
							}
						});
					});
				}
				else {
					e.preventDefault();
				}


				// TODO apply default filter/sort ?
				//$activeFilter = $ctx.find('.js-filter.state-active'),
			});
		}
		else {
			//---
			// OTHER VIEW
			//


			// set theme
			setTheme($ctx);


			// TODO invalid ids


			// datepicker https://jqueryui.com/datepicker/
			var $dp = $ctx.find('.js-dp'),
				cfgRegion = 'de',
				cfgFormat = 'dd.mm.yy';

			$dp.datepicker(
				$.extend(
					{},
					$.datepicker.regional[cfgRegion], {
						'dateFormat': cfgFormat,
						'defaultDate': $dp.val(),
						'changeMonth': true,
						'changeYear': true,
						'yearRange': '2015:2020'
					}
				)
			);


			// form submit
			$ctx.on('submit', '.js-form', function(e) {
				// TODO serialize all necessary hidden fields
				// TODO clientside validate date (format, not in past), alert onerror
				/*var $frm = $(this),
					id = getIdFromQueryString(),
					title = $frm.find('#inpTitle').val(),
					text = $frm.find('#inpDescription').val(),
					importanceValue = $frm.find('input[name=importance]:checked').val(),// workaround for hidden radio
					$hiddenImportance = $frm.find('#inpImportanceHidden');
					created = Date(),
					dueDate = $frm.find('#inpDue').val(),
					done = $frm.find('#inpDone').val() === 'true' ? true : false;// include hidden value for done state, not editable here by user

				if (typeof id !== 'undefined') {
					 update hidden field with checked radio value
					$hiddenImportance.val(importanceValue);
					// passing data into a private method
					notesEntry.addNotesEntry(id, title, text, importanceValue, created, dueDate, done);
				}
				else {
					console.log('error: id undefined');
					return false;
				}*/
			});
		}
	})($);

}(jQuery, window, document));
