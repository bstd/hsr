/**
 * Created by joelwickli on 13.06.15.
 */


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
	// Get Notes
	function getNotes(id) {
		getItem(id);
	}
	// Change Notes Item
	function changeNotes(id, changeItem) {
		setItem(id, changeItem);
	}
	// ADD Notes Item
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