import { KBarProvider } from "kbar";

import { Portal } from "./KBarPortal";

export function KBarModal({ startingActions, searchDocumentsPath, children }) {
  return (
    <KBarProvider actions={startingActions}>
      <Portal searchDocumentsPath={searchDocumentsPath} />
      {children}
    </KBarProvider>
  );
}
