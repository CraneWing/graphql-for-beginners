const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const bcrypt = require('bcrypt-nodejs');

const hashPassword = (password) => {
	let salt = bcrypt.genSaltSync();
	let hash = bcrypt.hashSync(password, salt);
	return hash;
}

const Schema = mongoose.Schema;

const UserSchema = Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		lowercase: true,
		required: true,
		unique: true
	},
	password: {
		type: String
	},
	phone: {
		type: String
	},
	status: {
		type: Number,
		default: 1
	}
},
{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	},
	collection: 'users'
});

UserSchema.methods.comparePassword = function(password) {
	if (!this.password) 
		return false;

	return becrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function(next) {
	if (this.password && this.isModified('password'))
		this.password = hashPassword(this.password);

	next();
});

module.exports = mongoose.model('User', UserSchema);