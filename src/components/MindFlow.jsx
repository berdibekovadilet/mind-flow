import React, { useState, Fragment } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  Controls,
  MiniMap,
} from "react-flow-renderer";

const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "Page" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: { label: "Page 2" },
    position: { x: 0, y: 100 },
  },
];

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const MindFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const [name, setName] = useState("");

  const addPage = () => {
    setElements((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        data: { label: `${name}` },
        position: {
          x: 0,
          y: Math.random() * (300 - 100) + 100,
        },
      })
    );
  };

  const onConnect = (params) => setElements((e) => addEdge(params, e));

  const onElementsRemove = (elementsToRemove) =>
    setElements((e) => removeElements(elementsToRemove, e));

  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          name="title"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addPage}>Добавить</button>
        <h5>Для удаления нажмите BackSpace</h5>
      </div>
      <ReactFlow
        elements={elements}
        onLoad={onLoad}
        style={{ width: "100%", height: "90vh" }}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
        connectionLineType="bezier"
        snapToGrid={true}
        snapGrid={[16, 16]}
        onElementsRemove={onElementsRemove}
        deleteKeyCode={8}
      >
        <Background color="#888" gap={16} />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "input") return "blue";
            return "#FFCC00";
          }}
        />
        <Controls />
      </ReactFlow>
    </Fragment>
  );
};

export default MindFlow;
