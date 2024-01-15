const express = require('express')
const compression = require('compression')
const cors = require('cors')
const mysql = require("./mysql_connection")
const mongo = require("./mongodb_connection")

const app = express()
const port = 5000


app.use(cors())
app.use(compression())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use("/api",require("./routes/login"));
app.use("/api",require("./routes/signup"));
app.use("/api",require("./routes/updateddoc"))
app.use("/api",require("./routes/getcontent"))

mysql();
mongo();
