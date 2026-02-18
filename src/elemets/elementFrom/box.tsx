import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import BoxSchema from "@/schema/elemetSchema/boxSchema";
import { useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { tailwindToStyleObject } from "@/lib/helper";

type Box = z.infer<typeof BoxSchema>;

interface BoxProps {
  data: string;
  onChange: (data: Box) => void;
  name: string;
}

function Box({ data, onChange, name }: BoxProps) {
  const { register, reset, handleSubmit } = useForm<Box>({
    resolver: zodResolver(BoxSchema),
    defaultValues: {},
  });

  const proprerty = tailwindToStyleObject(data);
  //   console.log("data", proprerty.padding, proprerty);
  useEffect(() => {
    reset(proprerty);
  }, [data]);

  return (
    <div className="p-2">
      <div>
        <h1>{name}</h1>
      </div>
      <form className="flex flex-col gap-2" onChange={handleSubmit(onChange)}>
        <Accordion defaultValue={["shipping"]} type="multiple">
          <AccordionItem value="shipping">
            <AccordionTrigger className="text-white">Layout</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex gap-2">
                    <div>
                      <label htmlFor="backgroundColor">Background</label>
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
        </Accordion>
      </form>
    </div>
  );
}

export default Box;
