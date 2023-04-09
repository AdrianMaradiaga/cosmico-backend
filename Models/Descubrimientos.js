const mongoose =  require('mongoose'); 
const mongoosePaginate = require('mongoose-paginate-v2');

//Esquema con los atributos necesarios
const schema = new mongoose.Schema({
    Titulo: { type: String},
    Fecha: { type: String},
    Descubridor: { type: String},
    Ubicacion: { type: String},
    Tipo: { type: String},
    Descripcion: { type: String},
    Imagen: String,
    RutaImg: String
});

schema.plugin(mongoosePaginate);


const Descubrimientos = mongoose.model('Descubrimientos', schema);

module.exports = Descubrimientos;

