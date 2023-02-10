const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	isAdmin: {type: Boolean, default: false}
});


const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		isAdmin: Joi.boolean().label("isAdmin")
	});
	return schema.validate(data);
};

module.exports = { User, validate };
