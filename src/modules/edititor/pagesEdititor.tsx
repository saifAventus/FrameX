import jsonData from "../../assets/dummy.json";
import ElementConatiner from "./elementConatiner";
import { EditorProvider } from "../../shared/hooks/editorProvider";
import ElementPropertis from "./elementPropertis";

function PagesEdititor() {
  return (
    <EditorProvider initialData={jsonData}>
      <div className="text-black  grid grid-cols-4">
        <div className="col-span-1 bg-white border border-[#e4e6eb]">
          <ElementConatiner />
        </div>
        <div className="col-span-2 bg-white border  border-[#e4e6eb]">
          Preview
        </div>
        <div className="col-span-1 bg-white border border-[#e4e6eb]">
          <ElementPropertis />
        </div>
      </div>
    </EditorProvider>
  );
}

export default PagesEdititor;
