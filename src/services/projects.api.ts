import { axiosInstance } from "../axios";
import { Project } from "../types/project";

export const getProjects = async (page = 1) => {
    return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`)).data;
};
