import React from 'react';
import MdxPage from './MdxPage';

export const Canvas = ({ data }) => {

    // Normalize nodes
    const normalizeNodePositions = (nodes) => {
        const offsetX = Math.abs(Math.min(...nodes.map((node) => node.x), 0));
        const offsetY = Math.abs(Math.min(...nodes.map((node) => node.y), 0));

        return nodes.map((node) => ({
            ...node,
            x: node.x + offsetX,
            y: node.y + offsetY,
        }));
    };

    // Function to render the different types of nodes based on the node type
    const renderNodeContent = (node) => {
        switch (node.type) {
            case 'text':
                return (
                    <div>
                        <MdxPage source={node.source} frontMatter={{}} />
                    </div>
                )
            case 'file':
                if (node.file.endsWith(".md") || node.file.endsWith(".mdx")) {
                    return (
                        <div>
                            <MdxPage source={node.source} frontMatter={{}} />
                        </div>
                    )
                }

                return (
                    <div>
                        <img src={node.file} alt={`File: ${node.file}`} />
                    </div>
                );
            default:
                return <div>Unsupported node type</div>;
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
    }

    const normalizedNodes = normalizeNodePositions(data.nodes);

    const renderNodes = normalizedNodes.map((node) => (
        <div
            key={node.id}
            style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: `${node.width}px`,
                height: `${node.height}px`,
                border: '1px solid black', // Added a border for visibility
            }}
        >
            {renderNodeContent(node)}
            {node.label && <div>{node.label}</div>}
        </div>
    ));

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
                        markerWidth="10"
                        markerHeight="7"
                        refX="0"
                        refY="3.5"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L0,7 L10,3.5 z" fill="#000" />
                    </marker>
                </defs>
                <line
                    x1={fromPosition.x}
                    y1={fromPosition.y}
                    x2={toPosition.x}
                    y2={toPosition.y}
                    stroke="#000"
                    strokeWidth="2"
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

        <div style={{ position: 'relative' }}>
            {renderEdges}
            {renderNodes}
        </div>
    );
};
