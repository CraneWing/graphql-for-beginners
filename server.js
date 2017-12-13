const express = require('express'),
			bodyParser = require('body-parser'),
			cors = require('cors'),
			config = require('./app/global/config'),
			mongoose = require('mongoose'),
			expressGraphQL = require('express-graphql');

const GraphQLSchema = require('./app/graphql');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database.HOST);

const app = express();

app.set('port', config.server.PORT);
app.disable('x-powered-by');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/graphql', expressGraphQL(() => {
	return {
		graphiql: true,
		schema: GraphQLSchema
	};
}));

app.get('/', (req, res) => {
	res.json({
		code: 200,
		message: 'Welcome to the app!'
	});
});

app.listen(app.get('port'), () => {
	const port = app.get('port');
	console.log('GraphQL server running at http://127.0.0.1:' + port);
});