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
            <ButtonsPanel />
          </Panel>
        </ReactFlow>
      </div>
    </SurveyContext.Provider>
  );
}

export default App;
