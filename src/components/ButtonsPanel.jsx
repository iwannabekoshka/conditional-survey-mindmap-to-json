function ButtonsPanel({ onAddNode, onExport, onImport }) {
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
