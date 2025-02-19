import MdxPage from './MdxPage';
import dynamic from 'next/dynamic';

export default function CanvasElement({ data }) {
  // Normalize nodes
  const normalizeNodePositions = (nodes) => {
    const offsetX = Math.abs(Math.min(...nodes.map((node) => node.x), 0));
    const offsetY = Math.abs(Math.min(...nodes.map((node) => node.y), 0));

    return nodes.map((node) => ({
      ...node,
      x: (node.x + offsetX),
      y: (node.y + offsetY),
    }));
  };

  // Function to render the different types of nodes based on the node type
  const renderNodeContent = (node) => {
    switch (node.type) {
      case 'text':
        return (
          <div style={{ padding: '1rem' }}>
            <MdxPage source={node.source} frontMatter={{}} />
          </div>
        );
      case 'file':
        if (node.file.endsWith('.md') || node.file.endsWith('.mdx')) {
          return (
            <div style={{ padding: '1rem' }}>
              <MdxPage source={node.source} frontMatter={{}} />
            </div>
          );
        }
        if (node.file.endsWith('.pdf')) {
          const PdfView = dynamic(import('@/components/PdfView'), {
            ssr: false,
          });
          return (
            <div style={{ padding: '.2rem' }}>
              <PdfView
                filePath={node.file}
                width={node.width}
                height={node.height}
              />
            </div>
          );
        }
        return (
          <div>
            <img src={node.file} alt={`File: ${node.file}`} />
          </div>
        );
      case 'link':
        const [_, id] = node.url.split('=');
        return (
          <div>
            <iframe
              width={`${node.width}`}
              height={`${node.height}`}
              src={`https://www.youtube.com/embed/${id}?si=Jbz-2kTWpwH21cTD`}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
              style={{ padding: '.2rem' }}
            ></iframe>
          </div>
        );

      default:
        return null;
    }
  };

  const getEdgeCoordinates = (node, side) => {
    const position = { x: node.x, y: node.y };
    switch (side) {
      case 'top':
        position.x += node.width / 2;
        break;
      case 'bottom':
        position.x += node.width / 2;
        position.y += node.height;
        break;
      case 'left':
        position.y += node.height / 2;
        break;
      case 'right':
        position.x += node.width;
        position.y += node.height / 2;
        break;
      default:
        // Handle unexpected side value if necessary
        break;
    }
    return position;
  };

  const normalizedNodes = normalizeNodePositions(data.nodes);

  const renderNodes = normalizedNodes.map((node, index) => {
    return (
      <>
        {node.file && <div style={{
          position: 'absolute',
          left: `${node.x}px`,
          top: `${node.y - 24}px`,
          whiteSpace: "nowrap"
        }}
        >{node.file}</div>}
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${node.x}px`,
            top: `${node.y}px`,
            width: `${node.width}px`,
            height: `${node.height}px`,
            borderRadius: '12px',
          }}
          className='border border-black dark:border-white'
        >
          {renderNodeContent(node)}
        </div>
      </>
    );
  });

  const renderEdges = data.edges.map((edge) => {
    const fromNode = normalizedNodes.find((node) => node.id === edge.fromNode);
    const toNode = normalizedNodes.find((node) => node.id === edge.toNode);

    if (!fromNode || !toNode) {
      console.warn(`Nodes for edge ${edge.id} not found.`);
      return null;
    }

    const fromPosition = getEdgeCoordinates(fromNode, edge.fromSide);
    const toPosition = getEdgeCoordinates(toNode, edge.toSide);

    const arrowheadMarkerId = `arrowhead-${edge.id}`;

    return (
      <svg key={edge.id} style={{ position: 'absolute', overflow: 'visible' }}>
        <defs>
          <marker
            id={arrowheadMarkerId}
            markerWidth='10'
            markerHeight='7'
            refX='8'
            refY='3.5'
            orient='auto'
            markerUnits='strokeWidth'
          >
            <circle cx="5" cy="3.5" r="3" className='fill-black dark:fill-white' />
          </marker>
        </defs>
        <path
          d={`M ${fromPosition.x} ${fromPosition.y} C ${(fromPosition.x + toPosition.x) / 2} ${fromPosition.y}, ${(fromPosition.x + toPosition.x) / 2} ${toPosition.y}, ${toPosition.x} ${toPosition.y}`}
          className='stroke-black dark:stroke-white'
          strokeWidth='1.4'
          fill='none'
          markerEnd={`url(#${arrowheadMarkerId})`}
        />
        {edge.label && (
          <text
            x={(fromPosition.x + toPosition.x) / 2}
            y={(fromPosition.y + toPosition.y) / 2}
            style={{ userSelect: 'none' }}
          >
            {edge.label}
          </text>
        )}
      </svg>
    );
  });

  return (
    <div style={{ height: '3000px' }}>
      <div style={{ position: 'relative' }}>
        {renderEdges}
        {renderNodes}
      </div>
    </div>
  );
}
