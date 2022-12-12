import { Router,Request,Response} from 'express';
import { SetCargaController } from './controllers/SetCargaController';
import { ItensPedidoController } from './controllers/ItensPedidoController';
import { PedidosSemCargaController } from './controllers/PedidosSemCargaController';
import { SetSequenciaController } from './controllers/SetSequenciaController';
import { CargasMontagemController } from './controllers/CargasMontagemController';




const router = Router();


router.post('/setCarga', new SetCargaController().handle)

router.post('/itens',new ItensPedidoController().handle) 

router.get('/pedidos/:oc', new PedidosSemCargaController().handle)

router.post('/setSequencia', new SetSequenciaController().handle)

router.get('/cargas', new CargasMontagemController().handle)




export { router };