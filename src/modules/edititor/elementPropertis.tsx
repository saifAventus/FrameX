import BoxForm from "../../elemets/elementFrom/box";
import TextForm from "@/elemets/elementFrom/text";
import { useEditor } from "@/shared/hooks/editorProvider";
import pageEditorService from "@/srevice/pageEdititor/pageEdititorService";
import EmptyState from "@/shared/ui/fallbackNoData";
import ImgForm from "@/elemets/elementFrom/image";
type ElementFormProps<T> = {
  data: T;
  onChange: (data: T) => void;
  name: string;
};

type ComponentFactory = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Box: React.FC<ElementFormProps<any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Text: React.FC<ElementFormProps<any>>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Image: React.FC<ElementFormProps<any>>;
};

const componentFactory: ComponentFactory = {
  Box: BoxForm,
  Text: TextForm,
  Image: ImgForm,
};

function ElementPropertis() {
  const { selectedElement, handleReRender } = useEditor();

  if (!selectedElement) return <EmptyState />;

  const Component =
    componentFactory[
      (selectedElement?.element as keyof ComponentFactory) ?? ""
    ];

  if (!Component || !selectedElement.props?.className) {
    return <EmptyState />;
  }

  const handleUpdate = async (className: string) => {
    try {
      const response = await pageEditorService.updateJson({
        id: selectedElement.id!,
        updated: className,
        elementType: "className",
      });
      console.log(response);
      handleReRender();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Component
      data={selectedElement.props?.className}
      onChange={handleUpdate}
      name={selectedElement.element!}
    />
  );
}

export default ElementPropertis;
