"use client";

import { useState } from "react";
import { CheckSquare, Square } from "lucide-react";

const TODOS = [
  {
    id: "1",
    text: "Review lab reports for J. Smith",
    priority: "High Priority",
    priorityColor: "text-[#EF4444]",
    priorityBg: "bg-[#FEF2F2]",
    done: false,
  },
  {
    id: "2",
    text: "Approve prescription refills",
    priority: "Done",
    priorityColor: "text-[#0284C7]",
    priorityBg: "bg-[#F0F9FF]",
    done: true,
  },
  {
    id: "3",
    text: "Complete medical notes",
    priority: "Due by 5 PM",
    priorityColor: "text-[#6A7282]",
    priorityBg: "bg-gray-100",
    done: false,
  },
];

export default function TodoList() {
  const [todos, setTodos] = useState(TODOS);
  const pending = todos.filter((t) => !t.done).length;

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#101828]">To-Do List</h3>
        <span className="text-[11px] text-[#6A7282]">{pending} pending</span>
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-start gap-3">
            <button
              onClick={() => toggleTodo(todo.id)}
              className="mt-0.5 shrink-0 cursor-pointer"
            >
              {todo.done ? (
                <CheckSquare className="w-4 h-4 text-[#0284C7]" />
              ) : (
                <Square className="w-4 h-4 text-[#D1D5DB]" />
              )}
            </button>
            <div>
              <p
                className={`text-xs font-semibold ${
                  todo.done ? "text-[#9CA3AF] line-through" : "text-[#101828]"
                }`}
              >
                {todo.text}
              </p>
              <span
                className={`inline-block mt-0.5 px-1.5 py-0.5 text-[10px] font-medium rounded ${todo.priorityBg} ${todo.priorityColor}`}
              >
                {todo.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
