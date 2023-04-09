const DescubrimientosController = require('../Controllers/DescubrimientosController');
const auth = require('../util/auth');

const upload = require('../middleware/upload')

module.exports = (app) => {
    app.get('/Descubrimientos', DescubrimientosController.getDescubrimientos);
    app.get('/DescubrimientosPag', DescubrimientosController.getDescubrimientosPag);
    app.get('/Descubrimientos/:id', DescubrimientosController.getOneDescubrimiento);
    app.post('/Descubrimientos', auth.authenticate, upload.single('imagen'), DescubrimientosController.postDescubrimientos);
    app.put('/Descubrimientos/:id',  auth.authenticate, upload.single('imagen'),DescubrimientosController.updateDescubrimientos);
    app.delete('/Descubrimientos/:id',  auth.authenticate, DescubrimientosController.deleteDescubrimientos);
}