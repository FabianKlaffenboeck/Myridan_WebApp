import {Button} from "@/components/ui/button.tsx";
import {Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import type {Shelf} from "@/Models/Shelf.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {Trash2} from "lucide-react";
import type {Tray} from "@/Models/Tray.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import React from "react";

export function CreateEditStorage({open, shelf, cb}: {
    open: boolean
    shelf: Shelf | undefined;
    cb: (shelf: Shelf | undefined) => void;
}) {

    const [name, setName] = useState<string>("");
    const [trays, setTrays] = useState<{ internalId: number, data: Tray }[]>([{
        internalId: 0, data: {id: null, name: "000"}
    }]);

    function buildShelf(): Shelf {
        const tmpTrays: Tray[] = [];
        trays.forEach(it => {
            tmpTrays.push({id: it.data.id || null, name: it.data.name})
        })
        return {
            id: null, name: name, trays: tmpTrays
        };
    }

    function isSavable(): boolean {
        if (name == "") {
            return false
        }

        return true
    }

    useEffect(() => {
        setName(self.name)
        setTrays([])
    }, [shelf])

    function addTrayHandler() {
        setTrays([...trays, {
            internalId: trays.length, data: {id: null, name: (trays.length.toString().padStart(3, '0'))}
        }]);
    }

    return (
        <Sheet open={open}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{(shelf ? "Edit" : "New") + " Storage Location"}</SheetTitle>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Name</Label>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="sheet-demo-name"
                        />
                    </div>
                    <Separator/>

                    <Button onClick={addTrayHandler}>Add Tray</Button>

                    <ScrollArea className="h-150 w-90 rounded-md border">
                        {trays.map((internalTray) => (
                            <React.Fragment key={internalTray.internalId}>
                                <div className="flex items-center gap-2">
                                    <Input
                                        className="flex-1"
                                        value={internalTray.data.name}
                                        onChange={e => {
                                            const newName = e.target.value;
                                            setTrays(trays.map(it => it.internalId === internalTray.internalId ? {
                                                ...it,
                                                data: {...it.data, name: newName}
                                            } : it));
                                        }}
                                    />
                                    <Button variant="outline"
                                            onClick={() => setTrays(trays.filter(it => it.internalId != internalTray.internalId))}>
                                        <Trash2 className="text-muted-foreground cursor-pointer"/>
                                    </Button>
                                </div>
                                <Separator className="my-2"/>
                            </React.Fragment>
                        ))}
                    </ScrollArea>

                </div>

                <SheetFooter>
                    <Button disabled={!isSavable()} onClick={() => cb(buildShelf())}>Save changes</Button>
                    <SheetClose asChild>
                        <Button onClick={() => cb(undefined)} variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
