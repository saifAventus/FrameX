import type { ElementComponentProps } from "@/modules/edititor/previewEditior";
import { useEditor } from "@/shared/hooks/editorProvider";
import pageEditorService from "@/srevice/pageEdititor/pageEdititorService";
import { useRef, useState, useEffect } from "react";
import { twj } from "tw-to-css";

export default function Text({ id, text, className }: ElementComponentProps) {
  const { handleReRender } = useEditor();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const styleInline = twj(`${className}`);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
    }
  }, [editing]);

  const handleUpdate = async (updatedText: string) => {
    try {
      const response = await pageEditorService.updateJson({
        id: id!,
        updated: updatedText,
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
      onClick={(e) => {
        e.stopPropagation();
        setEditing(true);
      }}
      style={styleInline}
      className={`relative outline-none cursor-text whitespace-pre-wrap wrap-break-word min-h-[1.5em] transition-all duration-200 ease-in-out rounded-sm ${
        editing
          ? "ring-2 ring-blue-500 bg-white/80 z-10 shadow-sm"
          : "hover:ring-2 hover:ring-blue-400/50 hover:bg-blue-50/20"
      } ${!text && !editing ? "text-gray-400 italic opacity-80" : ""} ${className || ""}`}
    >
      {text || (editing ? "" : "Type something...")}
    </div>
  );
}
