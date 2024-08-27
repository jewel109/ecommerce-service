import path from 'path';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias'

export function loadEnvVariables(envFilePath: string): { [key: string]: string | undefined } {
  // Load environment variables from the specified file
  dotenv.config({ path: path.resolve(__dirname, envFilePath), debug: true });

  // Return all loaded environment variables
  return process.env;
}


export const modAlias = () => {

  return moduleAlias.addAlias("@src", __dirname + "../../src")

}


const { DB_USER_NAME, JWT_SECRET, DB_NAME, DB_USER_PASS, PORT, URI } = loadEnvVariables("../config/dev.env")

export const dbUserName = DB_USER_NAME
export const dbName = DB_NAME
export const dbPass = DB_USER_PASS
export const port = PORT
export const url = String(URI)
export const jwtSecret = String(JWT_SECRET)

