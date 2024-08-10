const { executeQuery } = require("../database/connector");

class TaskController {
  async insert(req, res) {
    try {
      const { content } = req.body;
      const { id_user } = req;

      const queryInsert = "INSERT INTO task (id_user, content) VALUES (?, ?)";
      const paramsInsert = [id_user, content];

      await executeQuery(queryInsert, paramsInsert);

      const querySelect = "SELECT * FROM task WHERE id_user = ?";
      const paramsSelect = [id_user];

      const tasks = await executeQuery(querySelect, paramsSelect);

      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ errors: ["Algo deu errado, tente novamente mais tarde."] });
    }
  }

  async select(req, res) {
    try {
      const { search = "" } = req.query;
      const { id_user } = req;

      const searchString = `%${search}%`;

      const querySelect = "SELECT * FROM task WHERE content LIKE ? AND id_user = ?";
      const paramsSelect = [searchString, id_user];

      const tasks = await executeQuery(querySelect, paramsSelect);

      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ errors: ["Algo deu errado, tente novamente mais tarde."] });
    }
  }

  async update(req, res) {
    try {
      const { content, completed, id_task } = req.body;
      const { id_user } = req;

      const queryUpdate = "UPDATE task SET content = ?, completed = ? WHERE id_task = ?";
      const paramsUpdate = [content, completed, id_task];

      await executeQuery(queryUpdate, paramsUpdate);

      const querySelect = "SELECT * FROM task WHERE id_user = ?";
      const paramsSelect = [id_user];

      const tasks = await executeQuery(querySelect, paramsSelect);

      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ errors: ["Algo deu errado, tente novamente mais tarde."] });
    }
  }

  async delete(req, res) {
    try {
      const { id_task } = req.body;
      const { id_user } = req;

      const query = "DELETE FROM task WHERE id_task = ?";
      const params = [id_task];

      await executeQuery(query, params);

      const querySelect = "SELECT * FROM task WHERE id_user = ?";
      const paramsSelect = [id_user];

      const tasks = await executeQuery(querySelect, paramsSelect);

      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ errors: ["Algo deu errado, tente novamente mais tarde."] });
    }
  }
}

module.exports = new TaskController();
