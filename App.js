const express = require('express');
const PaginationFilterPlugin = require("./plugins/PaginationFilter");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const {postgraphile} = require("postgraphile");
const config = require("./config/config.json");

const app = express();

const schemaList = config.schema_list;
for (let index in schemaList) {
    const service = schemaList[index]
    console.log(service)
    app.use(
        postgraphile(config.connection_string, service, {
            ownerConnectionString: config.owner_connection_string,
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
