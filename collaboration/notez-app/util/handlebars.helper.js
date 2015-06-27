var hbs = require('hbs');

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
		template = hbs.compile(source),
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
// Todo passing nodeEntry
hbs.registerHelper('checkedHelper', function(level) {
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
