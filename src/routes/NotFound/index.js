export default () => ({
    path: '*',
    getComponent(nextState, cb) {
        console.log('Route Not found');
        //location.reload();
        // const NotFound = require('./NotFound').default;
        // cb(null, NotFound);
    },
});