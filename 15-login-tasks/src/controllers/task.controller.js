import Task from '../models/task.model.js'

export async function getTaks(req, res) {
  const tasks = await Task.find({
    user: req.id,
  }).populate('user')
  res.json(tasks)
}
export async function createTask(req, res) {
  const { title, description, date } = req.body
  const newTask = new Task({
    title,
    description,
    date,
    user: req.id,
  })

  const saveTask = await newTask.save()

  res.json(saveTask)
}

export async function getTak(req, res) {
  const task = await Task.findById(req.params.id)

  if (!task) return res.status(404).json({ message: 'task not found' })

  res.json(task)
}
export async function updateTaks(req, res) {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  if (!task) return res.status(404).json({ message: 'task not found' })

  res.json(task)
}
export async function deleteTaks(req, res) {
  const task = await Task.findByIdAndDelete(req.params.id)

  if (!task) return res.status(404).json({ message: 'task not found' })

  res.json(task)
}
