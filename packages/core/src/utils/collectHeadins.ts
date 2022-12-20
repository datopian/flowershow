// ToC: get the html nodelist for headings
interface TocSection {
  id: string;
  title: string;
}

interface TocSectionWithChildren extends TocSection {
  children: Array<TocSection>;
}
export function collectHeadings(nodes: NodeListOf<HTMLHeadingElement>) {
  const sections: Array<TocSection | TocSectionWithChildren> = [];

  Array.from(nodes).forEach((node) => {
    const { id, innerText: title, tagName: level } = node;
    if (!(id && title)) {
      return;
    }
    if (level === "H3") {
      const parentSection = sections[sections.length - 1];
      if (parentSection)
        (parentSection as TocSectionWithChildren).children.push({ id, title });
    } else if (level === "H2") {
      sections.push({ id, title, children: [] });
    }

    // TODO types
    sections.push(...collectHeadings((node.children as any) ?? []));
  });

  return sections;
}
