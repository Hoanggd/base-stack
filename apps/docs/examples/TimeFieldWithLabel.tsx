import { BsTimeField } from "@workspace/ui/components/datefield";
import { Label } from "@workspace/ui/components/field";

export function TimeFieldWithLabel() {
  return (
    <div>
      <Label>Time</Label>
      <BsTimeField className="w-[72px]" />
    </div>
  );
}
