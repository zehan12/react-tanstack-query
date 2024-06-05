import { axiosInstance } from "../axios";
import { Todo } from "../types/todo";

export const getTodosIds = async () => {
    return (await axiosInstance.get<Todo[]>("todos")).data.map(
        (todo) => todo.id
    );
};

export const getTodo = async (id: number) => {
    return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const createTodo = async (todo: Todo) => {
    await axiosInstance.post("todos", todo);
};

export const updateTodo = async (todo: Todo) => {
    await axiosInstance.patch(`todos/${todo.id}`, todo);
};

