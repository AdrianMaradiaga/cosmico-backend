const Descubrimientos = require('../Models/Descubrimientos');
const fs = require("fs");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Reemplaza 'uploads/' con la ruta a la carpeta donde quieres guardar los archivos

// Funcion para obtener todos los descubrimientos dentro de de la coleccion "Descubrimientos"
exports.getDescubrimientos = async (req, res) => {
    try{
        const descubrimientos = await Descubrimientos.find();
        res.send(descubrimientos);
    }catch (err){
        console.error("getDescubrimientos: Hubo un error cosmico: ", err);
        res.status(500).send("Error cosmico en servidorr");
    }
};

exports.getDescubrimientosPag = async (req, res) => {
    try{
        const limit = parseInt(req.query.limit,10) || 2;
        const page = parseInt(req.query.page,10) || 1;
        const descubrimientos = await Descubrimientos.paginate({}, { limit, page });
        res.send(descubrimientos);
    }catch (err){
        console.error("getDescubrimientos: Hubo un error cosmico: ", err);
        res.status(500).send("Error cosmico en servidorr");
    }
};

// Funcion para obtener un solo descubrimientos dentro de de la coleccion "Descubrimientos"
exports.getOneDescubrimiento = async (req, res) => {
    try{
        const { id } = req.params;
        const getOneDescubrimiento = await Descubrimientos.findById(id);
        if(getOneDescubrimiento){
            res.status(200).send(getOneDescubrimiento);
        }else{
            res.status(404).send(`No se encontro un Descubrimiento con Id: id`);
        }

    }catch (err){
        console.error("getOneDescubrimiento: Hubo un error cosmico: ", err);
        res.status(500).send("Error cosmico en servidor");
    }
};

// Función para crear nuevas datos dentro de la colección "Descubrimientos"
exports.postDescubrimientos = async (req, res) => {
    try {
        if (!req.body.titulo || !req.body.fecha || !req.body.descubridor || !req.body.ubicacion || !req.body.tipo || !req.body.descripcion || !req.file) {
            return res.status(400).send("Faltan datos importantes");
        }
        const newDescubrimientos = new Descubrimientos({
            Titulo: req.body.titulo,
            Fecha: req.body.fecha,
            Descubridor: req.body.descubridor,
            Ubicacion: req.body.ubicacion,
            Tipo: req.body.tipo,
            Descripcion: req.body.descripcion,
            Imagen: req.file.filename,
            RutaImg: req.file.path
        });

        const savedDescubrimientos = await newDescubrimientos.save();
        res.status(200).send(savedDescubrimientos);
    } catch (err) {
        console.error("postDescubrimientos: Hubo un error cósmico: ", err);
        res.status(500).send("Error cósmico en servidor");
    }
}


// Funcion para actualizar los datos ya creados de la coleccion "Descubrimientos"
exports.updateDescubrimientos = async (req, res) => {
    if (
      !req.body.titulo ||
      !req.body.fecha ||
      !req.body.descubridor ||
      !req.body.ubicacion ||
      !req.body.tipo ||
      !req.body.descripcion
    ) {
      res.status(400).send("Faltan campos obligatorios");
      return;
    }
  
    try {
      const { id } = req.params;
  
      // Obtener el descubrimiento existente
      const descubrimientos = await Descubrimientos.findById(id);
  
      if (!descubrimientos) {
        return res.status(404).send("Descubrimiento no encontrado");
      }
  
      // Crear objeto con los campos a actualizar
      const updateDescubrimientos = {
        Titulo: req.body.titulo,
        Fecha: req.body.fecha,
        Descubridor: req.body.descubridor,
        Ubicacion: req.body.ubicacion,
        Tipo: req.body.tipo,
        Descripcion: req.body.descripcion,
      };
  
      // Verificar si se recibió un nuevo archivo
      if (req.file) {
        updateDescubrimientos.Imagen = req.file.filename;
        updateDescubrimientos.RutaImg = req.file.path;
      } else {
        // Si no se recibió un nuevo archivo, mantener la imagen existente
        updateDescubrimientos.Imagen = descubrimientos.Imagen;
        updateDescubrimientos.RutaImg = descubrimientos.RutaImg;
      }
  
      const updatedDescubrimientos = await Descubrimientos.findByIdAndUpdate(
        id,
        updateDescubrimientos,
        { new: true }
      );
  
      if (updatedDescubrimientos) {
        res.status(200).send(updatedDescubrimientos);
      } else {
        res.status(404).send(`No se encontró un Descubrimiento con Id: ${id}`);
      }
    } catch (err) {
      console.error("updateDescubrimientos: Hubo un error cosmico: ", err);
      res.status(500).send("Error cosmico en servidor");
    }
  };
// Funcion para eliminar los datos ya creados de la coleccion "Descubrimientos"
exports.deleteDescubrimientos = async (req, res) => {
    try {
      const { id } = req.params;
  
      const descubrimiento = await Descubrimientos.findById(id);
  
      if (!descubrimiento) {
        return res.status(404).send(`No se encontró un Descubrimiento con Id: ${id}`);
      }
  
      // Verificar si la imagen existe antes de intentar eliminarla
      if (fs.existsSync(descubrimiento.RutaImg)) {
        fs.unlinkSync(descubrimiento.RutaImg);
      }
  
      const deletedDescubrimientos = await Descubrimientos.findByIdAndDelete(id);
  
      if (deletedDescubrimientos) {
        res.status(200).send(deletedDescubrimientos);
      } else {
        res.status(404).send(`No se encontró un Descubrimiento con Id: ${id}`);
      }
    } catch (err) {
      console.error("deleteDescubrimientos: Hubo un error cosmico: ", err);
      res.status(500).send("Error cosmico en servidor");
    }
  }