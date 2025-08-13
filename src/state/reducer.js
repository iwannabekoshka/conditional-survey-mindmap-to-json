export const initialState = {
  nodes: [
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
  ],
  edges: [
    {
      id: "n1-n2",
      source: "n1",
      target: "n2",
      label: "Ответ 1",
      type: "textUpdater",
    },
  ],
};

const createNewNode = (id) => {
  return {
    id: id,
    position: { x: 0, y: 0 },
    data: { label: "Новый вопрос" },
    selected: true,
    type: "textUpdater",
  };
};

export function reducer(state, action) {
  switch (action.type) {
    case "ADD_NODE": {
      const newNode = createNewNode(`n${state.nodes.length + 1}`);
      const updatedNodes = state.nodes.map((n) => ({ ...n, selected: false }));
      return {
        ...state,
        nodes: [...updatedNodes, newNode],
      };
    }
    case "UPDATE_NODE_TEXT": {
      const { nodeId, text } = action.payload;
      const updatedNodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, label: text } } : node
      );
      return {
        ...state,
        nodes: updatedNodes,
      };
    }
    case "UPDATE_NODE_IS_RESULT": {
      const { nodeId, isResult } = action.payload;
      const updatedNodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, isResult } } : node
      );
      return {
        ...state,
        nodes: updatedNodes,
      };
    }
    case "UPDATE_EDGE_LABEL": {
      const { edgeId, label } = action.payload;
      const updatedEdges = state.edges.map((edge) =>
        edge.id === edgeId ? { ...edge, label } : edge
      );
      return {
        ...state,
        edges: updatedEdges,
      };
    }
    case "IMPORT_DATA": {
      const { nodes, edges } = action.payload;
      return {
        ...state,
        nodes,
        edges,
      };
    }
    default:
      return state;
  }
}
