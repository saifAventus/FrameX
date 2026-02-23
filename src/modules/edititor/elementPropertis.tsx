/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor } from "@/shared/hooks/editorProvider";
import BoxForm, {
  buildTailwindFromForm,
  type LayoutForm,
} from "../../elemets/elementFrom/box";
import { updateNodeID } from "@/lib/helper";
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

  const handleUpdate = (data: LayoutForm) => {
    console.log(data, "teh data is ");
    setData((prev) => ({
      ...prev,
      layout: updateNodeID(
        prev.layout!,
        selectedElemet.id!,
        buildTailwindFromForm(data, selectedElemet.props?.className || ""),
        "className",
      ),
    }));
    return;
  };
  console.log(data);
  return (
    <Component
      data={selectedElemet.props?.className}
      onChange={handleUpdate}
      name={selectedElemet.element!}
    />
  );
}

export default ElementPropertis;
