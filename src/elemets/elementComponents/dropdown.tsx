import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
export type Tdata = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export interface ISelectData {
  data?: Tdata[];
  classname?: string;
  Icon?: LucideIcon;
  onSelect: (value: string) => void;
  value?: string | number;
  title?: string;
}

function Dropdown({ data, Icon, onSelect }: ISelectData) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div ref={ref} className="inline-block flex-row ">
        <button
          onClick={() => setOpen((v) => !v)}
          className="bg-transparent text-black text-wrap"
        >
          {Icon ? <Icon /> : "Select"}
        </button>

        {open && (
          <div className="w-fit  scrollbar-xs rounded shadow-sm flex flex-col space-y-2 max-h-48 overflow-y-scroll scrollbar-thin absolute z-100  bg-white ">
            {data?.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  onSelect(item.value);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100"
              >
                {item.icon && <item.icon />}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Dropdown;
