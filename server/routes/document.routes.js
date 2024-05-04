
import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import {fetchDocuments,updateDocumentName,deleteDocumentName, fetchDocument} from '../controllers/document.controller.js'

const router= express.Router();

router.get('/documents',protectRoute,fetchDocuments);
router.put('/rename',protectRoute,updateDocumentName);
router.delete('/delete',protectRoute,deleteDocumentName);
router.post('/document',protectRoute,fetchDocument);



export default router;