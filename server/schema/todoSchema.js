// import { UserType, DateType } from './userSchema';

const graphql = require('graphql');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Todo = require('../models/todo');
const Users = require('../models/User');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID },
    isDone: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    creator: {
      type: UserType
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    createdTodo: {
      type: new GraphQLList(TodoType)
    }
  })
});
const user = userId => {
  return Users.findById(userId)
    .then(user => {
      return {
        ...user._doc,
        id: user._id,
        createdTodo: todos.bind(this, user.createdTodo)
      };
    })
    .catch(err => {
      throw err;
    });
};

const todos = todoIds => {
  return Todo.find({ _id: { $in: todoIds } })
    .then(todos => {
      return todos.map(todo => {
        return {
          ...todo._doc,
          id: todo._id,
          creator: user.bind(this, todo.creator)
        };
      });
    })
    .catch(err => {
      throw err;
    });
};
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    todo: {
      // get specific todo task (PASSED)
      type: TodoType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Todo.findById(args.id);
      }
    },
    todos: {
      //GET ALL TODO (passed)
      type: GraphQLList(TodoType),
      args: {
        filter: { type: new GraphQLNonNull(GraphQLString) } // this filter: showAll, showActive, showCompleted
      },
      resolve(parent, args, err) {
        if (args.filter === 'showActive') {
          return Todo.find({ isDone: false })
            .then(todos => {
              return todos.map(todo => {
                return {
                  ...todo._doc,
                  id: todo._id,
                  creator: user.bind(this, todo.creator)
                };
              });
            })
            .catch(err => {
              throw err;
            });
        } else if (args.filter === 'showCompleted') {
          return Todo.find({ isDone: true })
            .then(todos => {
              return todos.map(todo => {
                return {
                  ...todo._doc,
                  id: todo._id,
                  creator: user.bind(this, todo.creator)
                };
              });
            })
            .catch(err => {
              throw err;
            });
        } else if (args.filter === 'showAll') {
          return Todo.find({})
            .then(todos => {
              return todos.map(todo => {
                return {
                  ...todo._doc,
                  id: todo._id,
                  creator: user.bind(this, todo.creator)
                };
              });
            })
            .catch(err => {
              throw err;
            });
        } else {
          console.log(err.message);
        }
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      //add a todo task (PASSED)
      type: TodoType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let todo = new Todo({
          isDone: false,
          name: args.name,
          creator: '5e40c37a729d763c31914fa9'
        });
        let newTodo;
        return todo
          .save()
          .then(result => {
            newTodo = {
              ...result._doc,
              id: result._id,
              creator: user.bind(this, result.creator)
            };
            return Users.findById('5e40c37a729d763c31914fa9');
          })
          .then(user => {
            if (!user) {
              throw new Error('User not found');
            }
            user.createdTodo.push(todo);
            user.save();
            return newTodo;
          })
          .catch(error => {
            throw err;
          });
      }
    },
    deleteTodo: {
      // DELETE A SPECIFIC TASKS (PASSED)
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Todo.findByIdAndDelete(args.id);
      }
    },
    updateTodo: {
      // update a todo text (PASSED)
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, // new GraphqlNonNull force id is required in input
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Todo.findByIdAndUpdate(
          args.id, // findByIdAndUpdate need id value as the first parameter
          { $set: { name: args.name } },
          { new: true } // this make sure the return result is the updated one
        );
      }
    },
    toggleTodo: {
      // TOGGLE A TODO (PASSED)
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        isDone: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args) {
        return Todo.findByIdAndUpdate(
          args.id, // _id is the property from mongodb Schema
          { $set: { isDone: args.isDone } },
          {
            new: true // this make sure the return result is the updated one
          }
        );
      }
    },
    toggleAll: {
      // TOGGLE ALL (PASSED)
      type: TodoType,
      args: {
        isDone: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args) {
        return Todo.updateMany({ $set: { isDone: args.isDone } });
      }
    },
    clearCompletedTodo: {
      // CLEAR ALL COMPLETED TASKS (PASSED)
      type: TodoType,
      args: {
        isDone: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return Todo.deleteMany({ isDone: true });
      }
    },
    registerUser: {
      // add new user
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Users.findOne({ email: args.email })
          .then(user => {
            if (user) {
              throw new Error('user exists');
            }
            return bcrypt.hash(args.password, 12);
          })
          .then(hashPassword => {
            const newUser = new Users({
              email: args.email,
              password: hashPassword
            });
            return newUser.save();
          })
          .then(result => {
            return { ...result._doc, password: null, id: result._id };
          })
          .catch(err => {
            console.log(err.message);
            throw err;
          });
      }
    }
  }
});
// delete and add worked
// updateText Todo worked
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
