import {getEntity, getEntities, getRelatedEntities, createEntity, updateEntity, deleteEntity} from '../utils/dynamo_adapter' 

const postTable = process.env.Posts_Table;

const post = [
  'id',
  'post',
  'createdAt',
  'userId',
  'comments' // ids
];

export async function createPost({payload}) {
  console.log('--- createPost', payload);
  return createEntity(postTable, payload);
}

export async function updatePost({payload}) {
  return updateEntity(postTable, payload);
}

export async function getPosts(args) {
  const {userId, attributesToGet = post, limit = 200} = args ? args : {};
  console.log('--- getPosts', args, userId, limit);
  return userId ? getRelatedEntities('userId', [userId], postTable, attributesToGet) :
    getEntities(postTable, attributesToGet).then((res = []) => res
      .sort((a, b) => b.createdAt - a.createdAt)
      .splice(0, limit));
}

export async function getPost({payload: {id}, attributesToGet = post}) {
  return getEntity(postTable, id, attributesToGet);
}

export async function deletePost({payload: {id}}) {
  return deleteEntity(postTable, id);
}
