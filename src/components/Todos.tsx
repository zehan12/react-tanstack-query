import { FC } from "react";
import { useTodos, useTodosIds } from "../services/todos.queries";

type TodosProps = {};

const Todos: FC<TodosProps> = () => {
    const todosIdsQuery = useTodosIds();
    const todosQueries = useTodos(todosIdsQuery.data);

    return (
        <div className="flex flex-col justify-center items-center">
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
                    </li>
                ))}
            </div>
        </div>
    );
};

export default Todos;
