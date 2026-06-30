const express = require("express")
const cors = require("cors")
 
const contasRoutes = require("./src/routes/contas")
 
const app = express()
 
app.use(cors())
app.use(express.json())
 
app.use("/contas", contasRoutes)
 
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
 