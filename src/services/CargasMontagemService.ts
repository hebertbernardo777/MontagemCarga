import OracleDB from "oracledb";
import { dbConection } from "../database/dbConection";



class CargasMontagemService{



async execute() {
    
    try {
       
        const bd = new dbConection();

        const connection = await bd.conectar();



          const options = {
            autoCommit: true,
            extendedMetaData: false,
            outFormat: OracleDB.OUT_FORMAT_OBJECT,
          };



    let sql = `SELECT ORDEMCARGA
    , DTINIC
    , DTPREVSAIDA
    , CODPARCTRANSP
    , SITUACAO
    , AD_OBSLOGISTICA
    , ( select count(nunota) from tgfcab where ordemcarga = ORD.ORDEMCARGA ) AS NROPEDIDOS 
    , ( select SUM(VLRNOTA) from tgfcab where ordemcarga = ORD.ORDEMCARGA ) AS VLRCARGA
    FROM TGFORD ORD WHERE ORD.CODEMP = 1 AND ORD.SITUACAO <> 'F' AND ORD.DTINIC >= ADD_MONTHS(SYSDATE,-3)`;


    const result = await connection.execute(sql,[],options);
    
    return result;

}catch(e){
       
    console.error(e);
    return e;
    
    }


}

}


export { CargasMontagemService };





