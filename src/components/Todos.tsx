import { FC } from "react";
import { useTodos, useTodosIds } from "../services/todos.queries";
import { useCreateTodo, useUpdateTodo } from "../services/todos.mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types/todo";

type TodosProps = {};

const Todos: FC<TodosProps> = () => {
    const todosIdsQuery = useTodosIds();
    const todosQueries = useTodos(todosIdsQuery.data);

    const { register, handleSubmit } = useForm<Todo>();

    const createTodoMutation = useCreateTodo();
    const updateTodoMutation = useUpdateTodo();

    const handleCreateTodoSubmit: SubmitHandler<Todo> = (todo) => {
        createTodoMutation.mutate(todo);
    };

    const handleMarkAsDoneSubmit = (todo: Todo | undefined) => {
        if (todo) {
            updateTodoMutation.mutate({ ...todo, checked: true });
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
                <h4>Create New Todo</h4>
                <div className="flex gap-3">
                    <p className="font-semibold">Title:</p>
                    <input placeholder="Title" {...register("title")} />
                </div>
                <div className="flex gap-3">
                    <p className="font-semibold">Description:</p>
                    <input
                        placeholder="Description"
                        {...register("description")}
                    />
                </div>
                <input
                    type="submit"
                    disabled={createTodoMutation.isPending}
                    value={
                        createTodoMutation.isPending
                            ? "is creating"
                            : "create todo"
                    }
                    className="bg-blue-500 text-white p-2 uppercase text-sm font-semibold disabled:cursor-not-allowed disabled:bg-gray-600 cursor-pointer"
                />
            </form>
            <p className="flex text-xl">
                Query function status : {todosIdsQuery.fetchStatus}
            </p>
            <p className="text-xl">
                Query data status : {todosIdsQuery.status}
            </p>
            <div className="flex gap-2">
                {todosIdsQuery.isError && <div>Error in fetching data!</div>}
                {todosIdsQuery.isPending && <div>Loading...</div>}
                {todosIdsQuery.data?.map((id) => (
                    <p className="border-2 p-2" key={id}>
                        {id}
                    </p>
                ))}
            </div>
            <div className="flex  flex-wrap gap-4 px-20 my-2">
                {todosQueries.map(({ data }) => (
                    <li
                        className="flex flex-col items-center justify-center border-2 w-80 h-40"
                        key={data?.id}
                    >
                        <span>
                            <div>Id: {data?.id}</div>
                            <strong>Title: {data?.title}</strong>
                            <p>Description: {data?.description}</p>
                        </span>
                        <div>
                            <button
                                onClick={() => handleMarkAsDoneSubmit(data)}
                                disabled={data?.checked}
                            >
                                {data?.checked ? "Done" : "Mark as done"}
                            </button>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    );
};

export default Todos;
