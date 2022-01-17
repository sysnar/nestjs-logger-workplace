import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';

export function getWinstonOptions(moduleName: string, nodeEnv) {
  const isLocalEnv = ['local', 'test', undefined].includes(nodeEnv);
  const transportsOption: (
    | transports.ConsoleTransportInstance
    | transports.FileTransportInstance
  )[] = [
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
      format: getLocalFormat(moduleName),
    }),
  ];

  if (!isLocalEnv) {
    transportsOption.push(
      new transports.File({
        dirname: 'log/error/',
        filename: 'error.log',
        level: 'error',
        format: getProductionFormat(moduleName),
      }),
      new transports.File({
        dirname: 'log/info/',
        filename: 'info.log',
        level: 'info',
        format: getProductionFormat(moduleName),
      }),
    );
  }

  return {
    transports: transportsOption,
  };
}

function getLocalFormat(moduleName: string) {
  return format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    nestWinstonModuleUtilities.format.nestLike(moduleName, {
      prettyPrint: true,
    }),
  );
}

function getProductionFormat(moduleName: string) {
  return format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    nestWinstonModuleUtilities.format.nestLike(moduleName, {
      prettyPrint: true,
    }),
    format.json(),
  );
}
