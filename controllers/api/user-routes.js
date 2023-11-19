const router = require('express').Router();
const { User, Comment, Blogpost } = require('../../models');

// Get all Users
router.get("/", async (req, res) => {
  try { 
    const payload = await User.findAll();
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})

// Get one User by pk
router.get("/:id", async (req, res) => {
  try { 
    const payload = await User.findByPk(req.params.id);
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})

// Create a new User
router.post("/", async (req, res) => {
  try { 
    const payload = await User.create(req.body);
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})

// Update a User
router.put("/:id", async (req, res) => {
  try { 
    const payload = await User.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})


// Delete a User
router.delete("/:id", async (req, res) => {
  try { 
    const payload = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})











// THIS IS THE LOGOUT
router.post("/logout", (req, res) => {
  console.log("hello!!!")
  try {
    req.session.destroy(() => res.status(204).json({status: "destroyed req.session"}))
    console.log(req.session)

  } catch (err) {
    res.status(404).json({ status: "error", payload: err.message })
  }
})

// THIS IS THE LOGIN
router.post("/login", async (req, res) => {
  console.log("hello!!!")
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      }
    })
    // email doesnt match our database
    if(!userData) {
      res.status(400).json({message: "Incorrect Username or Password"});
      return
    }
    console.log(userData)
    const pwIsCorrect = userData.checkPassword(req.body.password)
    if(!pwIsCorrect){
      res.status(400).json({message: "Incorrect Username or Password"});
      return
    }
    req.session.save(() => {
      // req.session is an object and We can place whatever we need in it.
        req.session.user_id = userData.id
        req.session.user_email = userData.email
        req.session.loggedIn = true
        // making a copy of req.session as it already exists 
        res.json({ status: 'success', msg: 'Congrats you are signed IN' })
      }     
      )
    } catch (err) {
      res.status(404).json({ status: "error", payload: err.message })
    }
})
  
  
// THIS IS A SIGNUP
router.post("/signup", async (req, res) => {
  try{
    const newUser = await User.create(req.body)
    console.log(newUser)

    // const realUserData = newUser.get({ plain: true })
    // console.log(realUserData)
    // save email and password info
    req.session.save(() => {
      // req.session is an object and We can place whatever we need in it.
        req.session.loggedIn = true;
        req.session.user_id = newUser.id;
        req.session.user_email = newUser.email;
        
        console.log(req.session)     
        // making a copy of req.session as it already exists 
        res.status(200).json({ status: 'success', msg: 'Congrats you are signed up' })
      }
    )
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message})
  }
})

module.exports = router;