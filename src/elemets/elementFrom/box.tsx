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
import {
  breakValue,
  handleStringConversion,
  parseTailwindToForm,
} from "@/lib/helper";
import MultiChoiceChip from "../elementComponents/muiltiChoiceChip";
import Dropdown from "../elementComponents/dropdown";
import { ChevronDown } from "lucide-react";

function Box({ data, onChange, name }: IGlobalElementProps) {
  const { register, reset, handleSubmit, control, watch } =
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

  const handleValueChange = (v: string, unit: string) => {
    const cleaned = v.replace(/[^\d.]/g, "");
    return `${cleaned}${unit}`;
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
                      <div className="flex flex-row items-center gap-1">
                        <Controller
                          name="p"
                          control={control}
                          render={({ field }) => {
                            const { value, unit } = breakValue(
                              field.value || "0px",
                            );
                            return (
                              <div className="flex gap-2 items-center">
                                <Input
                                  type="text"
                                  value={value}
                                  onChange={(e) =>
                                    field.onChange(
                                      handleValueChange(e.target.value, unit),
                                    )
                                  }
                                />

                                <Dropdown
                                  data={sizeType}
                                  value={unit}
                                  onChange={(e) =>
                                    field.onChange(`${value || 0}${e}`)
                                  }
                                  Icon={ChevronDown}
                                  type="text"
                                />
                              </div>
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="m">Margin</label>
                      <div className="flex flex-row items-center gap-1">
                        <Controller
                          name="m"
                          control={control}
                          render={({ field }) => {
                            const { value, unit } = breakValue(
                              field.value || "0px",
                            );

                            return (
                              <div className="flex gap-2 items-center">
                                <Input
                                  type="text"
                                  value={value}
                                  onChange={(e) =>
                                    field.onChange(
                                      handleValueChange(e.target.value, unit),
                                    )
                                  }
                                />

                                <Dropdown
                                  data={sizeType}
                                  value={unit}
                                  onChange={(e) =>
                                    field.onChange(`${value || 0}${e}`)
                                  }
                                  Icon={ChevronDown}
                                  type="text"
                                />
                              </div>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <label htmlFor="w">Width</label>
                    <div className="flex flex-row items-center gap-1">
                      <Controller
                        name="w"
                        control={control}
                        render={({ field }) => {
                          const { value, unit } = breakValue(
                            field.value || "0px",
                          );
                          return (
                            <div className="flex gap-2 items-center">
                              <Input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                  field.onChange(
                                    handleValueChange(e.target.value, unit),
                                  )
                                }
                              />

                              <Dropdown
                                data={sizeType}
                                value={unit}
                                onChange={(e) =>
                                  field.onChange(`${value || 0}${e}`)
                                }
                                Icon={ChevronDown}
                                type="text"
                              />
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="h">Height</label>
                    <div className="flex flex-row items-center gap-1">
                      <Controller
                        name="h"
                        control={control}
                        render={({ field }) => {
                          const { value, unit } = breakValue(
                            field.value || "0px",
                          );
                          return (
                            <div className="flex gap-2 items-center">
                              <Input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                  field.onChange(
                                    handleValueChange(e.target.value, unit),
                                  )
                                }
                              />
                              <Dropdown
                                data={sizeType}
                                value={unit}
                                onChange={(e) =>
                                  field.onChange(`${value || 0}${e}`)
                                }
                                Icon={ChevronDown}
                                type="text"
                              />
                            </div>
                          );
                        }}
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
                  name="flexDirection"
                  render={({ field }) => {
                    return (
                      <MultiChoiceChip
                        data={flexRow}
                        value={field.value!}
                        onSelect={(value) => {
                          field.onChange(value);
                          handleUpdate({ ...watch(), align: value });
                        }}
                      />
                    );
                  }}
                />
              </div>
              <div>
                <label htmlFor="justify">justify Content</label>
                <Controller
                  control={control}
                  name="justify"
                  render={({ field }) => {
                    return (
                      <MultiChoiceChip
                        className="grid grid-cols-2 grid-rows-2"
                        data={justifyItem}
                        value={field.value!}
                        onSelect={(value) => {
                          field.onChange(value);
                          handleUpdate({ ...watch(), justify: value });
                        }}
                      />
                    );
                  }}
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

const sizeType = [
  {
    label: "px",
    value: "px",
  },
  {
    label: "rem",
    value: "rem",
  },
  {
    label: "%",
    value: "%",
  },
];

const justifyItem = [
  {
    label: "start",
    value: "start",
  },
  {
    label: "end",
    value: "end",
  },
  {
    label: "center",
    value: "center",
  },
  {
    label: "between",
    value: "between",
  },
  {
    label: "around",
    value: "around",
  },
  {
    label: "evenly",
    value: "evenly",
  },
];

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
