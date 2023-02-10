const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Employee = require('../models/EmployeeModel');

const router = express.Router();

const upload = multer({
    dest: 'uploads/'
});

const XLSX = require('xlsx');

const parseXlsxFile = file => {
    const workbook = XLSX.readFile(file.path);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = XLSX.utils.sheet_to_json(worksheet);
    console.log(data);
    const employees = data.map(row => ({
        firstName: row['FirstName'],
        lastName: row['LastName'],
        address: row['Address'],
        title: row['Title'],
        department: row['Department']
    }));
    return employees;
};

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const employees = parseXlsxFile(req.file);
        await Employee.insertMany(employees);
        res.json({ message: 'File uploaded and employees inserted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting employees' });
    }
});

module.exports = router;