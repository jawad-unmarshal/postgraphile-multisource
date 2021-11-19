const {makeWrapResolversPlugin} = require("postgraphile");
const config = require('../volume/config/config.json');

const pageLimit = config.max_per_page

module.exports = makeWrapResolversPlugin(
    context => {
        if (context.scope.isRootQuery) {
            return {scope: context.scope};
        }
        return null;
    },
    ({scope}) => async (resolver, user, args, context, _resolveInfo) => {
        console.log(args.first)
        if ((!args.first && !args.last) || args.first > pageLimit) {
            args.first = pageLimit
        }
        if (args.last > pageLimit) {
            args.last = pageLimit
        }
        return await resolver();
    }
);
