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


	//---
	// HANDLEBARS
	//

	


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

				
			});


			// filter by data-filter
			$ctx.on('click', '.js-filter', function(e){
				e.preventDefault();
console.log('filter by data-filter');

				
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
				
			});
		}
		else {
			//---
			// OTHER VIEW
			//


			
		}
	})($);

}(jQuery, window, document));
