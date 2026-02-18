import { useEditor } from "@/shared/hooks/editorProvider";
import BoxForm from "../../elemets/elementFrom/box";
import type { ElementNode, StyleKey } from "@/shared/types/elementNode";
import { mergeTailwindClasses } from "@/lib/helper";
type ElementFormProps<T> = {
  data: T;
  onChange: (data: T) => void;
  name: string;
};

type ComponentFactory = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Box: React.FC<ElementFormProps<any>>;
};

const componentFactory: ComponentFactory = {
  Box: BoxForm,
};

function updateNodeClassName(
  nodes: ElementNode[],
  id: string,
  className: string,
): ElementNode[] {
  return nodes.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        props: {
          ...node.props,
          className,
        },
      };
    }

    if (node.children?.length) {
      return {
        ...node,
        children: updateNodeClassName(node.children, id, className),
      };
    }

    return node;
  });
}

function ElementPropertis() {
  const { selectedElemet, setData } = useEditor();

  if (!selectedElemet) return <div>No selection</div>;

  const Component =
    componentFactory[(selectedElemet?.element as keyof ComponentFactory) ?? ""];

  if (!Component) {
    return (
      <div className="justify-center items-center align-middle">
        No editor available
      </div>
    );
  }
  if (!selectedElemet.props?.className)
    return (
      <div className="justify-center items-center align-middle">
        No editor available
      </div>
    );
  const handleUpdate = (data: Partial<Record<StyleKey, string | number>>) => {
    setData((prev) => ({
      ...prev,
      layout: updateNodeClassName(
        prev.layout!,
        selectedElemet.id!,
        mergeTailwindClasses(selectedElemet.props?.className || "", data),
      ),
    }));
    return;
  };

  return (
    <Component
      data={selectedElemet.props?.className}
      onChange={handleUpdate}
      name={selectedElemet.element!}
    />
  );
}

export default ElementPropertis;
