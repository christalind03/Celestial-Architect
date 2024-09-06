const express = require("express")
const router = express.Router()

const artifactController = require("../controllers/artifactController")

router.get("/", artifactController.getArtifacts)
router.get("/:id", artifactController.getArtifactByID)

module.exports = router