const express = require('express')
const jwt = require('jsonwebtoken');
const app = express()

const port = 3000

const SECRET_KEY ="CODEB";
DATABASE_LOGIN = {}
DATABASE_TODO = []

app.use(express.json());

function authToken(req, res, next) {
    const token = req.headers.auth;
    try{
        const decode = jwt.verify(token, SECRET_KEY);      
        req.decodedToken = decode;
        next();
    }catch(err){
        res.status(401).send("Invalid Token")
    }
}


app.post('/register',(req,res)=>{
    if (DATABASE_LOGIN.hasOwnProperty(req.body.username)) {
        return res.status(400).send("Username already exists");
    }
    DATABASE_LOGIN[req.body.username] = req.body.password;
    res.send("Registered successfully");
    console.log(DATABASE_LOGIN);
});

app.post('/login',(req,res)=>{
    if (DATABASE_LOGIN.hasOwnProperty(req.body.username)) {
        if(DATABASE_LOGIN[req.body.username] === req.body.password) {
            const uname = req.body.username;
            const token = jwt.sign({ uname }, SECRET_KEY);
            res.json({ token });
            console.log("PassVerifired")
        } else {
            res.status(401).send("Invalid password");
        }
    } else {
        res.status(401).send("Invalid credentials");
    }
});

app.post('/crateTodo',authToken,(req,res)=>{
    const id = Date.now();
    const username =  req.decodedToken.uname;
    const description = req.body.desc;
    const todo = {
        id,
        username,
        description
    };
    DATABASE_TODO.push(todo);
    res.send("Todo created successfully");
    console.log(DATABASE_TODO);

})
app.post('/showTodo',authToken,(req,res)=>{
    const userName = req.decodedToken.uname;
    
    const userTodos = DATABASE_TODO.filter(todo => todo.username === userName);
    //this is arrow function which is used to filterout todo and get todo from username todo => todo.username === userName
    //filter(): This method creates a new array with all elements that pass the test implemented by the provided function
    
    res.json(userTodos);
})
app.post('/deleteTodo',authToken,(req,res)=>{

    const userName = req.decodedToken.uname;
    
    const newTodos = DATABASE_TODO.filter(todo => {
        return !(todo.id === req.body.id && todo.username === userName);
    });
    
    if (newTodos.length === DATABASE_TODO.length) {
        return res.status(404).send("Todo id not found.");
    }

    console.log(newTodos)

    DATABASE_TODO = newTodos;
    res.send("Todo deleted successfully");
})
app.post('/updateTodo',authToken,(req,res)=>{
    const username = req.decodedToken.uname;
    const id = req.body.id;
    const description = req.body.desc;

    const updatedTodos = DATABASE_TODO.map(todo => {
        if (todo.id === id && todo.username === username) {
            return {
                id,
                username,
                description
            };
        } else {
            return todo;
        }
    });

    const isUpdated = updatedTodos.some(todo => todo.id === id && todo.username === username);

    if (!isUpdated) {
        return res.status(404).send("Todo id not found.");
    }
    DATABASE_TODO = updatedTodos;
    res.send("Todo updated successfully");
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})