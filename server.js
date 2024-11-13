const express = require('express')
const fs = require('fs')

const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/register',(req, res) => {
    res.render('register');
  })

  app.post('/users',(req, res) => {
    const { username, email, phone } = req.body;

    fs.readFile("data.json", "utf-8", (err, data) => {
      let users = [];
      if (data) {
        users = JSON.parse(data);
      }

      const user = {
        username,
        email,
        phone,
        id: users.length + 1
      };

      users.push(user);

      fs.writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.send("Error saving user data");
        }

        // res.render("dashboard", { users });
        res.redirect('/dashboard');
      });
    });
  });

app.get('/dashboard', (req, res) => {

  fs.readFile("data.json", "utf-8", (err, data) => {
    const users = JSON.parse(data)
    res.render("dashboard", { users });
  });
});

app.get("/users/:id", (req,res) => {
    fs.readFile("data.json", "utf-8", (err,data) => {
        const users = JSON.parse(data)
        const user = users.find((user) => user.id === parseInt(req.params.id))  

        res.render("profile", { user })
    })
   })
  

   app.patch("/users/:id", (req, res) => {
    const { username, email, phone } = req.body
  
    fs.readFile("data.json", "utf-8", (err, data) => {
        const paramsId = parseInt(req.params.id, 10)

      const users = JSON.parse(data)
      const user = users.find((user) => user.id === paramsId)
  
      const updatedUsers = users.map((user) => {
        if (user.id === paramsId) {
          return { ...user, username, email, phone }
        }
  
        return user
      })
  
      fs.writeFile("data.json", JSON.stringify(updatedUsers, null, 2), (err) => {
        if (err) {
            res.send("Error updating user data")
        }
        res.redirect('/dashboard')
      })
    })
  })

  app.delete("/users/:id", (req, res) => {
    fs.readFile("data.json", "utf-8", (err, data) => {
      const paramsId = parseInt(req.params.id, 10)

      const users = JSON.parse(data)
      const updatedUsers = users.filter((user) => user.id !== paramsId )
  
      fs.writeFile("data.json", JSON.stringify(updatedUsers, null, 2), (err) => {
        if (err) {
            res.send("Error deleting user data")
        }
        res.redirect('/dashboard')
      })
    })
  })

app.listen(3000, () => {
    console.log("server started at PORT 3000")
})