const express = require('express');
const app = express();
const database = require('./db');
var cors = require('cors')




app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {

  res.json({ message: "welcome in our app" })

})
// app.use('/fooddose', routers)

app.use('/users', require('./routes/users'));
app.use('/restaurant', require('./routes/resturants'));
app.use('/categories', require('./routes/categories'));


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
})
