const router = require('express').Router();
const result = require('../Controller/result');

router.post('/',result.AddItems);
router.get('/',result.getResults)

module.exports = router;