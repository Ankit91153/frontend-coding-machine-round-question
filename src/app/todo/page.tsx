"use client";
import { useState } from "react";

interface ITodoList {
  id: number;
  title: string;
  completed: boolean;
}

const Todo = () => {
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [title, setTitle] = useState("");

  const handleAddTask = () => {
    if (title.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    setTodoList((prev) => [newTask, ...prev]);
    setTitle("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📝 Todo List
        </h2>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a new todo..."
            name="todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200"
          >
            Add
          </button>
        </div>

        {/* Todo List Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Todos List
          </h3>
          {todoList.length === 0 ? (
            <h3 className="text-center text-gray-500 italic">
              No List Item Found 😴
            </h3>
          ) : (
            <ShowTodoList todoList={todoList} setTodoList={setTodoList} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Todo;

interface IShowTodoListProps {
  todoList: ITodoList[];
  setTodoList: React.Dispatch<React.SetStateAction<ITodoList[]>>;
}

const ShowTodoList: React.FC<IShowTodoListProps> = ({
  todoList,
  setTodoList,
}) => {
  const changeHandler = (completedId: number) => {
    setTodoList((prev) =>
      prev.map((list) =>
        list.id === completedId
          ? { ...list, completed: !list.completed }
          : list
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodoList((prev) => prev.filter((list) => list.id !== id));
  };

  return (
    <div className="space-y-3">
      {todoList.map((list) => {
        return (
          <div
            key={list?.id}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={list.completed}
                onChange={() => changeHandler(list.id)}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-400"
              />
              <span
                className={`text-gray-800 ${
                  list.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {list?.title}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(list?.id)}
              className="text-red-500 hover:text-red-600 font-medium transition-all duration-200"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};
