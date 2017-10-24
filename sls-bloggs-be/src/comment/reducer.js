import * as messageService from './service';

export default async action => {
  console.log('--- REDUCER', JSON.stringify(action), action.type);
  switch(action.type) {
    case 'CREATE_COMMENT':
      console.log('********** reducer create message', action);
      return messageService.createComment(action).then(
        message => ({type:'ADD_COMMENT', message})
      );
     case 'UPDATE_COMMENT':
      return messageService.updateComment(action).then(
        message => ({type:'UPDATE_COMMENT', message})
      );
     case 'DELETE_COMMENT':
      return messageService.deleteComment(action).then(() => ({...action, remote:false}));
     case 'LIST_COMMENTS':
      return messageService.getComments(action).then(
        messages => ({type:'RECEIVE_COMMENTS', messages})
  ); 
     case 'GET_COMMENT':
      return messageService.getComment(action);
     default:
      return action;
  }
}

