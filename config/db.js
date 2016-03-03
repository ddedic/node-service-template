const conf = {
  dbName: 'myDb',
  host: 'localhost',
  user: '',
  password: '',
  port: 27017,

  getURI: () => {
    const port = conf.port ? `:${conf.port}` : '';
    const login = conf.user ? `${conf.user}:${conf.password}:@` : '';
    return `mongodb://${login}${conf.host}${port}/${conf.dbName}`;
  },
};

export default conf;
