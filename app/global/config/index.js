module.exports = {
	server: {
		PORT: process.env.PORT || 8080
	},

	database: {
		HOST: process.env.MONGODB || 
		'mongodb://vmielke:admin@ds135966.mlab.com:35966/graphql-dev'
	}
};