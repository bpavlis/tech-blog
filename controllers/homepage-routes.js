const router = require('express').Router();
const { User, Comment, Blogpost } = require('../models');

router.get ("/", async (req, res) => {
  try {
    const payload = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });
    const blogposts = payload.map((blogpost) => blogpost.get({plain:true}));

    res.render('homepage', {
      blogposts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
});


router.get("/post/:id", async (req, res) => {
  try {
    const payload = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });
    const blogpost = payload.get({plain: true})

    res.render('post', {
      ...blogpost,
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})

//----------
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/')
      return
  } else
  res.render('login')
})

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/')
      return
  } else
  res.render('login')
})

module.exports = router;
