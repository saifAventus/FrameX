import pageEditorService from "@/srevice/pageEdititor/pageEdititorService";
import { createContext, useContext, useEffect, useState } from "react";
import type { ElementNode } from "../types/elementNode";

interface EditorContextState {
  data: ElementNode;
  setData: React.Dispatch<React.SetStateAction<ElementNode>>;
  selectedElement: ElementNode | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<ElementNode | null>>;
  handleReRender: () => void;
}

const emptyEditorRoot: ElementNode = {
  id: "root",
  element: "page",
  layout: [],
};

const EditorContext = createContext<EditorContextState | null>(null);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<ElementNode>(emptyEditorRoot);
  const [selectedElement, setSelectedElement] = useState<ElementNode | null>(
    null,
  );

  const handleApiCall = async () => {
    try {
      const response = (await pageEditorService.fetchJson()).data;
      setData(response.result);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 Proper re-render trigger
  const handleReRender = () => {
    handleApiCall();
    return;
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleApiCall();
  }, []);

  return (
    <EditorContext.Provider
      value={{
        data,
        setData,
        selectedElement,
        setSelectedElement,
        handleReRender,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useEditor = () => {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    throw new Error("useEditor must be used inside EditorProvider");
  }
  return ctx;
};
