import { AppSettings } from '~/lib';

const credentials = () => {
  const url = new URL(AppSettings.get('DATABASE_URL') as string);

  return {
    database: url.pathname.slice(1),
    host: url.hostname,
    password: url.password,
    port: Number(url.port),
    ssl: {
      ca: AppSettings.get('DATABASE_CA_CERT'),
      rejectUnauthorized: true
    },
    user: url.username
  };
};

export default credentials;
