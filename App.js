const express = require('express');
const PaginationFilterPlugin = require("./plugins/PaginationFilter");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const MutationBlockerPlugin = require("./plugins/MutationBlocker")
const {postgraphile} = require("postgraphile");
const config = require('./volume/config/config.json');

const app = express();

const services = config.services;

for (const [service, connectionString] of Object.entries(services)) {
    app.use(
        postgraphile(connectionString, "public", {
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
            graphqlRoute: `/${service}/graphql`,
            graphiqlRoute: `/${service}/graphiql`,
            appendPlugins: [
                PaginationFilterPlugin,
                ConnectionFilterPlugin,
                MutationBlockerPlugin,
            ],
        })
    );
}

app.listen(config.port, function () {
    console.log('Listening on ' + config.port);
});
