const express = require("express");
const routes = require("./routes");
//const routes = require("./routes");
// Import the library:
//var cors = require("cors");

const app = express();

// app.use(morgan("combined"));

// app.use(cors());
// app.use(express.json());
// app.use(routes);

app.use(express.json());
app.use(routes)
app.listen(3000);
