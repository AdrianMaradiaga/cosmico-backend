const express = require('express'); 
const mongoose =  require('mongoose');
const DescubrimientosRoutes = require('./Routes/DescubrimientosRoutes');
const AuthRoutes = require('./Routes/AuthRoutes');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/Cosmico', {useNewUrlParser: true})
.then(() => {
    console.log("Conectado a MongoDB");
}).catch((err) => {
    console.log("Error cosmico al conectarse a MongoDB", err);
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

DescubrimientosRoutes(app);
AuthRoutes(app);

app.listen(3002, () => {
    console.log("El servidor cosmico ha iniciado en el puerto 3002");
});


