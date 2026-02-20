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

function Box({ data, onChange, name }: IGlobalElementProps) {
  const { register, reset, handleSubmit, control } =
    useForm<TGlobalElementProps>({
      resolver: zodResolver(BoxSchema),
      defaultValues: {},
    });

  const proprerty = tailwindToStyleObject(data);

  useEffect(() => {
    reset(proprerty);
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
                      <label htmlFor="backgroundColor">Backgorund Color</label>
                      <Input
                        type="color"
                        id="backgroundColor"
                        {...register("backgroundColor")}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>
                    <label htmlFor="width">Width</label>
                    <Input type="text" id="width" {...register("width")} />
                  </div>
                  <div>
                    <label htmlFor="height">Height</label>
                    <Input type="text" id="height" {...register("height")} />
                  </div>
                </div>
                <div>
                  <div className="flex gap-2">
                    <div>
                      <label htmlFor="padding">Padding</label>
                      <Input
                        type="number"
                        id="padding"
                        {...register("padding")}
                      />
                    </div>
                    <div>
                      <label htmlFor="margin">Margin</label>
                      <Input
                        type="number"
                        id="margin"
                        {...register("margin")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Position">
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
          </AccordionItem>
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
