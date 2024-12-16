"use strict";
const express = require('express');
const app = express();
const port = Process.env.PORT || 3000;
const injectAuthRouters = require('./routers/AuthRouters');
//, inject the routers here
// inject auth routers
injectAuthRouters(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
