const Employee = require('../models/EmployeeModel');

const getAllEmployee = async(req, res, next)=>{
    let employees;
    try
    {
        employees = await Employee.find();
    }
    catch (ex)
    {
        console.log('Cant Get Employee Data : ', ex)
    }
    if(!employees){
        return res.status(404).json({
            message: 'No Employee Found',
            flag: false
        });
    }
    return res.status(200).json({
        flag:true,
        employees
    })
}

const getEmployeeInfo = async (req,res,next) => {
    let id = req.params.id;
    let employee
    try {
        employee = await Employee.findById(id);
    } catch (ex) {
        console.log('Cant Get Employee Info', ex);
    }
    if(!employee){
        return res.status(404).json({
            success: false,
            message: 'Employee Doesnt Exist'
        });
    }
    return res.status(200).json({
        success: true,
        employeeDetails: employee
    });
}

const deleteEmployee = async (req, res, next) => {
    let employee;
    let id = req.params.id;
    try {
        employee = await Employee.findByIdAndRemove(id);
    } catch (ex) {
        console.log('Cant Delete Employee', ex);
    }
    if(!employee){
        return res.status(404).json({
            success: false,
            message: 'Employee Doesnt Exist'
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Employee Deleted Succesfully'
    });
}

const addEmployee = async (req, res, next) => {
    let { firstName, lastName, address, title, department } = req.body;
    let employee = new Employee({
        firstName,
        lastName,
        address,
        title,
        department
    });
    try {
        await employee.save();
    } catch (error) {
        console.log('Cant Insert Employee Into System', error);
    }
    res.status(201).json({
        success: true,
        employee
    });
}

const updateEmployee = async (req, res, next) => {
    let id = req.params.id;
    let employee;
    try {
        employee = await Employee.findByIdAndUpdate(id, req.body);
    } catch (error) {
        console.log('Cant Update Employee Data', error);
    }
    if(!employee){
        return res.status(404).json({
            success: false,
            message: 'Employee Doesnt Exist'
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Employee Added Succesfully'
    });
}

exports.addEmployee = addEmployee;
exports.getAllEmployee = getAllEmployee;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
exports.getEmployeeInfo = getEmployeeInfo;