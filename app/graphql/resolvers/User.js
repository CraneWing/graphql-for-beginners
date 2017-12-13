const User = require('../../services/models/User');

class UserController {
	constructor(model) {
		this.model = User;
	}

	index() {
		return this.model.find()
			.sort('created_at')
			.exec()
			.then(records => {
				return records;
			})
			.catch(error => {
				return error;
			});
	}

	single(options) {
		return this.model.findOne({ _id: options.id })
			.exec()
			
	}

	create(data) {
		const record = new this.model(data);

		return record.save()
			.then(record => {
				return record;
			})
			.catch(error => {
				return error;
			});
	}

	update(data) {
		return this.model.findOne({ _id: data.id })
			.exec()
			.then(record => {
				Object.keys(data).map(field => {
					record[field] = data[field];
				});

				return record.save()
					.then(updated => {
						return updated;
					})
					.catch(error => {
						return error;
					});
			})
			.catch(error => {
				return error;
			});
	}

	delete(options) {
		this.model.findById(options.id)
			.exec()
			.then(record => {
				record.remove();
				return { status: true };
			})
			.catch(error => {
				return error;
			});
	}
}

const userController = new UserController();
module.exports = userController;