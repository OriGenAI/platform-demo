const dev = {
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://b5cf0o92of.execute-api.us-east-2.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_GO9oSGHYi',
    APP_CLIENT_ID: '5rbpeadj30kpte6nj7fd30g8jc',
    IDENTITY_POOL_ID: 'us-east-2:d9d912ca-d199-4fd2-8d05-6dd4fc095db2'
  }
};

const prod = {
  s3: {
    REGION: 'us-east-1',
    BUCKET: 'platform-prod-experimentsbucket-1m1y1gkm2f8wu'
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://p39gs63p5i.execute-api.us-east-1.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_wHY8lAm4i',
    APP_CLIENT_ID: '3c0g877kf0pd949v6g8ee81f9s',
    IDENTITY_POOL_ID:
      'arn:aws:cognito-idp:us-east-1:427007943030:userpool/us-east-1_wHY8lAm4i'
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  // Add common config values here
  ...config
};
