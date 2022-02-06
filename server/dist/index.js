"use strict";
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static('./static'));
app.listen(8080, () => console.log('Serving at http://localhost:8080!'));
//# sourceMappingURL=index.js.map