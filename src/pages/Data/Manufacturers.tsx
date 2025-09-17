import {useEffect, useState} from "react";
import {ManufacturersTable} from "@/pages/Tables/manufacturer-table.tsx";
import type {Manufacturer} from "@/Models/Manufacturer.ts";
import {CreateEditManufacturer} from "@/components/CreateEditManufacturer.tsx";
import {getManufacturers} from "@/api/Manufacturer_API.ts";
import {updatePartType} from "@/api/PartType_API.ts";
import {toast} from "sonner";

export default function Manufacturers() {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [createEdit, setCreateEdit] = useState(false);

    function newCm_cb() {
        setCreateEdit(true)
    }

    function createEdit_cb(manufacturer: Manufacturer | undefined) {
        console.log(manufacturer);
        setCreateEdit(false)

        if (manufacturer == undefined) {
            return
        }

        updatePartType(manufacturer)
            .then((newFootprint) => {
                if (manufacturer?.id == null) {
                    toast("Manufacturer has been Created!")
                    setManufacturers(prev => [...prev, newFootprint])
                } else {
                    setManufacturers(manufacturers.map(it => it.id === manufacturer.id ? manufacturer : it))
                    toast("Manufacturer has been Footprint!")
                }

                // setSelectedPart(undefined)
            })
            .catch((error) => {
                console.error('Error:', error)
                toast("Could not update Manufacturer")
                // setSelectedPart(undefined)
            });
    }

    useEffect(() => {
        getManufacturers()
            .then((data) => setManufacturers(data))
            .catch((error) => console.error('Error:', error));
    }, []);


    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <ManufacturersTable data={manufacturers} newCm_cb={newCm_cb}/>
            </div>
            <CreateEditManufacturer open={createEdit} manufacturer={undefined}
                                    cb={createEdit_cb}></CreateEditManufacturer>
        </div>
    )
}
