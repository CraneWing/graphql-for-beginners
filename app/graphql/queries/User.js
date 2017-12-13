const GraphQL = require('graphql');

const { 
	GraphQLList, GraphQLID, GraphQLNonNull 
} = GraphQL;

const UserType = require('../types/User');

const UserResolver = require('../resolvers/User');

module.exports = {
	index() {
		return {
			type: new GraphQLList(UserType),
			description: 'Returns all users in database',
			
			resolve(parent, args, context, info) {
				return UserResolver.index({});
			}
		}
	},

	single() {
		return {
			type: UserType,
			description: 'Returns single user found by ID',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Please enter user id'
				}
			},
			
			resolve(parent, args, context, info) {
				return UserResolver.single({ id: args.id });
			}
		}
	}
};