const fs = require('fs');
const express = require('express'); 

const app = express();

const PORT = process.env.PORT || 3000;



app.listen(PORT, function() {
    console.log(`listening on PORT: ${PORT}`);  
});