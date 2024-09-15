const cors = require("cors")
const express = require("express")

const artifactRoutes = require("./v1/routes/artifactRoutes")
const characterRoutes = require("./v1/routes/characterRoutes")
const weaponRoutes = require("./v1/routes/weaponRoutes")

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use("/api/v1/artifacts", artifactRoutes)
app.use("/api/v1/characters", characterRoutes)
app.use("/api/v1/weapons", weaponRoutes)

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`)
})

module.exports = app