const express = require('express');
const mongoose = require('mongoose');
//Need cors to make connection between express and mongoose
const cors = require('cors');
const PORT = 3001;
const UserModel = require('./models/user');
const { findById } = require('./models/user');
const app = express();

app.use(express.json())
app.use(cors());
//Connecting to local database named mern
mongoose.connect("mongodb://localhost:27017/mern", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Inserting data into model from the req from properties
app.post('/insert', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const user = new UserModel({name: name, email: email});
    //inserting into DB
    await user.save().then(result => { console.log(result);}).catch(err => console.log(err));
    //
    res.send(user)
});


//Reading data
app.get('/read', async (req, res) => {
    //Finding array of user objects from backend for displaying to tables on front end. 
    UserModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

//Function to update the user
app.put('/update', async (req, res) => {
    const newName = req.body.newName;
    const id = req.body.id;

    try {
        //Find element with id we want to change
        await UserModel.findById(id, (error, userToUpdate) => {
            //Change element and save
            console.log('userToUpdate.name', userToUpdate.name, typeof userToUpdate.name)
            userToUpdate.name = String(newName);
            userToUpdate.save()
        } )
    }catch(err) {
        console.log(err)
    }
    res.send('updated')
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndDelete(id).exec();
    res.send('Item deleted')
})

app.listen(PORT, () => {
    console.log('You are connected to port', PORT)
})
