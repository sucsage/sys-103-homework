'use client'


import { ChangeEvent, FormEvent, useState } from "react"


type TasksType = { id: number, task: string, time: number, isdone: boolean }


type TasksDetailProps = TasksType & {
  index: number
  deleteTasks: (index: number) => void
  editTasks: (index: number) => void
}


export default function TasksPage() {


  const [Taskss, setTaskss] = useState<TasksType[]>([
    { id: 1, task: "Play pingpong", time: 30, isdone: false },
    { id: 2, task: "Swiming at pool", time: 60, isdone: true },
    { id: 3, task: "Write this easy homework", time: 130, isdone: false },
  ])


  const [form, setForm] = useState<TasksType>({
    id: 0,
    task: '',
    time: 0,
    isdone: false,
  })


  const [editId, setEditId] = useState(-1)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target

    setForm((prev) => (
      { ...prev, [name]: value, isdone: checked }
    ))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (editId === -1) {
      setTaskss([...Taskss,
      { ...form, id: (Taskss.length !== 0) ? Taskss[Taskss.length - 1].id + 1 : 1 }
      ])
    }
    else {
      const tmpTaskss = Taskss.map((Tasks, index) => (index === editId) ? form : Tasks)
      setTaskss([...tmpTaskss])
      // setTaskss( prev => prev.map((Tasks, index) => (index === editId) ? form : Tasks))


      setForm({
        id: 0,
        task: '',
        time: 0,
        isdone: false,
      })
      setEditId(-1)
    }
    console.log(Taskss)
  }


  const deleteTasks = (index: number) => {
    const tmpTaskss = Taskss.filter((_, i) => i !== index)
    setTaskss([...tmpTaskss])
    // setTaskss(prev =>
    //   prev.filter((_, i) => i !== index)
    // )
  }


  const editTasks = (index: number) => {
    setForm(Taskss[index])
    setEditId(index)
  }


  return (<div>
    {/* {JSON.stringify(Taskss)} */}


    {/* <ul className="flex gap-2 flex-wrap">
      {Taskss?.map((Tasks, index) =>
        <li key={index}>
          <TasksDetail
            id={Tasks.id}
            name={Tasks.name}
            age={Tasks.age}
            activity={Tasks.activity}
            index={index}
            deleteTasks={deleteTasks}
            editTasks={editTasks}
          />
        </li>)
      }
    </ul> */}

    <ul className="flex gap-2 flex-wrap">
      {Taskss?.map((Task, index) => (
        <li key={index}>
          <TaskDetail 
            id={Task.id}
            task={Task.task}
            time={Task.time}
            isdone={Task.isdone}
            index={index}
            deleteTasks={deleteTasks}
            editTasks={editTasks}
          />
        </li>
      ))}
    </ul>
    <form action="#"
      className="border-2 p-2 m-2 w-fit"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="name">Task: </label>
      </div>
      <div>
        <input
          className="border-2 p-2"
          type="text" name="task" placeholder="play gamer"
          onChange={handleChange}
          value={form.task}
        />
      </div>
      <div>
        <label htmlFor="age">Time: </label>
      </div>
      <div>
        <input
          className="border-2 p-2"
          type="number" name="time" placeholder="37"
          onChange={handleChange}
          value={form.time}
        />
      </div>
      <div>
        <label htmlFor="activity">isdone: </label>
      </div>
      <div>
        <input
          className="border-2 p-2"
          type="checkbox" name="isdone" placeholder="Swimming"
          checked={form.isdone}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="border-2 p-2 mt-2 rounded">
          {(editId === -1) ? "Add" : "Update"}
        </button>
      </div>
    </form>
  </div>)
}


// function TasksDetail({ id, name, age, activity, index, deleteTasks, editTasks }: TasksDetailProps) {
//   return <div className="border-2 border-amber-900 m-4 p-6 gap-8 max-w-72 relative">
//     <div>{id}</div>
//     <div>Name: {name}</div>
//     <div>Age: {age}</div>
//     <div>Activity: {activity}</div>
//     <button
//       className="absolute top-[-4] right-0 px-2 mt-2 border-2 rounded-xl bg-red-400 text-white"
//       onClick={() => deleteTasks(index!)}
//     >
//       x
//     </button>
//     <button
//       className="border-2 rounded-md bg-green-100 mt-2 px-2"
//       onClick={() => editTasks(index)}
//     >Edit</button>
//   </div>
// }

function TaskDetail({ id, task, time, isdone, index, deleteTasks, editTasks }: TasksDetailProps) {
  return (<>
    <div className="border-2 border-amber-900 m-4 p-6 gap-8 max-w-72 relative">
      <div>{id}</div>
      <div>Task: {task}</div>
      <div>Time: {time}</div>
      <div>isDone {isdone ? "Yes" : "No"}</div>
      <button
        className="absolute top-[-4] right-0 px-2 mt-2 border-2 rounded-xl bg-red-400 text-white"
        onClick={() => deleteTasks(index!)}
      >
        x
      </button>
      <button
        className="border-2 rounded-md bg-green-100 mt-2 px-2"
        onClick={() => editTasks(index)}
      >
        Edit
      </button>
    </div>
  </>)
}