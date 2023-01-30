const mongoose = require('mongoose')
const DepartmentSchema = new mongoose.Schema({
    name: {type: String},
});


Department = mongoose.model('Department', DepartmentSchema);

module.exports = Department