import { useReducer, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import downloadFile from "./utils/downloadFile";
import ButtonsPanel from "./components/buttonsPanel";
import { TextUpdaterNode } from "./components/TextUpdaterNode";
import SurveyContext from "./state/context";
import TextUpdaterEdge from "./components/TextUpdaterEdge";
import { reducer, initialState } from "./state/reducer";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

const edgeTypes = {
  textUpdater: TextUpdaterEdge,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { nodes: nodesFromReducer, edges: edgesFromReducer } = state;

  const [nodes, setNodes, onNodesChange] = useNodesState(initialState.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialState.edges);

  useEffect(() => {
    setNodes(nodesFromReducer);
  }, [nodesFromReducer, setNodes]);

  useEffect(() => {
    setEdges(edgesFromReducer);
  }, [edgesFromReducer, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: "textUpdater" }, eds)),
    [setEdges]
  );

  const onAddNode = () => dispatch({ type: "ADD_NODE" });

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
      dispatch({ type: "IMPORT_DATA", payload: json });
      e.target.value = "";
    };
  };

  return (
    <SurveyContext.Provider value={{ state, dispatch }}>
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
    </SurveyContext.Provider>
  );
}

export default App;
