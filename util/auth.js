const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

const SECRET_KEY = 'Cosmico-Backend';
exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).send('El token es necesario para esta operacion');
        return;
    }

    const [type, token] = authHeader.split(' ');

    if(type != 'Bearer'){
        res.status(401).send('Tipo de autorizacion no valida');
        return;
    }
    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).send("Token invalido ");
        return
    }
}

exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si se proporcionan el email y la contraseña
        if (!email || !password) {
            return res.status(400).json({ message: "El email y la contraseña son obligatorios." });
        }

        // Verificar si el email ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El email proporcionado ya está registrado." });
        }

        // Crear un nuevo usuario
        const user = new User({ email, password });
        const savedUser = await user.save();

        // Generar un token de autenticación
        const payload = { id: savedUser.id, email: savedUser.email };
        const token = jwt.sign(payload, SECRET_KEY);

        // Enviar respuesta exitosa al cliente
        res.status(201).json({ user: savedUser, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Hubo un error al registrar el usuario." });
    }
};


exports.login = async(req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email
        });

        if(!user){
            res.status(401).send("Email o password incorrecta");
            return;
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            res.status(401).send("Email o password incorrecta");
        }else{
            const payload = {id: user.id, email: user.email};
            const token = jwt.sign(payload, SECRET_KEY);
            res.json({user, token});
        }

    }catch(err){
        console.log(err);
        res.status(500).send("login: Hubo un error cosmico: " + err);
    }
}
