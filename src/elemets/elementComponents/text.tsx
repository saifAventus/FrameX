import { updateNodeID } from "@/lib/helper";
import type { ElementComponentProps } from "@/modules/edititor/previewEditior";
import { useEditor } from "@/shared/hooks/editorProvider";
import { useRef, useState } from "react";

export default function Text({ id, text, className }: ElementComponentProps) {
  const { setData } = useEditor();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    const value = ref.current?.innerText || "";
    setData((prev) => ({
      ...prev,
      layout: updateNodeID(prev.layout!, id!, value, "text"),
    }));
  };

  return (
    <div
      ref={ref}
      contentEditable={editing}
      suppressContentEditableWarning
      onBlur={() => setEditing(false)}
      onChange={handleInput}
      onClick={() => {
        setEditing(true);
      }}
      className={`outline-none cursor-text   whitespace-pre-wrap wrap-break-word ${className}`}
    >
      {text || "TEXT"}
    </div>
  );
}
