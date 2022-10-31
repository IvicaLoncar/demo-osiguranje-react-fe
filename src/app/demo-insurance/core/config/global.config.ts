import { GlobalConfig } from "../models/global-config.model";

export function getGlobalConfig(): GlobalConfig
{
  return {
    server: "http://localhost:8500"
  };
}
