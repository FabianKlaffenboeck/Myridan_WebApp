import {Button} from "@/components/ui/button.tsx";
import {Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import type {Footprint} from "@/Models/Footprint.ts";
import type {Manufacturer} from "@/Models/Manufacturer.ts";
import type {PartType} from "@/Models/PartType.ts";
import type {Shelf} from "@/Models/Shelf.ts";
import type {Part} from "@/Models/Part.ts";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {SearchableSelect} from "@/components/searchableSelect.tsx";
import type {ElectricalUnit} from "@/Models/ElectricalUnit.ts";
import {getFootprints} from "@/api/Footprint_API.ts";
import {getElectricalUnits} from "@/api/ElectricalUnit_API.ts";
import {getManufacturers} from "@/api/Manufacturer_API.ts";
import {getPartTypes} from "@/api/PartType_API.ts";
import {getShelfs} from "@/api/Shelf_API.ts";
import {useEffect, useState} from "react";
import type {Tray} from "@/Models/Tray.ts";
import {getEmptyTrays} from "@/api/Tray_API.ts";

export function CreateEditPart({open, part, cb}: {
    open: boolean
    part: Part | undefined,
    cb: (part: Part | undefined) => void;
}) {

    const [footprints, setFootprints] = useState<Footprint[]>([]);
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [partTypes, setPartTypes] = useState<PartType[]>([]);
    const [shelfs, setShelfs] = useState<Shelf[]>([]);
    const [trays, setTrays] = useState<Tray[]>([]);
    const [electricalUnits, setElectricalUnits] = useState<ElectricalUnit[]>([]);


    const [name, setName] = useState<string | undefined>();
    const [value, setValue] = useState<number | undefined>();
    const [quantity, setQuantity] = useState<number | undefined>();
    const [electricalUnit_id, setElectricalUnit_id] = useState<number | undefined>();
    const [footprint_id, setFootprint_id] = useState<number | undefined>();
    const [partType_id, setPartType_id] = useState<number | undefined>();
    const [manufacturer_id, setManufacturer_id] = useState<number | undefined>();
    const [tray_id, setTray_id] = useState<number | undefined>();

    function buildPart(): Part {
        return {
            id: part?.id || null,
            name: name || "",
            quantity: quantity || 0,
            value: value || null,
            electricalUnit: electricalUnit_id ? electricalUnits[electricalUnit_id] : null,
            footprint: footprints.find(it => it.id == footprint_id) || null,
            partType: partTypes.find(it => it.id == partType_id)!,
            manufacturer: manufacturers.find(it => it.id == manufacturer_id)!,
            tray: trays.find(it => it.id == tray_id)!,
        };
    }

    function isSavable(): boolean {
        if (quantity == undefined) {
            return false
        }
        if (footprint_id == undefined) {
            return false
        }
        if (partType_id == undefined) {
            return false
        }
        if (manufacturer_id == undefined) {
            return false
        }
        if (tray_id == undefined) {
            return false
        }
        return true
    }

    useEffect(() => {
        setName(part?.name)
        setValue(part?.value || undefined)
        setQuantity(part?.quantity)
        setElectricalUnit_id(electricalUnits.findIndex(it => it === part?.electricalUnit))
        setFootprint_id(part?.footprint?.id || undefined)
        setPartType_id(part?.partType.id || undefined)
        setManufacturer_id(part?.manufacturer.id || undefined)
        setTray_id(part?.tray.id || undefined)
    }, [electricalUnits, part])

    useEffect(() => {
        getFootprints()
            .then((data) => setFootprints(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        getElectricalUnits()
            .then((data) => setElectricalUnits(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        getManufacturers()
            .then((data) => setManufacturers(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        getPartTypes()
            .then((data) => setPartTypes(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        getShelfs()
            .then((data) => setShelfs(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        getEmptyTrays()
            .then((data) => setTrays(data))
            .catch((error) => console.error('Error:', error));
    }, []);


    return (
        <Sheet open={open}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{(part ? "Edit" : "New") + " Part"}</SheetTitle>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 px-4">

                    {/*name: string*/}
                    <div className="grid gap-3">
                        <Label>Name</Label>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    {/*quantity: number*/}
                    <div className="grid gap-3">
                        <Label>Quantity</Label>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    {/*value: number | null*/}
                    <div className="grid gap-3">
                        <Label>Value</Label>
                        <Input
                            type="number"
                            value={value}
                            onChange={e => setValue(Number(e.target.value))}
                        />
                    </div>

                    {/*electricalUnit: ElectricalUnit | null*/}
                    <div className="grid gap-3">
                        <Label>ElectricalUnit</Label>
                        <SearchableSelect
                            placeholder={"ElectricalUnit"}
                            elements={electricalUnits.map((it, index) => ({id: index, label: it.toString()}))}
                            value={electricalUnit_id}
                            setValue={setElectricalUnit_id}
                        ></SearchableSelect>
                    </div>

                    {/*footprint: Footprint | null*/}
                    <div className="grid gap-3">
                        <Label>Footprint</Label>
                        <SearchableSelect
                            placeholder={"Footprint"}
                            elements={footprints.map(({id, metric}) => ({id: id!, label: metric}))}
                            value={footprint_id}
                            setValue={setFootprint_id}
                        ></SearchableSelect>
                    </div>

                    {/*partType: PartType*/}
                    <div className="grid gap-3">
                        <Label>PartType</Label>
                        <SearchableSelect
                            placeholder={"PartType"}
                            elements={partTypes.map(({id, name}) => ({id: id!, label: name}))}
                            value={partType_id}
                            setValue={setPartType_id}
                        ></SearchableSelect>
                    </div>

                    {/*manufacturer: Manufacturer*/}
                    <div className="grid gap-3">
                        <Label>Manufacturer</Label>
                        <SearchableSelect
                            placeholder={"Manufacturer"}
                            elements={manufacturers.map(({id, name}) => ({id: id!, label: name}))}
                            value={manufacturer_id}
                            setValue={setManufacturer_id}
                        ></SearchableSelect>
                    </div>

                    {/*tray: Tray*/}
                    <div className="grid gap-3">
                        <Label>Tray</Label>
                        <SearchableSelect
                            placeholder={"Tray"}
                            elements={trays.map(({id, name}) => ({
                                id: id!,
                                label: shelfs.find(shelf => shelf.trays.find(tray => tray.id == id))?.name + "-" + name
                            }))}
                            value={tray_id}
                            setValue={setTray_id}
                        ></SearchableSelect>
                    </div>
                </div>

                <SheetFooter>
                    <Button disabled={!isSavable()} onClick={() => cb(buildPart())}>Save changes</Button>
                    <SheetClose asChild>
                        <Button onClick={() => cb(undefined)} variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
