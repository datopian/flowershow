import Giscus, { BooleanString, Mapping, Repo } from "@giscus/react";
import { useTheme } from "next-themes";

export interface GiscusConfig {
  provider: "giscus";
  pages?: Array<string>;
  config: {
    theme?: string;
    darkTheme?: string;
    mapping?: Mapping;
    repo?: Repo;
    repositoryId?: string;
    category?: string;
    categoryId?: string;
    reactions?: string;
    metadata?: string;
    inputPosition?: string;
    lang?: string;
  };
}

export type GiscusProps = GiscusConfig["config"];

export const GiscusReactComponent = ({
  repo,
  repositoryId,
  category,
  categoryId,
  reactions = "0",
  metadata = "0",
  mapping = "pathname",
  theme = "light",
}: GiscusProps) => {
  const { theme: nextTheme, resolvedTheme } = useTheme();
  const commentsTheme =
    nextTheme === "dark" || resolvedTheme === "dark"
      ? "transparent_dark"
      : theme;

  return (
    <Giscus
      repo={repo as Repo}
      repoId={repositoryId as string}
      category={category as string}
      categoryId={categoryId as string}
      mapping={mapping as Mapping}
      inputPosition="top"
      reactionsEnabled={reactions as BooleanString}
      emitMetadata={metadata as BooleanString}
      // TODO: remove transparent_dark after theme toggle fix
      theme={nextTheme ? commentsTheme : "transparent_dark"}
    />
  );
};
