/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor } from "@/shared/hooks/editorProvider";
import BoxForm from "../../elemets/elementFrom/box";
import type { StyleKey } from "@/shared/types/elementNode";
import { mergeTailwindClasses, updateNodeID } from "@/lib/helper";
import TextForm from "@/elemets/elementFrom/text";
type ElementFormProps<T> = {
  data: T;
  onChange: (data: T) => void;
  name: string;
};

type ComponentFactory = {
  Box: React.FC<ElementFormProps<any>>;
  Text: React.FC<ElementFormProps<any>>;
};

const componentFactory: ComponentFactory = {
  Box: BoxForm,
  Text: TextForm,
};

function ElementPropertis() {
  const { selectedElemet, setData, data } = useEditor();

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
      layout: updateNodeID(
        prev.layout!,
        selectedElemet.id!,
        mergeTailwindClasses(selectedElemet.props?.className || "", data),
        "className",
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
