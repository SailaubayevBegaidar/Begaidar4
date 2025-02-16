import TaskModel from "../models/TaskModel.js";

class TaskController {
    async getAllTasks(req, res) {
        try {
            const tasksList = await TaskModel.find();
            return res.json(tasksList);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }

    async getTaskById(req, res) {
        try {
            const taskItem = await TaskModel.findOne({_id: req.params.id});
            if(!taskItem) {
                return res.status(400).json({message: "Задача не найдена"});
            }
            return res.json(taskItem);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }

    async createTask(req, res) {
        try {
            const { taskName, taskContent } = req.body;
            if (!taskName || !taskContent) {
                return res.status(400).json({ message: "Заполните все поля" });
            }   

            const authorId = req.user?.id;
            if (!authorId) {
                return res.status(401).json({ message: "Пользователь не авторизован" });
            }

            const newTask = new TaskModel({ taskName, taskContent, authorId });
            await newTask.save();
            return res.status(201).json({ message: "Задача создана", newTask });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }

    async updateTask(req, res) {
        try {
            const { taskName, taskContent } = req.body;
            if (!taskName || !taskContent) {
                return res.status(400).json({ message: "Заполните все поля" });
            }   

            const taskItem = await TaskModel.findOne({_id: req.params.id});
            if (!taskItem) {
                return res.status(400).json({ message: "Задача не найдена" });
            }

            const updatedTask = await TaskModel.findByIdAndUpdate(
                req.params.id,
                { taskName, taskContent },
                { new: true }
            );
            return res.json({ message: "Задача обновлена", updatedTask });            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }

    async deleteTask(req, res) {
        try {
            const taskItem = await TaskModel.findOne({_id: req.params.id});
            if (!taskItem) {
                return res.status(400).json({ message: "Задача не найдена" });
            }  
            const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
            return res.json({ message: "Задача удалена", deletedTask });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }
}

export default new TaskController();