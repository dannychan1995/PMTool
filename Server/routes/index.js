const router = require('express').Router();
const projectRoutes = require('./project');
const path = require('path');

router.use('/project', projectRoutes);


module.exports = router;