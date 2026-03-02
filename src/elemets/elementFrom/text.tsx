import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { handleStringConversion, parseTailwindToForm } from "@/lib/helper";
import GlobalStyleScheme from "@/schema/elemetSchema/globalElemetSchema";
import type {
  IGlobalElementProps,
  TGlobalElementProps,
} from "@/shared/types/elementNode";
import { AlignCenter, AlignLeft, AlignRight, ChevronDown } from "lucide-react";
import MultiChoiceChip from "../elementComponents/muiltiChoiceChip";
import Dropdown from "../elementComponents/dropdown";

function TextForm({ data, onChange, name }: IGlobalElementProps) {
  const { reset, handleSubmit, control, watch } = useForm<TGlobalElementProps>({
    resolver: zodResolver(GlobalStyleScheme),
    defaultValues: {},
  });

  useEffect(() => {
    reset(parseTailwindToForm(data!));
  }, [data]);

  const handleUpdate = (formData: TGlobalElementProps) => {
    onChange(handleStringConversion(formData, data));
  };

  return (
    <div className="p-2">
      <div>
        <h1>{name}</h1>
      </div>
      <form
        className="flex flex-col gap-2"
        onChange={handleSubmit((formData) => handleUpdate(formData))}
      >
        <Accordion defaultValue={["shipping"]} type="multiple">
          <AccordionItem value="shipping">
            <AccordionTrigger className="text-white">Layout</AccordionTrigger>
            <AccordionContent>
              <div>
                <label htmlFor="textAlign">TEXT ALIGN</label>
                <Controller
                  name="textAlign"
                  control={control}
                  render={({ field }) => (
                    <MultiChoiceChip
                      data={textAlignData}
                      value={field.value!}
                      onSelect={(value) => {
                        field.onChange(value);
                        handleUpdate({ ...watch(), textAlign: value });
                      }}
                    />
                  )}
                />
              </div>

              <div className="flex flex-row items-center gap-1">
                <Controller
                  name="fontWeight"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="flex gap-2 items-center ">
                        <h4>Font Size</h4>
                        <Dropdown
                          data={textSize}
                          value={field.value! as string}
                          onChange={(value) => field.onChange(value)}
                          Icon={ChevronDown}
                          type="text"
                        />
                      </div>
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

export default TextForm;

const textAlignData = [
  {
    value: "left",
    label: "Left",
    icon: AlignLeft,
  },
  {
    value: "center",
    label: "Center",
    icon: AlignCenter,
  },
  {
    value: "right",
    label: "Right",
    icon: AlignRight,
  },
];

const textSize = [
  {
    value: "sm",
    label: "Small",
  },
  {
    value: "base",
    label: "Base",
  },
  {
    value: "lg",
    label: "Large",
  },
  {
    value: "xl",
    label: "Extra Large",
  },
  {
    value: "2xl",
    label: "Extra Large",
  },
  {
    value: "3xl",
    label: "Extra Large",
  },
  {
    value: "4xl",
    label: "Extra Large",
  },
  {
    value: "5xl",
    label: "Extra Large",
  },
  {
    value: "6xl",
    label: "Extra Large",
  },
];
