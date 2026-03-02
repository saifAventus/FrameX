import type { ElementComponentProps } from "@/modules/edititor/previewEditior";
import { useEditor } from "@/shared/hooks/editorProvider";
import pageEditorService from "@/srevice/pageEdititor/pageEdititorService";
import { useRef, useState } from "react";
import { twj } from "tw-to-css";

export default function Text({ id, text, className }: ElementComponentProps) {
  const { handleReRender } = useEditor();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const styleInline = twj(`${className}`);
  const handleUpdate = async (text: string) => {
    try {
      const response = await pageEditorService.updateJson({
        id: id!,
        updated: text,
        elementType: "text",
      });
      console.log(response);
      handleReRender();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      ref={ref}
      contentEditable={editing}
      suppressContentEditableWarning
      onBlur={() => setEditing(false)}
      onBlurCapture={(e) => handleUpdate(e.currentTarget.innerText)}
      onClick={() => {
        setEditing(true);
      }}
      style={styleInline}
      className={`outline-none cursor-text   whitespace-pre-wrap wrap-break-word ${className}`}
    >
      {text || "TEXT"}
    </div>
  );
}
