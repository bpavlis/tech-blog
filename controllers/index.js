const router = require("express").Router()

// Import all api route files here
const userApiRoutes = require("./api/user-routes")
const commentApiRoutes = require("./api/comment-routes")
const blogpostApiRoutes = require("./api/blogpost-routes")

// Import all html route files here
const dashboardHtmlRoutes = require("./dashboard-routes")
const homepageHtmlRoutes = require("./homepage-routes")



// Add api routes to the router
router.use("/api/user", userApiRoutes);
router.use("/api/comment", commentApiRoutes);
router.use("/api/blogpost", blogpostApiRoutes);



// Add html routes to the router
router.use("/dashboard", dashboardHtmlRoutes);
router.use("/", homepageHtmlRoutes);



module.exports = router;