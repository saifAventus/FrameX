import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import BoxSchema from "@/schema/elemetSchema/globalElemetSchema";
import { useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { tailwindToStyleObject } from "@/lib/helper";
import type {
  IGlobalElementProps,
  TGlobalElementProps,
} from "@/shared/types/elementNode";
import MultiChoiceChip from "../elementComponents/muiltiChoiceChip";
import Dropdown from "../elementComponents/dropdown";

export interface LayoutForm {
  p?: number;
  m?: number;
  // flexDirection?: "row" | "column";
  // justifyContent?: string;
  // alignItems?: string;
  w?: string;
  h?: string;
  // backgroundColor?: string;
}

const CLASS_PREFIX = ["p-", "m-", "w-[", "h-["];

export function buildTailwindFromForm(
  form: LayoutForm,
  existing: string,
): string {
  const tokens = existing.split(/\s+/).filter(Boolean);

  // remove only controlled classes
  const cleaned = tokens.filter((cls) => {
    return !CLASS_PREFIX.some((prefix) => cls.startsWith(prefix));
  });

  if (form.p !== undefined) cleaned.push(`p-${form.p}`);
  if (form.m !== undefined) cleaned.push(`m-${form.m}`);
  if (form.w) cleaned.push(`w-${form.w}`);
  if (form.h) cleaned.push(`h-${form.h}`);

  return cleaned.join(" ");
}

export function parseTailwindToForm(className: string) {
  const form: LayoutForm = {};

  const tokens = className.split(/\s+/);

  for (const t of tokens) {
    if (t.startsWith("p-")) form.p = Number(t.slice(2));
    if (t.startsWith("m-")) form.m = Number(t.slice(2));

    // if (t === "flex-row") form.flexDirection = "row";
    // if (t === "flex-col") form.flexDirection = "column";

    // if (t.startsWith("justify-"))
    //   form.justifyContent = t.replace("justify-", "");
    // if (t.startsWith("items-")) form.alignItems = t.replace("items-", "");

    if (t.startsWith("w-")) form.w = t.slice(2);
    if (t.startsWith("h-")) form.h = t.slice(2);

    // if (t.startsWith("bg-[")) form.backgroundColor = t.slice(4, -1);
  }

  return form;
}

function Box({ data, onChange, name }: IGlobalElementProps) {
  const { register, reset, handleSubmit, control, watch } =
    useForm<TGlobalElementProps>({
      resolver: zodResolver(BoxSchema),
      defaultValues: {},
    });

  useEffect(() => {
    reset(parseTailwindToForm(data!));
  }, [data]);

  return (
    <div className="p-2 border border-gray-200 rounded-md">
      <div>
        <h1>{name}</h1>
      </div>
      <form className="flex flex-col gap-2" onChange={handleSubmit(onChange)}>
        <Accordion defaultValue={["Layout"]} type="multiple">
          <AccordionItem value="Layout">
            <AccordionTrigger className="text-black">Layout</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex gap-2">
                    <div>
                      <label htmlFor="p">Padding</label>
                      <Input type="number" id="p" {...register("p")} />
                    </div>
                    <div>
                      <label htmlFor="m">Margin</label>
                      <Input type="number" id="m" {...register("m")} />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>
                    <label htmlFor="w">Width</label>
                    <Input type="text" id="w" {...register("w")} />
                  </div>
                  <div>
                    <label htmlFor="h">Height</label>
                    <Input type="text" id="h" {...register("h")} />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* <AccordionItem value="Position">
            <AccordionTrigger className="text-black">Position</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                <label htmlFor="flexDirection">Flex Direction</label>
                <Controller
                  name="flexDirection"
                  control={control}
                  render={({ field }) => (
                    <MultiChoiceChip
                      data={flexRow}
                      value={field.value!}
                      onSelect={(value) => field.onChange(value)}
                    />
                  )}
                />

                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <label htmlFor="justifyContent">Justify Content</label>
                    <Controller
                      name="justifyContent"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          data={justifyItem}
                          onSelect={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="alignItems">Align Items</label>
                    <Controller
                      name="alignItems"
                      control={control}
                      render={({ field }) => (
                        <Dropdown data={alignItems} onSelect={field.onChange} />
                      )}
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </form>
    </div>
  );
}

export default Box;

const flexRow = [
  {
    label: "row",
    value: "row",
  },
  {
    label: "column",
    value: "column",
  },
];

const justifyItem = [
  {
    label: "justify-start",
    value: "justify-start",
  },
  {
    label: "justify-end",
    value: "justify-end",
  },
  {
    label: "justify-center",
    value: "justify-center",
  },
  {
    label: "justify-between",
    value: "justify-between",
  },
  {
    label: "justify-around",
    value: "justify-around",
  },
  {
    label: "justify-evenly",
    value: "justify-evenly",
  },
];

const alignItems = [
  {
    label: "align-start",
    value: "align-start",
  },
  {
    label: "align-end",
    value: "align-end",
  },
  {
    label: "align-center",
    value: "align-center",
  },
  {
    label: "align-stretch",
    value: "align-stretch",
  },
];
