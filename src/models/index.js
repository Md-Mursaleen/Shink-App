// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ShinkUser, UserMessages } = initSchema(schema);

export {
  ShinkUser,
  UserMessages
};