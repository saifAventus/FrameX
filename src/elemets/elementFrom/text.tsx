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
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import MultiChoiceChip from "../elementComponents/muiltiChoiceChip";

function TextForm({ data, onChange, name }: IGlobalElementProps) {
  const { reset, handleSubmit, control } = useForm<TGlobalElementProps>({
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
                <label htmlFor="textAlign">data</label>
                <Controller
                  name="align"
                  control={control}
                  render={({ field }) => (
                    <MultiChoiceChip
                      data={textAlignData}
                      onSelect={field.onChange}
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
