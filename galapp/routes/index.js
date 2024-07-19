'use strict';

const express = require('express');

const router = express.Router();

const apiRoutes = require('./harvest.routes');
const fermentationRoutes = require('./fermentation.routes');

router.use(apiRoutes);
router.use(fermentationRoutes);

module.exports = router;