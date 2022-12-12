import { Request,Response } from "express";
import { SetCargaService } from "../services/SetCargaService";


class SetCargaController{

    async handle(req: Request,res:Response){
        const { oc ,nunota } = req.body ;

        const setCargaService = new SetCargaService();

        const ordemCarga = await setCargaService.execute({
            oc,
            nunota
        })

        return res.json(ordemCarga);

    }


}
 

export { SetCargaController }


