const server = require('./server/server');
const router = require('./src/router/rouetr');
const requestHandlers = require('./src/router/requestHandlers');

const handle = {}
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/getUserInfo'] = requestHandlers.getUserInfo;
handle['/queryTabList'] = requestHandlers.queryTabList;
handle['/queryPunchInRule'] = requestHandlers.queryPunchInRule;
handle['/csdnCheck'] = requestHandlers.csdnCheck;
handle['/login'] = requestHandlers.login;
handle['/queryPersonnelList'] = requestHandlers.queryPersonnelList;
handle['/changePersonnelList'] = requestHandlers.changePersonnelList;

server.start(router.route, handle);