const express = require('express');
const app = express();
app.use(express.json());
let user = {};

app.get('/user', (req, res) => {
    res.send(user);
})

app.post('/user', (req, res) => {
    console.log(req.body.Name);
    //then i can put this in db 
    user = req.body;
    res.json({
        message: "Data received successfully",
        user: req.body
    });
});

app.patch('/user', (req, res) => {
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        user[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated succesfully"
    })
});

app.delete('/user', (req, res) => {
    user = {};
    res.json({
        msg: "user has been deleted"
    });
})





app.listen(5000);