import { Request,Response } from "express";
import { CargasMontagemService } from "../services/CargasMontagemService";



class CargasMontagemController{


async handle(req:Request,res:Response){


    const cargasMontagemService = new CargasMontagemService();

    const pedidos = await cargasMontagemService.execute();

    return res.json(pedidos);

    }


}


export { CargasMontagemController }