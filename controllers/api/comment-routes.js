const router = require('express').Router();
const { User, Comment, Blogpost } = require('../../models');

// Get all Comments
router.get("/", async (req, res) => {
  try { 
    const payload = await Comment.findAll();
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})

// Get one Comment by pk
router.get("/:id", async (req, res) => {
  try { 
    const payload = await Comment.findByPk(req.params.id);
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})

// Create a new Comment
router.post("/", async (req, res) => {
  try { 
    const payload = await Comment.create(req.body);
    res.status(200).json({status: "success", payload })
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message })
  }
})

// Update a Comment
router.put("/:id", async (req, res) => {
  try { 
    const payload = await Comment.update(
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


// Delete a Comment
router.delete("/:id", async (req, res) => {
  try { 
    const payload = await Comment.destroy({
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