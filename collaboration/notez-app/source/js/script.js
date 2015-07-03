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
		var arrSkins = ['skin-lighttheme'],
			strAllSkins = arrSkins.join(' ');// extendability for more skins

		$('html').removeClass(strAllSkins);

		if (code !== 'default') {
			$('html').addClass(arrSkins[code]);
		}

		//  store chosen code in cookie
		Cookies.set('theme', code, { expires: 100 });
	}


	//---
	// DOM READY
	//
	(function($) {
		var $ctx = $(document).find('.js-module'),
			isMainView = $ctx.find('.js-init').length !== 0,
			$dp,
			$isoDateField,
			cfgRegion,
			cfgUiFormat,
			cfgDbFormat;


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
				var $this = $(this),
					$p = $this.find('p'),
					$icon = $this.find('i');

				$this.toggleClass('state-expanded');
				$p.toggleClass('ellipsis');
				$icon.toggleClass('icon-zoom-in').toggleClass('icon-zoom-out');
			});


			// click checkbox: update item.done to :checked ? true:false
			$ctx.on('click', '.js-done', function(e){
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
							inpDue: moment(JSON.parse(data.dueDate)).format('YYYY-MM-DD'),// ISO_8601 for momentJS
							inpDone: blnDone
						};

						// RESTful PUT for id with updated tmpData
						$.ajax({
							type: 'put',
							url: '/notes/' + id,
							dataType: 'json',
							data: tmpData,
							success: function(result, status, jqXHR) {
								if (result.status == 200) {
									location.href = '/';
								}
							},
							error: function(jqXHR, status) {
								alert('Es ist ein Fehler aufgetreten. Daten wurden nicht gespeichert.');
							}
						});
					});
				}
				else {
					e.preventDefault();
				}
			});
		}
		else {
			//---
			// OTHER VIEW
			//


			// set theme
			setTheme($ctx);


			// datepicker https://jqueryui.com/datepicker/
			$dp = $ctx.find('.js-dp'),
			$isoDateField = $ctx.find('.js-date'),
			cfgRegion = 'de',
			cfgUiFormat = 'dd.mm.yy',
			cfgDbFormat = 'yy-mm-dd';// ISO_8601 for datepicker

			$dp.datepicker(
				$.extend(
					{},
					$.datepicker.regional[cfgRegion], {
						'dateFormat': cfgUiFormat,
						'defaultDate': $dp.val(),
						'altField': $isoDateField,
						'altFormat': cfgDbFormat,
						'changeMonth': true,
						'changeYear': true,
						'minDate': 0
					}
				)
			);

			// initialize fields (altField is not automatically set!)
			$dp.datepicker('setDate', $dp.val());
		}
	})($);

}(jQuery, window, document));
