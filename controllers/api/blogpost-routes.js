const router = require('express').Router();
const { User, Comment, Blogpost } = require('../../models');

// Get all Blogposts
router.get("/", async (req, res) => {
  try { 
    const payload = await Blogpost.findAll();
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})

// Get one Blogpost by pk
router.get("/:id", async (req, res) => {
  try { 
    const payload = await Blogpost.findByPk(req.params.id);
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})

// Create a new Blogpost
router.post("/", async (req, res) => {
  try { 
    const payload = await Blogpost.create(req.body);
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})

// Update a Blogpost
router.put("/:id", async (req, res) => {
  try { 
    const payload = await Blogpost.update(
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


// Delete a Blogpost
router.delete("/:id", async (req, res) => {
  try { 
    const payload = await Blogpost.destroy({
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