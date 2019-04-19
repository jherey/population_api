declare module 'config' {
  export interface ILog {
    label: string;
    level: string;
    filename: string;
  }
  
  export interface IDatabase {
    test: string;
    dev: string;
  }
  
  export interface IConfig {
    env: string;
    port: string;
    logs: ILog;
    db: IDatabase;
  }
}