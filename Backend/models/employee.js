const mongoose = require('mongoose')
const EmployeeSchema = new mongoose.Schema({
    firstName:  { type: String, required: true },
    jobTitle : { type: String, required: true },
    department: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {
            street: String,
            city: String,
            country: String,
            zip: String
        }
});

Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee