// NAMESPACE: self contained via IIFE
//	jquery scope
//	window, document directly accessible
//	undefined immutable
;(function($, window, document, undefined) {
	"use strict";

	//---
	// HELPERS
	//

	/**
		check localStorage support

		@return {Boolean}
	*/
	function clientSupportsLocalStorage() {
		/*try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}*/
		return typeof localStorage !== 'undefined';
	}

	/**
		load all stored items
		from window.localStorage
		into arrStorage

		return {Array} arrStorage
	*/
	function loadItems() {
		var arrStorage = [];

		for (var i = 1, l = localStorage.length; i <= l; i++) {// start with index 1
	console.log('storage item:',i,getItem(i));
			arrStorage.push(getItem(i));
		}

		return arrStorage;
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
		get id from url query params
		given url is only containing ?id=x

		@return {String} id
	*/
	function getIdFromQueryString() {
		var query = location.search,// ?id=x
			arrId = query.substring(1).split('='),// ['id','x']
			id;

		if (arrId[0] === 'id') {
			id = arrId[1];
		}

		return id;
	}

	/**
		change theme via styleswitcher
		add/remove .skin-... classes on <html>

		@param {Number} code
	*/
	function setSkin(code) {
		var arrSkins = ['skin-blackwhite'],
			strAllSkins = arrSkins.join(' ');// extendability for more skins

		$('html').removeClass(strAllSkins);

		if (code !== 'default') {
			$('html').addClass(arrSkins[code]);
		}

		// TODO store chosen skin in cookie
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


	//---
	// HANDLEBARS
	//

	/**
		shortcut for hbs compile
		provide source ID selector, target ID selector
		and data object

		@param {String} strSourceId
		@param {String} strTargetId
		@param {Object} objData
	*/
	function handle(strSourceId, strTargetId, objData) {
		var source = $(strSourceId).html(),
			template = Handlebars.compile(source),
			data = objData;
console.log('handle:');
console.log('target:',$(strTargetId));
console.log('data:',data);
		$(strTargetId).html(template(data));
	}

	/**
		helper: return html snippet
		for importance as many times as level indicates
		used on main view

		@param {String} level

		@return {String} buffer
	*/
	Handlebars.registerHelper('importanceHelper', function(level) {
		var buffer = '',
			snippet = '<i class=\"icon-power\"></i>';

		for (var i = 0; i < level; i++) {
			buffer += snippet;
		}

		return buffer;
	});

	/**
		helper: return html snippet
		for importance with checked state for level
		used on edit view

		@param {String} level

		@return {String} buffer
	*/
	Handlebars.registerHelper('checkedHelper', function(level) {
		var buffer = '',
			maxItems = 5,
			intLevel = parseInt(level,10);

		// inverse loop in order to match float:right (we need 5,4,3,2,1)
		for (var i = maxItems; i > 0; i--) {
			if (intLevel === i) {
				buffer += '<input id=\"inpImportance' + i + '\" type=\"radio\" name=\"importance\" value=\"' + i + '\" checked=\"checked\" />';
			}
			else {
				buffer += '<input id=\"inpImportance' + i + '\" type=\"radio\" name=\"importance\" value=\"' + i + '" />';
			}

			buffer +=	'<label for=\"inpImportance' + i + '\"> \
							<i class=\"icon-power\" title=\"Wichtigkeit: ' + i + '\"></i>' + i + ' \
						</label>';
		}

		return buffer;
	});




	//---
	// DOM READY
	//
	(function($) {
		var $ctx = $(document).find('.js-module'),
			isMainView = $ctx.find('.js-init').length !== 0,
			arrItems = [],
			$noItems = $ctx.find('.js-no-items');


		// check if main view active
		if (isMainView) {
			if (clientSupportsLocalStorage) {
console.log('localStorage.length:',localStorage.length);
				if (localStorage.length !== 0) {
					$noItems.hide();

					// load all items
					arrItems = loadItems();

					// compile handlebar with items array
					handle('#notes-template', '#notes', { items: arrItems });
				}
				else {
					$noItems.show();
				}
			}
			else {
				alert('achtung kein localStorage');
				// TODO cookie alternative
			}


			//---
			// MAIN VIEW
			//

			// create new note
			$ctx.on('click', '.js-new', function(e){
				e.preventDefault();

				// calculate new id (count existing)
				if (clientSupportsLocalStorage()) {
					var newStorageIndex = localStorage.length + 1;// use item length of localStorage to generate id for new entry

					location.href = 'edit.html?id=' + newStorageIndex;
				}
			});


			// switch style
			$ctx.on('change', '.js-switch-style', function(e){
				e.preventDefault();
console.log('switch style');
				var strVal = $(this).val(),
					codeSkin = isFinite(parseInt(strVal,10)) ? parseInt(strVal,10) : 'default';

				setSkin(codeSkin);
			});


			// sort by data-sort
			$ctx.on('click', '.js-sort', function(e){
				e.preventDefault();
console.log('sort by data-sort');

				var $sorter = $(this),
					by = $sorter.data('sort'),
					arrItems = [],
					sortedItems = [],
					blnSorterAlreadyActive = $sorter.is('.state-active');
//console.log('data-sort=',by);
console.log('blnSorterAlreadyActive:',blnSorterAlreadyActive);

				// state toggle
				$sorter.toggleClass('state-active');

				// load items
				arrItems = loadItems();

				// sort, only if active state false
				sortedItems = blnSorterAlreadyActive ? arrItems : sort(arrItems, by);

				// compile handlebar with items array
				handle('#notes-template', '#notes', { items: sortedItems });
			});


			// filter by data-filter
			$ctx.on('click', '.js-filter', function(e){
				e.preventDefault();
console.log('filter by data-filter');

				var $filter = $(this),
					only = $filter.data('filter'),
					filtered = [],
					blnFilterAlreadyActive = $filter.is('.state-active');
//console.log('data-filter=',only);
console.log('blnFilterAlreadyActive:',blnFilterAlreadyActive);

				// state toggle
				$filter.toggleClass('state-active');

				// toggle filter and update view
				// filter, only if active state false
				filtered = blnFilterAlreadyActive ? arrItems : filter(arrItems, only);

				if (filtered.length > 0) {
					// compile handlebar with items array
					handle('#notes-template', '#notes', { items: filtered });
					$noItems.hide();
				}
				else {
					$('#notes').empty();// TODO cache el
					$noItems.show();
				}
			});


			// edit via data-item
			$ctx.on('click', '.js-edit', function(e){
				e.preventDefault();
console.log('edit via data-item');

				var $item = $(this),
					i = $item.data('item');
console.log('data-item=',i);

				location.href = 'edit.html?id=' + i;
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
console.log('update item.done true:false');
				var $this = $(this),
					id = $this.val(),
					$activeFilter = $ctx.find('.js-filter.state-active'),
					filterOnly,
					filteredItems = [],
					oldItem,
					newItem;

				// update localStorage
				oldItem = getItem(id);
console.log('oldItem.done:',oldItem.done);
				oldItem.done = $this.is(':checked');

				newItem = oldItem;
console.log('newItem.done:',newItem.done);
console.log('id:',id);
				setItem(id, newItem);

				// load updated items
				arrItems = loadItems();

				// apply active filter
				if ($activeFilter.length > 0) {
					filterOnly = $activeFilter.data('filter');
					filteredItems = filter(arrItems, filterOnly);
				}
				else {
					filteredItems = arrItems;
				}

				// apply active sort
				// TODO

				// compile handlebar with items array
				handle('#notes-template', '#notes', { items: filteredItems });// TODO use sortedItems when implemented
			});
		}
		else {
			//---
			// OTHER VIEW
			//


			// load item data to be edited by id
			var editId = getIdFromQueryString(),
				editItem;

			if (typeof editId !== 'undefined') {
				// TODO invalid ids
				editItem = getItem(editId);

				// compile handlebar with editItem
				handle('#edit-template', '#edit', editItem);
			}


			// form submit
			$ctx.on('submit', '.js-form', function(e) {
				// TODO clientside validate date (format, not in past), alert onerror
 				var $frm = $(this),
					id = getIdFromQueryString(),
					title = $frm.find('#inpTitle').val(),
					text = $frm.find('#inpDescription').val(),
					importanceValue = $frm.find('input[name=importance]:checked').val(),// workaround for hidden radio
					$hiddenImportance = $frm.find('#inpImportanceHidden'),
					created = Date(),
					dueDate = $frm.find('#inpDue').val(),
					done = $frm.find('#inpDone').val() === 'true' ? true : false,// include hidden value for done state, not editable here by user
					newItem = {};

				if (typeof id !== 'undefined') {
					// update hidden field with checked radio value
					$hiddenImportance.val(importanceValue);

					// save notez data
					// key: id, value: {id, title, text, importance, created, dueDate, done}
					newItem = {
						id: id,
						title: title,
						text: text,
						importance: $hiddenImportance.val() ? $hiddenImportance.val() : 0,// save with importance 0 if empty
						created: created,// TODO
						dueDate: dueDate,
						done: done
					};

					setItem(id, newItem);
				}
				else {
					console.log('error: id undefined');
					return false;
				}
			});
		}
	})($);

}(jQuery, window, document));
