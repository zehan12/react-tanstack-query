import { FC, useState } from "react";
import { useProjects } from "../services/projects.queries";

const Projects: FC = () => {
    const [page, setPage] = useState(1);
    const { data, isPending, error, isError, isPlaceholderData, isFetching } =
        useProjects(page);

    return (
        <>
            <div>
                <h1>Projects</h1>
                {isPending ? (
                    <div>loading...</div>
                ) : isError ? (
                    <div>Error: {error.message}</div>
                ) : (
                    <div className="h-40">
                        {data.map((project) => (
                            <p key={project.id}>{project.name}</p>
                        ))}
                    </div>
                )}
                <span className="bg-blue-400 px-4 text-white">
                    Current page: {page}
                </span>
                <br />
                <button
                    className="bg-green-500 px-4 text-white font-semibold"
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                >
                    Previous Page
                </button>{" "}
                <button
                    className="bg-green-500 px-4 text-white font-semibold"
                    onClick={() => {
                        if (!isPlaceholderData) {
                            setPage((old) => old + 1);
                        }
                    }}
                    disabled={isPlaceholderData}
                >
                    Next Page
                </button>
                <br />
                {isFetching ? <span>Loading...</span> : null}{" "}
            </div>
        </>
    );
};

export default Projects;
