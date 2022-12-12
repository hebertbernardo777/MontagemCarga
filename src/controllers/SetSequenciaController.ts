import { Request,Response } from "express";
import { SetSequenciaService } from '../services/SetSequenciaService'



class SetSequenciaController{


async handle(req:Request,res:Response){


    const setSequenciaService = new SetSequenciaService();

    const {seq,nunota} = req.body; 

    const pedidos = await setSequenciaService.execute({seq,nunota});

    return res.json(pedidos);

    }


}


export { SetSequenciaController }