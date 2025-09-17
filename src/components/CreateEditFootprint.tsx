import {Button} from "@/components/ui/button.tsx";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet.tsx";
import {useEffect, useState} from "react";
import type {Footprint} from "@/Models/Footprint.ts";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";

export function CreateEditFootprint({open, footprint, cb}: {
    open: boolean
    footprint: Footprint | undefined,
    cb: (footprint: Footprint | undefined) => void;
}) {

    const [metric, setMetric] = useState<string | undefined>();
    const [imperial, setImperial] = useState<string | undefined>();

    function buildFootprint(): Footprint {
        return {
            id: footprint?.id || null,
            metric: metric || "",
            imperial: imperial || "",
        };
    }

    function isSavable(): boolean {
        if (metric == "") {
            return false
        }

        if (imperial == "") {
            return false
        }

        return true
    }

    useEffect(() => {
        setMetric(footprint?.metric)
        setImperial(footprint?.imperial)
    }, [footprint])

    return (
        <Sheet open={open}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{(footprint ? "Edit" : "New") + " Footprint"}</SheetTitle>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Metric</Label>
                        <Input
                            value={metric}
                            onChange={e => setMetric(e.target.value)}
                            id="sheet-demo-name"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Imperial</Label>
                        <Input
                            value={imperial}
                            onChange={e => setImperial(e.target.value)}
                            id="sheet-demo-name"
                        />
                    </div>
                </div>

                <SheetFooter>
                    <Button disabled={!isSavable()} onClick={() => cb(buildFootprint())}>Save changes</Button>
                    <SheetClose asChild>
                        <Button onClick={() => cb(undefined)} variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
