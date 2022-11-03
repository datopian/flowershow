import Router from "next/router";

import { KBarModal } from "./KBarModal";

export function KBarSearchProvider({ kbarConfig, children }) {
  const { searchDocumentsPath, defaultActions } = kbarConfig;

  const startingActions = Array.isArray(defaultActions)
    ? defaultActions
    : [
        {
          id: "homepage",
          name: "Homepage",
          keywords: "",
          section: "Home",
          perform: () => Router.push("/"),
        },
      ];

  return KBarModal ? (
    <KBarModal
      startingActions={startingActions}
      searchDocumentsPath={searchDocumentsPath}>
      {children}
    </KBarModal>
  ) : (
    children
  );
}
