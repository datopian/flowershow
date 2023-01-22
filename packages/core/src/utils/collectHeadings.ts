// ToC: get the html nodelist for headings
interface TocSection {
  id: string;
  title: string;
  level: string;
  children?: any;
}

export function collectHeadings(nodes: NodeListOf<HTMLHeadingElement>) {
  const sections: Array<TocSection> = [];
  const headerTitle = document.querySelector("main header h1");

  Array.from(nodes).forEach((node) => {
    const pageHeading: boolean = node.parentElement?.firstChild === node;
    const { id, innerText: title, tagName: level } = node;

    if (!(id && title)) {
      return;
    }

    if (level === "H1" && (headerTitle ?? !pageHeading)) {
      sections.push({ id, title, level, children: [] });
    }

    const parentSection = sections[sections.length - 1];

    if (level === "H2") {
      if (parentSection && level > parentSection.level) {
        (parentSection as TocSection).children.push({
          id,
          title,
          level,
          children: [],
        });
      } else {
        sections.push({ id, title, level, children: [] });
      }
    }

    if (level === "H3") {
      const subSection =
        parentSection?.children[parentSection?.children?.length - 1];
      if (subSection && level > subSection.level) {
        (subSection as TocSection).children.push({
          id,
          title,
          level,
          children: [],
        });
      } else if (parentSection && level > parentSection.level) {
        (parentSection as TocSection).children.push({
          id,
          title,
          level,
          children: [],
        });
      } else {
        sections.push({ id, title, level, children: [] });
      }
    }

    // TODO types
    sections.push(...collectHeadings((node.children as any) ?? []));
  });

  return sections;
}
