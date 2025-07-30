import { boot } from 'quasar/wrappers';
import { Amplify } from 'aws-amplify';
import { getCurrentUser, signOut, signUp, signIn, confirmSignUp } from 'aws-amplify/auth';
import config from './../amplifyconfiguration.json';

Amplify.configure(config);

export default boot(({ app }) => {
  const Aws = {
    getCurrentUser,
    signOut,
    signUp,
    signIn,
    confirmSignUp,
  };
  app.provide('Amplify', Aws);
});
