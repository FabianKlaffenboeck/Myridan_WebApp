import {useEffect, useState} from "react";
import {PartTypesTable} from "@/pages/Tables/partTypes-table.tsx";
import type {PartType} from "@/Models/PartType.ts";
import {CreateEditPartType} from "@/components/CreateEditPartType.tsx";
import {getPartTypes, updatePartType} from "@/api/PartType_API.ts";
import {toast} from "sonner";

export default function PartTypes() {
    const [partTypes, setPartTypes] = useState<PartType[]>([]);
    const [createEdit, setCreateEdit] = useState(false);

    function newCm_cb() {
        setCreateEdit(true)
    }

    function createEdit_cb(partType: PartType | undefined) {
        console.log(partType);
        setCreateEdit(false)

        if (partType == undefined) {
            return
        }

        updatePartType(partType)
            .then((newFootprint) => {
                if (partType?.id == null) {
                    toast("PartType has been Created!")
                    setPartTypes(prev => [...prev, newFootprint])
                } else {
                    setPartTypes(partTypes.map(it => it.id === partType.id ? partType : it))
                    toast("PartType has been Footprint!")
                }

                // setSelectedPart(undefined)
            })
            .catch((error) => {
                console.error('Error:', error)
                toast("Could not update PartType")
                // setSelectedPart(undefined)
            });
    }

    useEffect(() => {
        getPartTypes()
            .then((data) => setPartTypes(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <PartTypesTable data={partTypes} newCm_cb={newCm_cb}/>
            </div>
            <CreateEditPartType open={createEdit} partType={undefined} cb={createEdit_cb}></CreateEditPartType>
        </div>
    )
}
