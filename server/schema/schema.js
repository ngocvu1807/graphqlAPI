const graphql = require('graphql');
const _ = require('lodash');
const Todo = require('../models/todo');

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
    name: { type: GraphQLString }
  })
});

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
          return Todo.find({ isDone: false });
        } else if (args.filter === 'showCompleted') {
          return Todo.find({ isDone: true });
        } else if (args.filter === 'showAll') {
          return Todo.find({});
        } else {
          console.log(err);
        }
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
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
          name: args.name
        });
        return todo.save();
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
    }
  }
});
// delete and add worked
// updateText Todo worked
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
