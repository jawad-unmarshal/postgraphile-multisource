const express = require('express');
const PaginationFilterPlugin = require("./plugins/PaginationFilter");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const {postgraphile} = require("postgraphile");
const config = require("./config/config.json");

const app = express();

const services = config.services;
for (const [service, connectionString] of Object.entries(services)) {
    console.log(service, connectionString)
    app.use(
        postgraphile(connectionString, "public", {
            disableDefaultMutations: true,
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
            graphqlRoute: `/${service}/graphql`,
            graphiqlRoute: `/${service}/graphiql`,
            appendPlugins: [
                PaginationFilterPlugin,
                ConnectionFilterPlugin,
            ],
        })
    );
}

app.listen(config.port, function () {
    console.log('Listening on ' + config.port);
});
