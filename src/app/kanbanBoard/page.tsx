"use client";
import React, { useMemo, useState } from "react";

enum TODO_STATUS {
  TODO = "TODO",
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
}

interface ITodo {
  id: string;
  title: string;
  status: TODO_STATUS;
}

const KanbanBoard = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [dragOverCol, setDragOverCol] = useState<TODO_STATUS | null>(null);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTodo: ITodo = {
      id: crypto.randomUUID(),
      title,
      status: TODO_STATUS.TODO,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  const onDragHandler = (e: any, todo: ITodo) => {
    e.dataTransfer.setData("dragTodoId", todo.id);
  };

  const onDragOverHandler = (e: any, status: TODO_STATUS) => {
    e.preventDefault();
    setDragOverCol(status);
  };

  const onDropHandler = (e: any, status: TODO_STATUS) => {
    const dragTodoId = e.dataTransfer.getData("dragTodoId");

    const updated = todos.map((todo) =>
      todo.id === dragTodoId ? { ...todo, status } : todo
    );

    setTodos(updated);
    setDragOverCol(null); // reset glow
  };

  const renderTodos = (items: ITodo[]) => {
    return items.map((todo) => (
      <div
        key={todo.id}
        draggable
        onDragStart={(e) => onDragHandler(e, todo)}
        className="bg-white shadow-md rounded-xl p-3 mb-3 cursor-grab active:cursor-grabbing transition hover:shadow-lg border border-gray-200"
      >
        <p className="font-semibold text-gray-800">{todo.title}</p>
      </div>
    ));
  };

  const { todoItems, pendingItems, completeItems } = useMemo(
    () =>
      todos.reduce(
        (acc, todo) => {
          if (todo.status === TODO_STATUS.TODO) acc.todoItems.push(todo);
          else if (todo.status === TODO_STATUS.PENDING)
            acc.pendingItems.push(todo);
          else acc.completeItems.push(todo);
          return acc;
        },
        {
          todoItems: [] as ITodo[],
          pendingItems: [] as ITodo[],
          completeItems: [] as ITodo[],
        }
      ),
    [todos]
  );

  const getColumnClass = (status: TODO_STATUS, baseColor: string) => {
    return `w-80 rounded-xl p-4 shadow-inner transition-all duration-200 ${
      dragOverCol === status
        ? "ring-2 ring-blue-400 scale-105 bg-blue-100"
        : baseColor
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-6 w-[90%] max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Kanban Board</h1>

        <form onSubmit={submitHandler} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter task..."
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </form>
      </div>

      {/* Board */}
      <div className="flex gap-6 mt-10 w-[95%] justify-center">
        
        {/* TODO */}
        <div
          className={getColumnClass(TODO_STATUS.TODO, "bg-blue-50")}
          onDrop={(e) => onDropHandler(e, TODO_STATUS.TODO)}
          onDragOver={(e) => onDragOverHandler(e, TODO_STATUS.TODO)}
          onDragLeave={() => setDragOverCol(null)}
        >
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Todo</h2>
          <div className="min-h-[300px]">{renderTodos(todoItems)}</div>
        </div>

        {/* PENDING */}
        <div
          className={getColumnClass(TODO_STATUS.PENDING, "bg-yellow-50")}
          onDrop={(e) => onDropHandler(e, TODO_STATUS.PENDING)}
          onDragOver={(e) => onDragOverHandler(e, TODO_STATUS.PENDING)}
          onDragLeave={() => setDragOverCol(null)}
        >
          <h2 className="text-lg font-semibold text-yellow-700 mb-3">
            In Progress
          </h2>
          <div className="min-h-[300px]">{renderTodos(pendingItems)}</div>
        </div>

        {/* COMPLETE */}
        <div
          className={getColumnClass(TODO_STATUS.COMPLETE, "bg-green-50")}
          onDrop={(e) => onDropHandler(e, TODO_STATUS.COMPLETE)}
          onDragOver={(e) => onDragOverHandler(e, TODO_STATUS.COMPLETE)}
          onDragLeave={() => setDragOverCol(null)}
        >
          <h2 className="text-lg font-semibold text-green-700 mb-3">Done</h2>
          <div className="min-h-[300px]">{renderTodos(completeItems)}</div>
        </div>

      </div>
    </div>
  );
};

export default KanbanBoard;