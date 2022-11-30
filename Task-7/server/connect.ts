import mysql from "mysql";

export const db = mysql.createConnection({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "bedd931c959e69",
  password: "2b3d3e1e",
  database: "heroku_7dc13cc3dded4c0",
});

// mysql://bedd931c959e69:2b3d3e1e@eu-cdbr-west-03.cleardb.net/heroku_7dc13cc3dded4c0?