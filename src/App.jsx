import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import downloadFile from "./utils/downloadFile";

import ButtonsPanel from "./components/buttonsPanel";
import { TextUpdaterNode } from "./components/TextUpdaterNode";
import SurveyContext from "./state/context";
import TextUpdaterEdge from "./components/TextUpdaterEdge";

const createNewNode = (id) => {
  return {
    id: id,
    position: { x: 0, y: 0 },
    data: { label: "Новый вопрос" },
    selected: true,
    type: "textUpdater",
  };
};
const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Вопрос 1" },
    type: "textUpdater",
  },
  {
    id: "n2",
    position: { x: 0, y: 300 },
    data: { label: "Вопрос 2" },
    type: "textUpdater",
  },
];
const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    label: "Ответ 1",
    type: "textUpdater",
  },
];

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

const edgeTypes = {
  textUpdater: TextUpdaterEdge,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((edgesSnapshot) =>
        addEdge({ ...params, type: "textUpdater" }, edgesSnapshot)
      ),
    [setEdges]
  );

  const onAddNode = () => {
    const node = createNewNode(`n${nodes.length + 1}`);
    setNodes([...nodes.map(n => ({...n, selected: false})), node]);
  };
  const onExport = () => {
    const mappedNodes = nodes.map((n) => ({
      id: n.id,
      question: n.data.label,
    }));
    const mappedEdges = edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      answer: e.label,
    }));
    downloadFile(
      "survey.json",
      JSON.stringify({
        nodes,
        edges,
        humanData: { questions: mappedNodes, answers: mappedEdges },
      })
    );
  };
  const onImport = (e) => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = function fileReadCompleted() {
      const json = JSON.parse(reader.result);
      setNodes(json.nodes);
      setEdges(json.edges);

      e.target.value = '';
    };
  };

  return (
    <SurveyContext value={{ nodes, setNodes, setEdges }}>
      <div style={{ height: "100%", width: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />

          <Panel position="top-left">
            <ButtonsPanel
              onAddNode={onAddNode}
              onExport={onExport}
              onImport={onImport}
            />
          </Panel>
        </ReactFlow>
      </div>
    </SurveyContext>
  );
}

export default App;
