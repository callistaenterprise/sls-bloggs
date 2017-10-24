import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const getSchema = adapter => {

  const User = new GraphQLObjectType({
    name: 'User',
    description: 'The user that sends posts',
    fields: () => ({
      id: {type: GraphQLString},
      userName: {type: GraphQLString},
      posts: {
        type: new GraphQLList(Post),
        resolve(source, args) {
          return adapter.getPosts({userId: source.id});
        }
      }
    })
  });

  const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'The post',
    fields: () => ({
      id: {type: GraphQLString},
      post: {type: GraphQLString},
      createdAt: {type: GraphQLString},
      userId: {type: GraphQLString},
      user: {
        type: User,
        resolve(source) {
          return adapter.getUser(source && source.userId && {id: source.userId});
        }
      }
    })
  });

  const Query = new GraphQLObjectType({
    name: 'PostQueries',
    description: 'Root of the Posts Schema',
    fields: () => ({
      users: {
        type: new GraphQLList(User),
        description: 'List of users',
        resolve() {
          return adapter.getUsers({});
        }
      },
      user: {
        type: User,
        description: 'Get User by userName',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(source, args) {
          return adapter.getUser(args && {id: args.id});
        }
      },
      posts: {
        type: new GraphQLList(Post),
        description: 'List of posts',
        args: {
          userId: {type: GraphQLString}
        },
        resolve(source, args) {
          return adapter.getPosts(args && {userId: args.userId});
        }
      },
      post: {
        type: Post,
        description: 'Get post by id',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(source, args) {
          return adapter.getPost(args && {payload: {id: args.id}});
        }
      },
    })
  });

  const Mutuation = new GraphQLObjectType({
    name: 'PostMutations',
    fields: {
      createUser: {
        type: User,
        description: 'Create user',
        args: {
          userName: {type: GraphQLString}
        },
        resolve: function (source, args) {
          return adapter.createUser({user:args});
        }
      },
      updateUser: {
        type: User,
        description: 'Update a user',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)},
          userName: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: function (source, args) {
          return adapter.updateUser({user: args});
        }
      },
      deleteUser: {
        type: User,
        description: 'Delete a user by userName',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: function (source, {id}) {
          return adapter.deleteUser({id});
        }
      },
      createPost: {
        type: Post,
        description: 'Create post',
        args: {
          post: {type: GraphQLString},
          userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: function (source, args) {
          return adapter.createPost({payload: args});
        }
      },
      updatePost: {
        type: Post,
        description: 'Update a post',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)},
          post: {type: new GraphQLNonNull(GraphQLString)},
          userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: function (source, args) {
          return adapter.updatePost({payload: args});
        }
      },
      deletePost: {
        type: Post,
        description: 'Delete a post by id',
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: function (source, {id}) {
          return adapter.deletePost({payload: {id}});
        }
      }

  }});

  const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutuation
  });

  return Schema;
};

export default getSchema;

