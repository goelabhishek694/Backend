const express = require('express');
const app = express();
app.use(express.json());
let user = [
  {
    id: 1,
    name: "Abhishek",
    age: 100,
  },
  {
    id: 2,
    name: "Rajat",
    age: 10,
  },
  {
    id: 3,
    name: "Sunjyot",
    age: 50,
  },
];
//with query
app.get('/user', (req, res) => {
    console.log(req.query);
    let { name, age } = req.query;
    let filteredData=user.filter(userObj => {
        return (userObj.name==name && userObj.age==age)
    })
    res.send(filteredData);
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

//params
app.get('/user/:name', (req, res) => {
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", "obj": req.params });
});





app.listen(5000);