import {
  BaseEdge,
  getBezierPath,
  EdgeLabelRenderer,
} from "@xyflow/react";
import { useContext, useState } from "react";
import SurveyContext from "../state/context";

export function TextUpdaterEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
}) {
  const { setEdges } = useContext(SurveyContext);
  const [edgeLabel, setEdgeLabel] = useState(label);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const onChange = (e) => {
    const value = e.target.value;

    setEdgeLabel(value);

    setEdges((prev) => {
      const edge = prev.find((n) => n.id === id);
      edge.label = value;

      return [...prev];
    });
  }

  return (
    <>
      <BaseEdge id={id} path={edgePath} />

      <EdgeLabelRenderer>
        <input
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            minWidth: "100px",
          }}
          className="nodrag nopan"
          placeholder="Some answer"
          value={edgeLabel}
          onChange={onChange}
        />
      </EdgeLabelRenderer>
    </>
  );
}

export default TextUpdaterEdge;
