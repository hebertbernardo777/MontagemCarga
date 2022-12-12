import { dbConection } from "../database/dbConection";
import oracledb from 'oracledb';
import OracleDB from "oracledb";


interface ItemRequest{
    nunota: string;
}


class ItensPedidoService{


async execute(nunota:ItemRequest){
   
   
    try {
       
        const bd = new dbConection();

        const connection = await bd.conectar();



          const options = {
            autoCommit: true,
            extendedMetaData: false,
            outFormat: OracleDB.OUT_FORMAT_OBJECT,
            bindDefs: {
              a: { type: oracledb.NUMBER }
            }
          };
        
        

          

          const result = await connection.execute(
            // The statement to execute
            `SELECT ITE.NUNOTA
            , ITE.SEQUENCIA
            , ITE.CODPROD
            , PRO.DESCRPROD
            , ITE.QTDNEG
            , ITE.CODVOL
            , ITE.VLRUNIT
            , ITE.VLRTOT
            , PRO.PESOLIQ
            , PRO.PESOLIQ*ITE.QTDNEG AS PESOLIQTOT
            FROM TGFITE ITE
            INNER JOIN TGFPRO PRO ON PRO.CODPROD = ITE.CODPROD WHERE ITE.NUNOTA = :param`,
      
            // The "bind value" 3 for the bind variable ":idbv"
            [nunota.nunota],options);
      
          console.log(result.metaData); // [ { name: 'FARMER' }, { name: 'PICKED' }, { name: 'RIPENESS' } ]
          console.log(result.rows);     // [ [ 'Mindy', 2019-07-16T03:30:00.000Z, 'More Yellow than Green' ] ]

return result;


  
      }
      catch(e){
       
       console.error(e);
       return e;
      
      }
  
  
      

    }

}




export { ItensPedidoService } 



