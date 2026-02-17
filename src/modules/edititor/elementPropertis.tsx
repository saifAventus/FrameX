import { useEditor } from "@/shared/hooks/editorProvider";
import BoxForm from "./elementFrom/box";
import { mergeTailwindClasses } from "@/lib/helper";
import type { StyleKey } from "@/shared/types/elementNode";
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

function ElementPropertis() {
  const { selectedElemet } = useEditor();

  if (!selectedElemet) return <div>No selection</div>;

  const Component =
    componentFactory[(selectedElemet?.element as keyof ComponentFactory) ?? ""];
  console.log(selectedElemet);
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
    console.log(
      mergeTailwindClasses(selectedElemet.props?.className || "", data),
    );
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
