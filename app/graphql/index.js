const GraphQL = require('graphql');

const { 
	GraphQLObjectType, GraphQLSchema 
} = GraphQL;

const UserQuery = require('./queries/User');

const UserMutation = require('./mutations/User');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Default query provided by backend',

	fields: {
		users: UserQuery.index(),
		user: UserQuery.single()
	}
});

const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Default mutations by backend APIs',

	fields: {
		addUser: UserMutation.create(),
		updateUser: UserMutation.update(),
		deleteUser: UserMutation.delete()
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});