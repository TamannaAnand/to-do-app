import { createClient } from "@/utils/supabase/server";
import Todo from "@/components/todos/todo";
import AddTodo from "@/components/todos/add-todo";

export default async function Todos() {
  const supabase = await createClient();

  const { data: todos, error } = await supabase.from("todos").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col">
        {todos &&
          todos
            .filter((todo) => {
              return todo.is_complete == false;
            })
            .map((todo) => {
              return <Todo key={todo.id} todo={todo} />;
            })}
        {todos &&
          todos
            .filter((todo) => {
              return todo.is_complete;
            })
            .map((todo) => {
              return <Todo key={todo.id} todo={todo} />;
            })}
        <AddTodo />
      </div>
    </div>
  );
}