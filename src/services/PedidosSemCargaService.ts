import OracleDB from "oracledb";
import { dbConection } from "../database/dbConection";



class PedidosSemCargaService{



async execute(oc:string) {
    
    try {
       
        const bd = new dbConection();

        const connection = await bd.conectar();



          const options = {
            autoCommit: true,
            extendedMetaData: false,
            outFormat: OracleDB.OUT_FORMAT_OBJECT,
            bindDefs: {
              a: { type: OracleDB.NUMBER }
            }
          };



    let sql = `SELECT CAB.NUNOTA
    , CAB.ORDEMCARGA
    , CAB.NUMNOTA
    , CAB.VLRNOTA
    , CAB.CODPARC
    , PAR.RAZAOSOCIAL
    , CID.NOMECID
    , UFS.UF
    , PAR.LATITUDE
    , PAR.LONGITUDE
    , CAB.PESOBRUTO
    , CAB.M3
    , CAB.CODTIPOPER
    , TOP.DESCROPER
    , CAB.CODTIPVENDA
    , TPV.DESCRTIPVENDA FROM TGFCAB CAB 
    INNER JOIN TGFPAR PAR ON PAR.CODPARC = CAB.CODPARC
    INNER JOIN TSICID CID ON CID.CODCID = PAR.CODCID
    INNER JOIN TSIUFS UFS ON UFS.CODUF = CID.UF
    INNER JOIN TGFTOP TOP ON TOP.CODTIPOPER = CAB.CODTIPOPER AND TOP.DHALTER = CAB.DHTIPOPER
    INNER JOIN TGFTPV TPV ON TPV.CODTIPVENDA = CAB.CODTIPVENDA AND TPV.DHALTER = CAB.DHTIPVENDA
    WHERE CAB.CODTIPOPER IN (1001,1003,1005,1012,1052)
    AND CAB.PENDENTE = 'S'
    AND ( nvl(CAB.ORDEMCARGA,0) = 0  or CAB.ORDEMCARGA = :param )
    AND TRUNC(DTENTSAI,'MM') = TRUNC(SYSDATE,'MM') order by CAB.ORDEMCARGA desc`;


    const result = await connection.execute(sql,[oc],options);
    
    return result;

}catch(e){
       
    console.error(e);
    return e;
    
    }


}

}


export { PedidosSemCargaService };





