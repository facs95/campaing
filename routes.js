const routes = module.exports = require('next-routes')()

routes
.add('/campaing/new', 'campaing/new')
.add('/campaing/:address', '/campaing/campaing')
.add('/campaing/:address/request','/campaing/requests/request')
.add('/campaing/:address/request/newRequest', '/campaing/requests/newRequest');
