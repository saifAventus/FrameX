function PagesEdititor() {
  return (
    <div className="text-black flex grid grid-cols-4">
      <div className="col-span-1 bg-white border border-[#e4e6eb]">
        {" "}
        Container
      </div>
      <div className="col-span-2 bg-white border  border-[#e4e6eb]">
        Preview{" "}
      </div>
      <div className="col-span-1 bg-white border border-[#e4e6eb]">
        Properties
      </div>
    </div>
  );
}

export default PagesEdititor;
