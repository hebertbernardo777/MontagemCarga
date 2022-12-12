import { dbConection } from "../database/dbConection";
import oracledb from 'oracledb';

interface SequenciaRequest {
  seq: string;
  nunota: string;

}


class SetSequenciaService {

  async execute({seq,nunota}:SequenciaRequest) {
  

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
        
        let result = await connection.execute(
          `UPDATE TGFCAB SET SEQCARGA = :seq WHERE nunota = :nunota`,
          [seq, nunota],
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


export { SetSequenciaService };

