import { memo, useContext, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import SurveyContext from "../state/context";
import Editor from "react-simple-wysiwyg";

export function TextUpdaterNode(props) {
  const { dispatch } = useContext(SurveyContext);
  const [isResult, setIsResult] = useState(!!props.data.isResult);

  function onChangeText(e) {
    dispatch({
      type: "UPDATE_NODE_TEXT",
      payload: { nodeId: props.id, text: e.target.value },
    });
  }

  function onChangeIsResult() {
    const newIsResult = !isResult;
    setIsResult(newIsResult);
    dispatch({
      type: "UPDATE_NODE_IS_RESULT",
      payload: { nodeId: props.id, isResult: newIsResult },
    });
  }

  return (
    <div className={`text-updater-body nodrag ${isResult ? "result" : ""}`} style={{cursor: "default"}}>
      <div>
        <h3 style={{marginTop: 0, textAlign: "center"}}>{isResult ? "Результат" : "Вопрос"} {props.id}</h3>
      </div>

      <Editor value={props.data.label} onChange={onChangeText} />

      <div>
        <label>
          <input type="checkbox" name="is_result" checked={isResult} onChange={onChangeIsResult}/>
          <span>Конечный результат?</span>
        </label>
      </div>

      <Handle type="target" position={Position.Top} />
      {!isResult && <Handle type="source" position={Position.Bottom} />}
      
    </div>
  );
}

export default memo(TextUpdaterNode);
