const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');
const gameRoutes = require('./routes/game');
const dotenv = require('dotenv') 
dotenv.config()

const path = require('path')

const currentDir= path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
/*const MONGO_URI = process.env.MONGO_URI 

mongoose.connect(MONGO_URI, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useCreateIndex: true, 
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connected'));*/

// Routes
app.use('/api/game', gameRoutes);

//production
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(currentDir,"/frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(currentDir,"frontend","dist","index.html"));
  })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});