import React from "react";
import type { ISelectData } from "./dropdown";

function MultiChoiceChip({ data, onSelect, value }: ISelectData) {
  return (
    <>
      <div className="flex flex-row gap-2 justify-between">
        {data?.map((obj) => {
          return (
            <div
              key={obj.value}
              className={`border items-center justify-center border-gray-200 rounded-md p-2  w-full flex flex-row gap-2  ${value === obj.value ? "bg-black text-white" : "hover:border hover:border-black"}`}
              onClick={() => onSelect(obj.value)}
            >
              <obj.icon />
              <p>{obj.label}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MultiChoiceChip;
