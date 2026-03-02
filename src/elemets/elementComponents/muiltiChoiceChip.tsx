import type { ISelectData } from "./dropdown";

function MultiChoiceChip({
  data,
  onSelect,
  value,
  className,
}: ISelectData<string | number>) {
  return (
    <>
      <div
        className={
          className
            ? `${className} gap-2 `
            : `flex flex-row gap-2 justify-between `
        }
      >
        {data?.map((obj) => {
          return (
            <div
              key={obj.value}
              className={
                value === obj.value
                  ? `border items-center justify-center border-gray-200 rounded-md p-2  w-full flex flex-row gap-2  bg-black text-white`
                  : `border items-center justify-center border-gray-200 rounded-md p-2  w-full flex flex-row gap-2  hover:border hover:border-black`
              }
              onClick={() => onSelect(obj.value)}
            >
              {obj.icon ? <obj.icon /> : ""}
              <p>{obj.label}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MultiChoiceChip;
