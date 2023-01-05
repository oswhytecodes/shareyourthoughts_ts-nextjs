// import mysql from "serverless-mysql";

// export const DB = mysql({
//   config: {
//     host: process.env.ENDPOINT,
//     database: process.env.DATABASE,
//     user: process.env.USERNAME,
//     password: process.env.PASSWORD,
//   },
// });

// export async function sql_query({ query, values }) {
//   try {
//     const results = await DB.query(query, values);
//     await DB.end();
//     return results;
//   } catch (error) {
//     throw Error(error.message);
//   }
// }
