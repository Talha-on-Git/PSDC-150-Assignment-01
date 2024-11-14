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

// PRODUCT SERVER CODE -----------------------------------------------------------------

app.get('/addProduct',(req, res) => {
  res.render('addProduct');
})

app.post('/products',(req, res) => {
  const { productName, price } = req.body;

  fs.readFile("product.json", "utf-8", (err, data) => {
    let products = [];
    if (data) {
      products = JSON.parse(data);
    }

    const product = {
      productName,
      price,
      id: products.length + 1
    };

    products.push(product);

    fs.writeFile("product.json", JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return res.send("Error saving product");
      }

      // res.render("dashboard", { users });
      res.redirect('/productdashboard');
    });
  });
});

app.get('/productdashboard', (req, res) => {

fs.readFile("product.json", "utf-8", (err, data) => {
  const products = JSON.parse(data)
  res.render("productdashboard", { products });
});
});

app.get("/products/:id", (req,res) => {
  fs.readFile("product.json", "utf-8", (err,data) => {
      const products = JSON.parse(data)
      const product = products.find((product) => product.id === parseInt(req.params.id))  

      res.render("productDetails", { product })
  })
 })


 app.patch("/products/:id", (req, res) => {
  const { productName, price } = req.body;

  
  fs.readFile("product.json", "utf-8", (err, data) => {
      const paramsId = parseInt(req.params.id, 10)

    const products = JSON.parse(data)
    const product = products.find((product) => product.id === paramsId)

    const updatedProduct = products.map((product) => {
      if (product.id === paramsId) {
        return { ...product, productName, price }
      }

      return product
    })

    fs.writeFile("product.json", JSON.stringify(updatedProduct, null, 2), (err) => {
      if (err) {
          res.send("Error updating user data")
      }
      res.redirect('/productdashboard')
    })
  })
})

app.delete("/products/:id", (req, res) => {
  fs.readFile("product.json", "utf-8", (err, data) => {
    const paramsId = parseInt(req.params.id, 10)

    const products = JSON.parse(data)
    const updatedProduct = products.filter((product) => product.id !== paramsId )

    fs.writeFile("product.json", JSON.stringify(updatedProduct, null, 2), (err) => {
      if (err) {
          res.send("Error deleting user data")
      }
      res.redirect('/productdashboard')
    })
  })
})

// USERS API CODE-----------------------------------------------------------------

// app.get('/register',(req, res) => {
//   res.render('register');
// })

app.get('/api/users', (req, res) => {

  fs.readFile("data.json", "utf-8", (err, data) => {
    const users = JSON.parse(data)
    res.send( users );
  });
});

app.get("/api/users/:id", (req,res) => {
  fs.readFile("data.json", "utf-8", (err,data) => {
      const users = JSON.parse(data)
      const user = users.find((user) => user.id === parseInt(req.params.id))  

      res.send(user)
  })
 })

app.post('/api/users',(req, res) => {
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

      res.send( users );
      // res.redirect('/dashboard');
    });
  });
});

 app.patch("/api/users/:id", (req, res) => {
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
      res.send( users );
    })
  })
})

app.delete("/api/users/:id", (req, res) => {
  fs.readFile("data.json", "utf-8", (err, data) => {
    const paramsId = parseInt(req.params.id, 10)

    const users = JSON.parse(data)
    const updatedUsers = users.filter((user) => user.id !== paramsId )

    fs.writeFile("data.json", JSON.stringify(updatedUsers, null, 2), (err) => {
      if (err) {
          res.send("Error deleting user data")
      }
      res.send( users );
    })
  })
})

//PRODUCTS API CODE-----------------------------------------------------------------

// app.get('/addProduct',(req, res) => {
//   res.render('addProduct');
// })

 app.get('/api/products', (req, res) => {

  fs.readFile("product.json", "utf-8", (err, data) => {
    const products = JSON.parse(data)
    res.send(products);
  });
  });

  app.get("/api/products/:id", (req,res) => {
    fs.readFile("product.json", "utf-8", (err,data) => {
        const products = JSON.parse(data)
        const product = products.find((product) => product.id === parseInt(req.params.id))  
  
        res.send(product)
    })
   })

app.post('/api/products',(req, res) => {
  const { productName, price } = req.body;

  fs.readFile("product.json", "utf-8", (err, data) => {
    let products = [];
    if (data) {
      products = JSON.parse(data);
    }

    const product = {
      productName,
      price,
      id: products.length + 1
    };

    products.push(product);

    fs.writeFile("product.json", JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return res.send("Error saving product");
      }

      res.send( products );
      // res.redirect('/productdashboard');
    });
  });
});

 app.patch("/api/products/:id", (req, res) => {
  const { productName, price } = req.body;

  
  fs.readFile("product.json", "utf-8", (err, data) => {
      const paramsId = parseInt(req.params.id, 10)

    const products = JSON.parse(data)
    const product = products.find((product) => product.id === paramsId)

    const updatedProduct = products.map((product) => {
      if (product.id === paramsId) {
        return { ...product, productName, price }
      }

      return product
    })

    fs.writeFile("product.json", JSON.stringify(updatedProduct, null, 2), (err) => {
      if (err) {
          res.send("Error updating user data")
      }
      res.send(products)
    })
  })
})

app.delete("/api/products/:id", (req, res) => {
  fs.readFile("product.json", "utf-8", (err, data) => {
    const paramsId = parseInt(req.params.id, 10)

    const products = JSON.parse(data)
    const updatedProduct = products.filter((product) => product.id !== paramsId )

    fs.writeFile("product.json", JSON.stringify(updatedProduct, null, 2), (err) => {
      if (err) {
          res.send("Error deleting user data")
      }
      res.send(products)
    })
  })
})
  

app.listen(3000, () => {
    console.log("server started at PORT 3000")
})