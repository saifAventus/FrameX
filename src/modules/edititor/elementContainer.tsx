import Dropdown from "@/elemets/elementComponents/dropdown";
import {
  createNode,
  getChildren,
  getDisplayName,
  resolveRef,
} from "@/lib/helper";
import { elementLibrary } from "@/lib/utils";
import { useEditor } from "@/shared/hooks/editorProvider";
import type { ElementNode } from "@/shared/types/elementNode";
import pageEditorService from "@/srevice/pageEdititor/pageEdititorService";
import { Plus, Trash, Layers } from "lucide-react";

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
    const { selectedElement, setSelectedElement, handleReRender } = useEditor();

    // Move variable declaration to top to prevent ReferenceError in empty object check
    const resolved = resolveRef(node.$ref, definitions);
    const effectiveNode = resolved ?? node;
    const children = getChildren(effectiveNode);

    const isSelected = effectiveNode.id === selectedElement?.id;

    const handleAddInside = async (type: string) => {
      if (!selectedElement) return;
      const newNode = createNode(type);
      try {
        const response = await pageEditorService.addJson({
          parentId: selectedElement.id!,
          newNode,
        });
        if (!response.data.isSuccess) {
          console.log("failed");
        }
        handleReRender();
      } catch (error) {
        console.error(error);
      }
    };

    const handleDelete = async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        const response = await pageEditorService.deleteJson(effectiveNode.id!);
        if (response.status === 200) {
          handleReRender();
          setSelectedElement(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!Object.keys(node).length) {
      return (
        <div
          onClick={() => setSelectedElement(effectiveNode)}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          className={`group flex items-center justify-between gap-2 py-1.5 pr-2 my-0.5 cursor-pointer rounded-md transition-colors ${
            isSelected
              ? "bg-blue-50 text-blue-700"
              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Layers
              size={14}
              className={isSelected ? "text-blue-500" : "text-gray-400"}
            />
            <span className="text-xs font-medium truncate">Empty Layer</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Dropdown
              data={elementLibrary}
              Icon={Plus}
              onChange={(value) => handleAddInside(value as string)}
            />
          </div>
        </div>
      );
    }

    const excludeDropDown = elementLibrary.find(
      (item) => item.value === effectiveNode.element,
    )?.excludeDropDown;

    return (
      <div className="flex flex-col w-full">
        <div
          onClick={() => setSelectedElement(effectiveNode)}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          className={`group flex items-center justify-between gap-2 py-1.5 pr-2 my-0.5 cursor-pointer rounded-md transition-colors border border-transparent ${
            isSelected
              ? "bg-blue-50 border-blue-100 text-blue-700 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              : "hover:bg-gray-100 hover:border-gray-200/50 text-gray-600 hover:text-gray-900"
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Layers
              size={14}
              className={`shrink-0 ${isSelected ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"}`}
            />
            <span
              className={`text-xs truncate ${isSelected ? "font-semibold" : "font-medium"}`}
            >
              {getDisplayName(effectiveNode)}
            </span>
          </div>

          <div
            className={`flex flex-row gap-1 items-center transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          >
            {!excludeDropDown && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex text-gray-400 hover:text-blue-600"
              >
                <Dropdown
                  data={elementLibrary}
                  Icon={Plus}
                  onChange={(value) => handleAddInside(value as string)}
                />
              </div>
            )}
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
              title="Delete layer"
            >
              <Trash size={14} />
            </button>
          </div>
        </div>

        <div className="w-full">
          {children.map((child, i) => (
            <TreeNode
              key={i}
              node={child}
              definitions={definitions}
              depth={depth + 1}
            />
          ))}
        </div>
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
