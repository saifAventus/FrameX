import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import React from "react";
export type Tdata = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

export interface ISelectData<T> {
  data?: Tdata[];
  classname?: string;
  Icon?: LucideIcon;
  onSelect: (value: T) => void;
  value?: T;
  title?: string;
  className?: string;
}
interface DropdownProps<T> {
  data: Array<{
    label: string;
    value: T;
    icon?: React.ComponentType;
  }>;
  value?: string;
  onChange: (value: T) => void;
  Icon?: React.ComponentType;
  type?: "text" | "select";
}

const Dropdown = React.memo(function Dropdown<T>({
  data,
  Icon,
  value,
  onChange,
  type,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!open) return;

    const handler = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [open]);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div ref={ref} className="relative inline-block">
      {type === "text" && text?.length ? (
        <div onClick={() => setOpen((v) => !v)} className="text-black">
          {text || value}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="bg-transparent"
        >
          {Icon ? <Icon /> : "Select"}
        </button>
      )}

      {open && (
        <div className="absolute flex flex-col gap-2 z-50 bg-white shadow rounded p-3  w-30 ">
          {data.map((item) => (
            <button
              key={item.value as string}
              type="button"
              onClick={() => {
                onChange(item.value);
                setOpen(false);
                setText(item.value as string);
              }}
              className="hover:underline cursor-pointer text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default Dropdown;
