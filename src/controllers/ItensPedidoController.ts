import { Request,Response } from "express";
import { ItensPedidoService } from "../services/ItensPedidoService";


class ItensPedidoController{

    async handle(req: Request,res:Response){
        const { nunota } = req.body ;
        console.log('parametros ',req.params);

    

        const itensPedidoService = new ItensPedidoService();

        const itens = await itensPedidoService.execute({
            nunota
        })

        return res.json(itens);

    }


}



export { ItensPedidoController }


