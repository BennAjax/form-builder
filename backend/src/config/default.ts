const appName = 'Form-Builder-Api';

const config = {
  applicationName: appName,
  port: process.env.PORT as string,
  mongodb: {
    dsn: process.env.MONGODB_URI as string,
    options: {
      dbName: 'form-builder',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

export default config;
