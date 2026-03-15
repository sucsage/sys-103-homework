'use client';
import { ChangeEvent, useState } from "react";

interface TodoInterface {
  id: number;
  task: string;
  time: number;
  isDone: boolean;
}

export default function Home() {

  const [todos, settodos] = useState<TodoInterface[]>([
    { id: 1, task: "Play pingpong", time: 30, isDone: false }, // 0
    { id: 2, task: "Swiming at pool", time: 60, isDone: true }, // 1
    { id: 3, task: "Write this easy homework", time: 130, isDone: false }, // 2 
  ]);

  const [todo, settodo] = useState<TodoInterface>({
    id: 0,
    task: "Play gutair",
    time: 180,
    isDone: false
  })

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    settodo((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="flex flex-col justify-center w-full h-screen items-center">
      <form action="" className="flex flex-col">
        <div>
          <label>
            id
          </label>
          <input
            type="number"
            className="border-2"
            onChange={handleOnchange}
            />
        </div>
        <label>
          task
          <input
            type="text"
            className="border-2"
            onChange={handleOnchange}
            />
        </label>
        <label>
          time
          <input
            type="number"
            className="border-2"
            onChange={handleOnchange}
            />
        </label>
        <label>
          isDone
          <input
            type="checkbox"
            className="border-2" 
            onChange={handleOnchange}
            />
        </label>
        <button type="submit">Submit</button>
      </form>
      {/* <ul>
        {todos.map((item, index) => (
          <li>
            <h1>{item.id}</h1>
            <p>{item.task}</p>
            <p>{item.time}</p>
            <p>{item.isDone}</p> 
          </li>))}
      </ul> */}
    </div>
  );
}
