import sql from "mssql";

const config = {
  user: "sa",
  password: "nikhil",
  server: "LAPTOP-83SSJD6E\\SQLEXPRESS",
  database: "SDS",
  options: {
    instanceName: "SQLEXPRESS",
    trustedConnection: true
  }
};

async function callStoredProcedure(
  procedureName: string,
  params: { name: string; type: any; value: any }[]
) {
  try {
    let pool = new sql.ConnectionPool(config);
    await pool.connect();
    let request = await pool.request();
    if (params != null) {
      params.map(param => {
        request.input(param["name"], param["type"], param["value"]);
      });
    }
    let res = await request.execute(procedureName);

    //atlas
    //console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export const dbMethods = {
  callStoredProcedure
};

export default dbMethods;
