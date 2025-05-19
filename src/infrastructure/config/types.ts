import { Dialect } from 'sequelize';

export interface DatabaseInfo {
  name: string;
  host: string;
  port: number;
  user: string;
  pwd: string;
  dialect: Dialect;
  sslRequired: boolean;
}

export interface Config {
  port: string;
  env: string;
  logs: { level: string };
  api: { prefix: string; version: string };
  database: DatabaseInfo;
  allowApiCall: boolean;
  timeZone: string;
}
