const app = require('./app.js');
require('./database.js');

app.listen(app.get("port"));

console.log("Server on port", app.get('port'));