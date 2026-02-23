import Dropdown from "@/elemets/elementComponents/dropdown";
import {
  createNode,
  getChildren,
  getDisplayName,
  insertNodeInside,
  resolveRef,
} from "@/lib/helper";
import { elementLibrary } from "@/lib/utils";
import { useEditor } from "@/shared/hooks/editorProvider";
import type { ElementNode } from "@/shared/types/elementNode";
import { Plus } from "lucide-react";

import { memo } from "react";

const TreeNode = memo(
  ({
    node,
    definitions,
    depth,
  }: {
    node: ElementNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    definitions?: Record<string, any>;
    depth: number;
  }) => {
    const { setData, selectedElemet, setSelectedElement } = useEditor();

    const handleAddInside = (type: string) => {
      if (!selectedElemet) return;
      const newNode = createNode(type);
      setData((prev) => insertNodeInside(prev, selectedElemet.id!, newNode));
    };

    if (!Object.keys(node).length) {
      return (
        <div
          onClick={() => {
            setSelectedElement(effectiveNode);
          }}
          style={{ paddingLeft: depth * 14 }}
          className="flex items-center justify-between gap-2 py-1 cursor-pointer hover:bg-blue-50 rounded-md"
        >
          <span className="text-sm font-medium">Layer</span>

          <Dropdown
            data={elementLibrary}
            Icon={Plus}
            onSelect={(value) => handleAddInside(value)}
          />
        </div>
      );
    }

    const resolved = resolveRef(node.$ref, definitions);
    const effectiveNode = resolved ?? node;
    const children = getChildren(effectiveNode);
    return (
      <div>
        <div
          onClick={() => {
            setSelectedElement(effectiveNode);
          }}
          style={{ paddingLeft: depth * 14 }}
          className={
            effectiveNode.id === selectedElemet?.id
              ? "flex items-center justify-between gap-2  cursor-pointer  rounded-md bg-blue-50 px-2"
              : "flex items-center justify-between gap-2 py-1 cursor-pointer rounded-md  hover:border hover:border-blue-50 px-2"
          }
        >
          <span className="text-sm font-medium">
            {getDisplayName(effectiveNode)}
          </span>
          {elementLibrary.find((item) => item.value === effectiveNode.element)
            ?.excludeDropDown ? (
            ""
          ) : (
            <Dropdown
              data={elementLibrary}
              classname=""
              Icon={Plus}
              onSelect={(value) => handleAddInside(value)}
            />
          )}
        </div>

        {children.map((child, i) => (
          <TreeNode
            key={i}
            node={child}
            definitions={definitions}
            depth={depth + 1}
          />
        ))}
      </div>
    );
  },
);

function ElementContainer() {
  const { data } = useEditor();
  return (
    <div className="h-screen border-r bg-white">
      <div className="p-2  h-[calc(100vh-64px)] overflow-y-scroll scrollbar-xs gap-2">
        <TreeNode node={data} definitions={data.definitions} depth={0} />
      </div>
    </div>
  );
}

export default ElementContainer;
