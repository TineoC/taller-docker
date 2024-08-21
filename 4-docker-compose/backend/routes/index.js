const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Todo } = require("../models/todos/todo");

const routes = (app) => {
  const router = express.Router();

  router.post("/todos", (req, res) => {
    const todo = new Todo({
      text: req.body.text,
    });

    todo
      .save()
      .then((result) => {
        const response = {
          id: result._id,
          text: result.text,
        };
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, response);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.get("/", (req, res) => {
    Todo.find({}, { __v: 0 })
      .then((todos) => {
        const todosWithIdAndText = todos.map(todo => ({
          id: todo._id,
          text: todo.text
        }));
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, todosWithIdAndText);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.delete("/todos/:id", (req, res) => {
    Todo.findByIdAndRemove(req.params.id)
      .then((todo) => {
        if (!todo) {
          return serverResponses.sendError(res, messages.NOT_FOUND);
        }
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, todo);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  //it's a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};

module.exports = routes;
