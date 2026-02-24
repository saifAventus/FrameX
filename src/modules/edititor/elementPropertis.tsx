/* eslint-disable @typescript-eslint/no-explicit-any */

import BoxForm from "../../elemets/elementFrom/box";
import TextForm from "@/elemets/elementFrom/text";
import { useEditor } from "@/shared/hooks/editorProvider";
import pageEditorService from "@/srevice/pageEdititor/pageEdititorService";
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
  const { selectedElement, handleReRender } = useEditor();

  if (!selectedElement) return <div>No selection</div>;

  const Component =
    componentFactory[
      (selectedElement?.element as keyof ComponentFactory) ?? ""
    ];

  if (!Component) {
    return (
      <div className="justify-center items-center align-middle">
        No editor available
      </div>
    );
  }
  if (!selectedElement.props?.className)
    return (
      <div className="justify-center items-center align-middle">
        No editor available
      </div>
    );

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
