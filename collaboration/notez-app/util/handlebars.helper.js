var hbs = require('hbs');

//---
// HANDLEBARS HELPER
//

/**
	helper: return html snippet
	for importance as many times as level indicates
	used on main view

	@param {String} level

	@return {String} buffer
*/
hbs.registerHelper('importanceHelper', function(level) {
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
hbs.registerHelper('importanceCheckedHelper', function(level) {
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

/**
	helper: return html snippet
	for checkbox checked state
	toggled by converted string to boolean
	used on index view

	@param {String} str

	@return {String} buffer
*/
hbs.registerHelper('checkedHelper', function(str) {
	var buffer = '',
		blnChecked = (str === 'true');

	buffer += blnChecked ? ' checked=\"checked\"' : '';

	return buffer;
});

/**
	helper: TODO
*/
hbs.registerHelper('each_whenDone', function(list, k, v, opts) {
	console.log('eachDone:'+arguments);
	var i, result = '';
	for(i = 0; i < list.length; ++i)
		if(list[i][k] == v)
			result = result + opts.fn(list[i]);
	return result;
});
