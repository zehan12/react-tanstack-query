import { FC } from "react";
import { useTodosIds } from "../services/todos.queries";

type TodosProps = {};

const Todos: FC<TodosProps> = () => {
    const todosIdsQuery = useTodosIds();

    return (
        <>
            <p>Query function status : {todosIdsQuery.fetchStatus}</p>
            <p>Query data status : {todosIdsQuery.status}</p>
            {todosIdsQuery.isPending && <div>Loading...</div>}
            {todosIdsQuery.isError && <div>Error in fetching data!</div>}
            {todosIdsQuery.data?.map((id) => (
                <p key={id}>{id}</p>
            ))}
        </>
    );
};

export default Todos;
