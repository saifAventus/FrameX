import React, { createContext, useContext, useEffect, useState } from "react";
import type { ElementNode } from "../types/elementNode";
import pageEditorService from "@/srevice/pageEdititor/pageEdititorService";
interface EditorContextState {
  data: ElementNode;
  setData: React.Dispatch<React.SetStateAction<ElementNode>>;
  selectedElemet: ElementNode | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<ElementNode | null>>;
}
const emptyEditorRoot: ElementNode = {
  id: "root",
  element: "page",
  layout: [],
};

const EditorContext = createContext<EditorContextState | null>(null);

export const EditorProvider = ({
  initialData,
  children,
}: {
  initialData?: ElementNode;
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<ElementNode>(initialData || emptyEditorRoot);
  const [selectedElemet, setSelectedElement] = useState<ElementNode | null>(
    null,
  );

  const handelApiCall = async () => {
    try {
      const response = (await pageEditorService.updateJson(data)).data;

      console.log("the jsosn is s", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handelApiCall();
  }, [data]);

  ////can e ysed the case of adding new json form backend

  return (
    <EditorContext.Provider
      value={{
        data,
        setData,
        selectedElemet,
        setSelectedElement,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEditor = () => {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    throw new Error("useEditor must be used inside EditorProvider");
  }
  return ctx;
};
