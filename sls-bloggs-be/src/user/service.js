import { getEntity, getEntities, getRelatedEntities, createEntity, updateEntity, deleteEntity } from '../utils/dynamo_adapter'

const usersTable = process.env.Users_Table;

const userAttrs = [
  'id',
  'userName',
  'createdAt'
];

export function createUser({user}) {
  console.log('--- createUser', user);
  const possibleUser = getRelatedEntities('userName', [user.userName], usersTable, userAttrs).then(users => {
    console.log('--- possibleUser', possibleUser);
    return users && users.length > 0 ? users[0] : createEntity(usersTable, user);
  }
  );

  return possibleUser;
}

export function updateUser({user}) {
  return updateEntity(usersTable, user);
}

export function getUsers({attributesToGet = userAttrs}) {
  return getEntities(usersTable, attributesToGet);
}

export function getUser({id, attributesToGet = userAttrs}) {
  return getEntity(usersTable, id, attributesToGet);
}

export function deleteUser({id}) {
  return deleteEntity(usersTable, id);
}
