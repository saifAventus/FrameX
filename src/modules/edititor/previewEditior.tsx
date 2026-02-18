import Box from "@/elemets/elementComponents/box";
import { useEditor } from "@/shared/hooks/editorProvider";
import React from "react";
import type { ElementNode } from "@/shared/types/elementNode";
type ElementType = "Box";

interface ElementComponentProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

type ComponentRegistry = Record<ElementType, React.FC<ElementComponentProps>>;
const componentRegistry: ComponentRegistry = {
  Box,
};

function renderNode(node: ElementNode): React.ReactNode {
  const Component = componentRegistry[node.element as ElementType];

  if (!Component) {
    return null;
  }

  return (
    <Component key={node.id} {...node.props}>
      {node.children?.map(renderNode)}
    </Component>
  );
}
function PreviewEditor() {
  const { data } = useEditor();

  return <div className="h-screen">{data.layout?.map(renderNode)}</div>;
}

export default PreviewEditor;
