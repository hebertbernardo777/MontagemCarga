import { dbConection } from "../database/dbConection";
import oracledb from 'oracledb';

interface OcRequest {
  oc: string;
  nunota: string;

}


class SetCargaService {

  async execute({oc,nunota}:OcRequest) {
  

    const bd = new dbConection();

    const connection = await bd.conectar();

    let options = {
        autoCommit: true,
        // batchErrors: true,  // continue processing even if there are data errors
        bindDefs: [
          { type: oracledb.NUMBER },
          { type: oracledb.NUMBER }
        ]
      };

  
    try {
        console.log('OC :' + oc + ' Pedido :'  + nunota );
        let result = await connection.execute(
          `UPDATE TGFCAB SET ordemcarga = :oc WHERE nunota = :nunota`,
          [oc, nunota],
          options  // commit once for all DML in the script
        );
       
        console.log("Rows updated: " + result.rowsAffected); // 2
        console.log("ROWID of final row updated: " + result.lastRowid);  // only gives one
        console.log(result);
        
        return result;
  
      }
      catch(e){
       
       console.error(e);
       return e;
      
      }
  
  
      }
  
    };


export { SetCargaService };