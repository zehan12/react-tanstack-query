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
