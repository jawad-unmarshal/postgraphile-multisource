const {makeWrapResolversPlugin} = require("postgraphile");

module.exports = makeWrapResolversPlugin(
    context => {
        if (context.scope.isRootMutation) {
            return {scope: context.scope};
        }
        return null;
    },
    ({scope}) => async (resolver, user, args, context, _resolveInfo) => {
        console.log("Attempted Mutation. Blocked.")
        return null
    }
);

