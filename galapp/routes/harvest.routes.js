'use strict';

const { Router } = require('express');

// Get services 
const harvestController = require('../controllers/harvest.controllers');

// Validation middleware
const { harvestDataValidation } = require('../middlewares/validationMiddleware');

// Initializations
const router = Router();

// Harvest routes
router.get('/users/:userId', harvestController.getUserAccounts);
router.post('/accounts/:accountId/harvest', harvestDataValidation ,harvestController.createUserHarvest);

module.exports = router;