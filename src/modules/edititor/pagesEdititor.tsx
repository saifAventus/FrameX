import { EditorProvider } from "../../shared/hooks/editorProvider";
import ElementContainer from "./elementContainer";
import ElementPropertis from "./elementPropertis";
// import js from "../../assets/dummy.json";
import PreviewEditior from "./previewEditior";

function PagesEdititor() {
  return (
    // <EditorProvider initialData={js}>
    <EditorProvider>
      <div className="text-black  grid grid-cols-5">
        <div className="col-span-1 bg-white border border-[#e4e6eb] overflow-y-hidden">
          <div className="px-4 py-3 border-b font-semibold">Elements Tree</div>
          <ElementContainer />
        </div>
        <div className="col-span-3 bg-white border  border-[#e4e6eb]">
          <PreviewEditior />
        </div>
        <div className="col-span-1 bg-white border border-[#e4e6eb]">
          <ElementPropertis />
        </div>
      </div>
    </EditorProvider>
  );
}

export default PagesEdititor;
