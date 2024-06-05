import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo, updateTodo } from "./todos.api";

export const useCreateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo: Todo) => createTodo(todo),
        onMutate: () => {
            console.log("on mutate...");
        },
        onError: () => {
            console.log("on error...");
        },
        onSuccess: () => {
            console.log("on success...");
        },
        onSettled: async (_, error) => {
            console.log("on settled...");
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["todos"] });
            }
        },
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo: Todo) => updateTodo(todo),
        onSettled: async (_, error, variable) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["todos"] });
                await queryClient.invalidateQueries({
                    queryKey: ["todo", { id: variable.id }],
                });
            }
        },
    });
};
