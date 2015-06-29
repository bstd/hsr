var express = require('express'),
	notezController = require('../controller/notezController'),
	router = express.Router();

// notez routes: all at /notes
router.get('/:id/', notezController.showNote);
router.put('/:id/', notezController.editNote);
router.post('/', notezController.addNote);


module.exports = router;
