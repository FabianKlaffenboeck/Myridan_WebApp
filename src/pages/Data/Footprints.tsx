import {useEffect, useState} from "react";
import {FootprintsTable} from "@/pages/Tables/footprint-table.tsx";
import type {Footprint} from "@/Models/Footprint.ts";
import {CreateEditFootprint} from "@/components/CreateEditFootprint.tsx";
import {getFootprints, updateFootprint} from "@/api/Footprint_API.ts";
import {toast} from "sonner";

export default function Footprints() {
    const [footprints, setFootprints] = useState<Footprint[]>([]);
    const [createEdit, setCreateEdit] = useState(false);

    function newCm_cb() {
        setCreateEdit(true)
    }

    function createEdit_cb(footprint: Footprint | undefined) {
        setCreateEdit(false)

        if (footprint == undefined) {
            return
        }

        updateFootprint(footprint)
            .then((newFootprint) => {
                if (footprint?.id == null) {
                    toast("Footprint has been Created!")
                    setFootprints(prev => [...prev, newFootprint])
                } else {
                    setFootprints(footprints.map(it => it.id === footprint.id ? footprint : it))
                    toast("Part has been Footprint!")
                }

                // setSelectedPart(undefined)
            })
            .catch((error) => {
                console.error('Error:', error)
                toast("Could not update Footprint")
                // setSelectedPart(undefined)
            });

    }

    useEffect(() => {
        getFootprints()
            .then((data) => setFootprints(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <FootprintsTable data={footprints} newCm_cb={newCm_cb}/>
            </div>
            <CreateEditFootprint open={createEdit} footprint={undefined} cb={createEdit_cb}></CreateEditFootprint>
        </div>
    )
}
