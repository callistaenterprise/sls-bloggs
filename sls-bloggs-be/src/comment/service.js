import {getEntity, getEntities, getRelatedEntities, createEntity, updateEntity, deleteEntity} from '../utils/dynamo_adapter' 

const commentTable = process.env.Comments_Table;

const comment = [
  'id',
  'comment',
  'createdAt',
  'postId',
  'userId'
];

export async function createComment({payload}) {
  console.log('--- createComment', payload);
  return createEntity(commentTable, payload);
}

export async function updateComment({payload}) {
  return updateEntity(commentTable, payload);
}

export async function getComments(args) {
  const {userId, attributesToGet = comment, limit = 200} = args ? args : {};
  console.log('--- getComments', args, userId, limit);
  return userId ? getRelatedEntities('userId', [userId], commentTable, attributesToGet) :
    getEntities(commentTable, attributesToGet).then((res = []) => res
      .sort((a, b) => b.createdAt - a.createdAt)
      .splice(0, limit));
}

export async function getComment({payload: {id}, attributesToGet = comment}) {
  return getEntity(commentTable, id, attributesToGet);
}

export async function deleteComment({payload: {id}}) {
  return deleteEntity(commentTable, id);
}
