import { Request,Response } from "express";
import { PedidosSemCargaService } from "../services/PedidosSemCargaService";



class PedidosSemCargaController{


async handle(req:Request,res:Response){
    
    console.log(req.params.oc)
    const pedidosSemCargaService = new PedidosSemCargaService();

    const pedidos = await pedidosSemCargaService.execute(req.params.oc);

    return res.json(pedidos);

    }


}


export { PedidosSemCargaController }