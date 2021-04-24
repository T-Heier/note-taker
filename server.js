// brings in all the npm packages i need

const express = require("express");

// create instance of express and define a port
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`))

