process.env.ORA_SDTZ = 'UTC';
import fs from 'fs';
import oracledb from 'oracledb';


class dbConection{


async conectar() {
    let libPath;

    if (process.platform === 'win32') {           // Windows
      libPath = 'C:\\oracle\\instantclient_19_12';
    } else if (process.platform === 'darwin') {   // macOS
      libPath = process.env.HOME + '/Downloads/instantclient_19_8';
    }
    if (libPath && fs.existsSync(libPath)) {
      oracledb.initOracleClient({ libDir: libPath });
    }
  
  const dbConfig = {
      user          : "sankhya",
      password      : "tecsis",
      connectString : "192.168.0.244/ORCL.maispvc.com.br"
    };


    let connection;

    
    if (!connection) {
      connection = await oracledb.getConnection(dbConfig);
      console.log(connection);
      console.log("teste ok");
      return connection;
    }else {
      return connection;
    }

    

}

}


export { dbConection }