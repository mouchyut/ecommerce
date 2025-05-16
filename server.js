// Step 1: Imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const { readdirSync } = require('fs'); 

// cors allow client communicate with serve
const cors=require('cors');
// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
// Step 3: Router
readdirSync('./routes').map((item) => {
  const route = require(`./routes/${item}`);
  app.use('/api', route);
});


// Step 2: Start Server
app.listen(5000, () => console.log(`Server is running on port 5000`));
