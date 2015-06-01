//---
// HELPERS
//

// check localStorage support
// @return {Boolean}
function clientSupportsLocalStorage() {
	/*try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}*/
	return typeof localStorage !== 'undefined';
}

// setItem
// @param {String} key
// @param {String} value
function setItem(key, value) {
	if (typeof key !== 'undefined' && typeof value !== 'undefined') {
		if (clientSupportsLocalStorage) {
			localStorage.setItem(key, JSON.stringify(value));
		}
		else {
			// TODO cookie alternative
		}
	}
}

// getItem
// @param {String} key
// @return 
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

// get id from url query params given url is only containing ?id=x
function getIdFromQueryString() {
	var query = location.search,// ?id=x
		arrId = query.substring(1).split('=');// ['id','x']

	if (arrId[0] === 'id') {
		return arrId[1];
	}
	else {
		return false;
	}
}


//---
// HANDLEBARS
//

// helper: return html snippet for importance as many times as level indicates
// used on main view
Handlebars.registerHelper('importanceHelper', function(level) {
	var buffer = '',
		snippet = '<i class=\"icon-power\"></i>';

	for (var i = 0; i < level; i++) {
		buffer += snippet;
	}

	return buffer;
});

// helper: return html snippet for importance with checked state for level
// used on edit view
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
	var $ctx = $(document).find('.mod-layout'),
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
				for (var i = 1, l = localStorage.length; i <= l; i++) {// start with index 1
console.log('storage item:',i,getItem(i));
					arrItems.push(getItem(i));
				}

				// compile handlebar with item array
				// handlebars escapes by default in {{ }}, use {{{ }}} to return markup in expressions
				var source = $('#notes-template').html(),
					template = Handlebars.compile(source),
					data = { items: arrItems };
//console.log(data);
				$('#notes').html(template(data));
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
		$ctx.on('click', '.js-switch-style', function(e){
			e.preventDefault();
console.log('switch style');
		});


		// sort by data-sort
		$ctx.on('click', '.js-sort', function(e){
			e.preventDefault();
console.log('sort by data-sort');

			var $sorter = $(this),
				by = $sorter.data('sort');
console.log('data-sort=',by);
		});


		// filter by data-filter
		$ctx.on('click', '.js-filter', function(e){
			e.preventDefault();
console.log('filter by data-filter');

			var $filter = $(this),
				by = $filter.data('filter');
console.log('data-filter=',by);
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
			var $this= $(this),
				$p = $this.find('p'),
				$icon = $this.find('i');

			$p.toggleClass('ellipsis');
			$icon.toggleClass('icon-zoom-in').toggleClass('icon-zoom-out');
		});
	}
	else {
		//---
		// OTHER VIEW
		//


		// load item data to be edited by id
		var editId = getIdFromQueryString(),
			editItem;
//console.log('target item id:',editId);

		if (typeof getIdFromQueryString() !== 'undefined') {
			editItem = getItem(editId);

			var editSource = $('#edit-template').html(),
				editTemplate = Handlebars.compile(editSource),
				editData = editItem;
//console.log(editData);

			$('#edit').html(editTemplate(editData));
		}


		// form submit
		$ctx.on('submit', '.js-form', function(e) {
			var $frm = $(this),
				importanceValue = $frm.find('input[name=importance]:checked').val(),
				$hiddenImportance = $frm.find('#inpImportanceHidden'),
				id,
				title = $frm.find('#inpTitle').val(),
				desc = $frm.find('#inpDescription').val(),
				importance,
				due = $frm.find('#inpDue').val(),
				newItem = {};

//console.log('submit');
			if (typeof getIdFromQueryString() !== 'undefined') {
				id = getIdFromQueryString();
			}
			else {
				console.log('error: id undefined');
				return false;
			}

			// update hidden field with checked radio value
			$hiddenImportance.val(importanceValue);

			// save notez data
			// key: id, value: {id, title, desc, importance, due}
			newItem = {
				id: id,
				title: title,
				desc: desc,
				importance: $hiddenImportance.val() ? $hiddenImportance.val() : 0,// save with importance 0 if empty
				due: due
			};

			setItem(id, newItem);


			// debug only: prevent submit
			//return false;
		});


		// cancel button TODO make href
		$ctx.on('click', '.js-form-cancel', function(e){
			e.preventDefault();

			location.href = 'index.html';
		});
	}
})($);
