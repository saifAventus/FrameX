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

import type {
  IGlobalElementProps,
  TGlobalElementProps,
} from "@/shared/types/elementNode";
import { handleStringConversion, parseTailwindToForm } from "@/lib/helper";
import MultiChoiceChip from "../elementComponents/muiltiChoiceChip";

function Box({ data, onChange, name }: IGlobalElementProps) {
  const { register, reset, handleSubmit, control, watch, setValue } =
    useForm<TGlobalElementProps>({
      resolver: zodResolver(BoxSchema),
      defaultValues: {},
    });

  useEffect(() => {
    reset(parseTailwindToForm(data!));
  }, [data]);

  const handleUpdate = (formData: TGlobalElementProps) => {
    onChange(handleStringConversion(formData, data));
  };
  return (
    <div className="p-2 border border-gray-200 rounded-md">
      <div>
        <h1>{name}</h1>
      </div>
      <form
        className="flex flex-col gap-2"
        onChange={handleSubmit((formData) => handleUpdate(formData))}
      >
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
          <AccordionItem value="Position">
            <AccordionTrigger className="text-black">Position</AccordionTrigger>
            <AccordionContent>
              {/* <div className="flex flex-col gap-2">
            

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
              </div> */}
              <div className="flex gap-2">
                <div>
                  <label htmlFor="w">background color</label>
                  <Input
                    type="color"
                    id="bg"
                    {...register("bg")}
                    defaultValue={"#ffffff"}
                  />
                </div>
                <div>
                  <label htmlFor="border">border color</label>
                  <Input
                    type="color"
                    id="border"
                    {...register("border")}
                    defaultValue={"#ffffff"}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="flexDirection">Flex Direction</label>
                <Controller
                  control={control}
                  {...register("flexDirection")}
                  render={({ field }) => (
                    <MultiChoiceChip
                      data={flexRow}
                      value={field.value!}
                      onSelect={(value) => {
                        field.onChange(value); // <-- updates the form state properly
                        handleUpdate({ ...watch(), align: value }); // <-- call your custom update
                      }}
                    />
                  )}
                />
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
    value: "flex-row",
  },
  {
    label: "column",
    value: "flex-col",
  },
];

// const justifyItem = [
//   {
//     label: "justify-start",
//     value: "justify-start",
//   },
//   {
//     label: "justify-end",
//     value: "justify-end",
//   },
//   {
//     label: "justify-center",
//     value: "justify-center",
//   },
//   {
//     label: "justify-between",
//     value: "justify-between",
//   },
//   {
//     label: "justify-around",
//     value: "justify-around",
//   },
//   {
//     label: "justify-evenly",
//     value: "justify-evenly",
//   },
// ];

// const alignItems = [
//   {
//     label: "align-start",
//     value: "align-start",
//   },
//   {
//     label: "align-end",
//     value: "align-end",
//   },
//   {
//     label: "align-center",
//     value: "align-center",
//   },
//   {
//     label: "align-stretch",
//     value: "align-stretch",
//   },
// ];
