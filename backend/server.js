const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gameRoutes = require('./routes/game');
const path = require('path')

const currentDir= path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
MONGO_URI="mongodb+srv://db-user:@db-user@cluster0.co30sro.mongodb.net/guessGame-db?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URI, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useCreateIndex: true, 
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connected'));

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