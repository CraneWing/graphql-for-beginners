const GraphQL = require('graphql');

const { 
	GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInt 
} = GraphQL;

const UserType = require('../types/User');

const UserResolver = require('../resolvers/User');

module.exports = {
	create() {
		return {
			type: UserType,

			description: 'User type to manage all users in the app',

			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter user\'s full name; cannot be blank'
				},
				email: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter user email; must be valid and unique'
				},
				password: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter user password; will automatically be hashed'
				},
				phone: {
					type: GraphQLString,
					description: 'Enter user phone number'
				},
				status: {
					type: GraphQLInt,
					description: 'User status: active (1) or disabled (2); by default is active'
				}
			},

			resolve(parent, fields) {
				return UserResolver.create(fields);
			}
		} // return
	}, // create

	update() {
		return {
			type: UserType,

			description: 'Update user data',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter user ID'
				},
				name: {
					type: GraphQLString,
					description: 'Enter user\'s full name; cannot be blank'
				},
				email: {
					type: GraphQLString,
					description: 'Enter user email; must be valid and unique'
				},
				password: {
					type: GraphQLString,
					description: 'Enter user password; will automatically be hashed'
				},
				phone: {
					type: GraphQLString,
					description: 'Enter user phone number'
				},
				status: {
					type: GraphQLInt,
					description: 'User status: active (1) or disabled (2); by default is active'
				}
			},

			resolve(parent, fields) {
				return UserResolver.update(fields);
			}
		} // return
	}, // update
	
	delete() {
		return {
			type: UserType,

			description: 'Delete user and related data',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter user ID'
				}
		  },
		  resolve(parent, fields) {
				return UserResolver.delete(fields);
			}
		} // return
	} // delete
};