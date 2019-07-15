const dev = {
  apiGateway: {
    REGION: 'REGION',
    URL: 'API_URL'
  },
  cognito: {
    REGION: 'REGION',
    USER_POOL_ID: 'USER_POOL_ID',
    APP_CLIENT_ID: 'APP_CLIENT_ID',
    IDENTITY_POOL_ID: 'IDENTITY_POOL_ID'
  }
};

const prod = {
  apiGateway: {
    REGION: 'REGION',
    URL: 'API_URL'
  },
  cognito: {
    REGION: 'REGION',
    USER_POOL_ID: 'U_POOL_ID',
    APP_CLIENT_ID: 'APP_CLIENT_ID',
    IDENTITY_POOL_ID:
      'ID_POOL_ID'
  }
};
// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;
