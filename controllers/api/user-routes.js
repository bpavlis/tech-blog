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


module.exports = router;