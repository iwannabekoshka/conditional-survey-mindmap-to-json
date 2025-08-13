import {
  BaseEdge,
  getBezierPath,
  EdgeLabelRenderer,
} from "@xyflow/react";
import { useContext } from "react";
import SurveyContext from "../state/context";

export function TextUpdaterEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
}) {
  const { dispatch } = useContext(SurveyContext);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const onChange = (e) => {
    const value = e.target.value;
    dispatch({
      type: "UPDATE_EDGE_LABEL",
      payload: { edgeId: id, label: value },
    });
  };

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
          value={label}
          onChange={onChange}
        />
      </EdgeLabelRenderer>
    </>
  );
}

export default TextUpdaterEdge;
