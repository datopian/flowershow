import { Octokit } from "octokit";

export interface GitHubProject {
    owner: string;
    repo: string;
    branch: string;
}

export async function getRepoFile({
    project,
    path,
    githubPat
}: {
    project: GitHubProject,
    path: string,
    githubPat: string
}) {
    const octokit = new Octokit({ auth: githubPat });
    try {
        const response = await octokit.rest.repos.getContent({
            owner: project.owner,
            repo: project.repo,
            ref: project.branch,
            path: path + ".md", // TODO temporary
        });
        const data = response.data as {
            content?: string;
        };
        const fileContent = data.content ?? null;
        const decodedContent = Buffer.from(fileContent, "base64").toString();
        return decodedContent;

    } catch (error) {
        throw new Error(
            `Could not read ${project.owner}/${project.repo}/${path}`
        );
    }
}

