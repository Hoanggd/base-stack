"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Popover,
  PopoverDialog,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { Switch } from "@workspace/ui/components/switch";

export function PopoverBottomRight() {
  return (
    <PopoverTrigger>
      <Button variant="outline">Settings</Button>
      <Popover placement="bottom right">
        <PopoverDialog>
          <div className="flex flex-col gap-4">
            <Switch defaultSelected>
              <div className="indicator" /> Wi-Fi
            </Switch>
            <Switch defaultSelected>
              <div className="indicator" /> Bluetooth
            </Switch>
            <Switch>
              <div className="indicator" /> Mute
            </Switch>
          </div>
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}
