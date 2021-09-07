/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

import patientsService from '../services/patientsService';
import {toNewPatient, toNewPatientEntry } from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  return res.json(patientsService.getAllPatients());
});


router.post('/', (req, res) => {
  try {
  const newPatient = toNewPatient(req.body);
  const addedNewPatient = patientsService.addPatient(newPatient);
  
  res.json(addedNewPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
  
});

router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const patient = patientsService.getPatient(id);
    res.json(patient);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewPatientEntry(req.body);
    const newEntryAdded = patientsService.addPatientEntry(newEntry, id);
    res.json(newEntryAdded);
  } catch(e) {
    res.status(400).json(e.message);
  }
});



export default router;