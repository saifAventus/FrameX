import Box from "@/elemets/elementComponents/box";
import Text from "@/elemets/elementComponents/text";
import { useEditor } from "@/shared/hooks/editorProvider";
import React, { useEffect, useState } from "react";
import type { ElementNode } from "@/shared/types/elementNode";
import pageEditorService from "@/srevice/pageEdititor/pageEdititorService";
type ElementType = "Box" | "Text";

export interface ElementComponentProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  // as?: keyof JSX.IntrinsicElements;
  text?: string;
}

type ComponentRegistry = Record<ElementType, React.FC<ElementComponentProps>>;
const componentRegistry: ComponentRegistry = {
  Box,
  Text,
};

function renderNode(node: ElementNode): React.ReactNode {
  const Component = componentRegistry[node.element as ElementType];

  if (!Component) {
    return null;
  }

  return (
    <Component key={node.id} {...node.props} id={node.id}>
      {node.children?.map(renderNode)}
    </Component>
  );
}
function PreviewEditor() {
  const { data } = useEditor();
  const [perveData, setPerviewData] = useState<ElementNode>();

  const fetchJson = async () => {
    try {
      const response = await pageEditorService.fetchJson();
      console.log("the response is ", response);
      setPerviewData(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("the data is ", data);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchJson();
  }, [data]);
  console.log("the perve data is ", perveData);
  return <div className="h-screen">{perveData?.layout?.map(renderNode)}</div>;
}

export default PreviewEditor;
