import * as messageService from './service';

export default async action => {
  console.log('--- REDUCER', JSON.stringify(action), action.type);
  switch(action.type) {
    case 'CREATE_POST':
      console.log('********** reducer create message', action);
      return messageService.createPost(action).then(
        message => ({type:'ADD_POST', message})
      );
     case 'UPDATE_POST':
      return messageService.updatePost(action).then(
        message => ({type:'UPDATE_POST', message})
      );
     case 'DELETE_POST':
      return messageService.deletePost(action).then(() => ({...action, remote:false}));
     case 'LIST_POSTS':
      return messageService.getPosts(action).then(
        messages => ({type:'RECEIVE_POSTS', messages})
  ); 
     case 'GET_POST':
      return messageService.getPost(action);
     default:
      return action;
  }
}

