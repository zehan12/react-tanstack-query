import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjects } from "./projects.api";

export const useProjects = (page: number) => {
    return useQuery({
        queryKey: ["projects", { page }],
        queryFn: () => getProjects(page),
        placeholderData: keepPreviousData,
    });
};
