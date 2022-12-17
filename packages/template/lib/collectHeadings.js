// ToC: get the html nodelist for headings
export function collectHeadings(nodes) {
  const sections = [];

  Array.from(nodes).forEach((node) => {
    const { id, innerText: title, tagName: level } = node;
    if (!(id && title)) {
      return;
    }
    if (level === "H3") {
      const parentSection = sections[sections.length - 1];
      if (parentSection) parentSection.children.push({ id, title });
    } else if (level === "H2") {
      sections.push({ id, title, children: [] });
    }

    sections.push(...collectHeadings(node.children ?? []));
  });

  return sections;
}
