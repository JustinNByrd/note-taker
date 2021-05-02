const express = require("express");
const app = express();

// check for env setting or use 8080
const PORT = parseInt(process.env.PORT) || 8080;

app.use(express.static('./public'));

app.listen(PORT, () => console.log(`Web server listening on port: ${PORT}`));