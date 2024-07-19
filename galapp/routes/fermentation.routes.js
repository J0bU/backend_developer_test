'use strict';

const { Router } = require('express');

// Get services
const fermentationController = require('../controllers/fermentation.controllers');
const { fermentationDataValidation } = require('../middlewares/validationMiddleware');

// Initializatons
const router = Router();

// Fermentation Routes
router.post('/accounts/:accountId/fermentation', fermentationDataValidation, fermentationController.createFermentationDocument);
router.get('/accounts/:accountId/fermentation', fermentationController.getFermentationDocument);
router.put('/accounts/:accountId/fermentation', fermentationDataValidation, fermentationController.updateFermentationDocument);
router.delete('/accounts/:accountId/fermentation', fermentationController.deleteFermetationDocument);

module.exports = router;