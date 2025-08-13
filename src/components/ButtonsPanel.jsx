import { useContext } from "react";
import SurveyContext from "../state/context";
import downloadFile from "../utils/downloadFile";

function ButtonsPanel() {
  const { state, dispatch } = useContext(SurveyContext);
  const { nodes, edges } = state;

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
    <div style={{ display: "flex", gap: "5px" }}>
      <button onClick={onAddNode} title="Add quiestion">
        +
      </button>
      <button onClick={onExport} title="Export survey to JSON file">
        Export to JSON
      </button>

      <button title={"Import existing survey"}>
        <label htmlFor="import-json">
          Import JSON
          <input
            type="file"
            onChange={onImport}
            style={{display: "none"}}
            id="import-json"
          />
        </label>
      </button>
    </div>
  );
}

export default ButtonsPanel;
