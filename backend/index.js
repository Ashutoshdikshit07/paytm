const express = require("express")
const mainRouter  = require("./routes/index")
port =3000
const app = express();

app.use("/api/v1",mainRouter)


app.listen(port)

