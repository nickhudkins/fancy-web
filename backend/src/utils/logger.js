import winston from 'winston';

export default new winston.Logger({
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
    }),
  ],
});
