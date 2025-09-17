import {useEffect, useState} from "react";
import {StorageTable} from "../Tables/storage-table";
import type {Shelf} from "@/Models/Shelf.ts";
import {getShelfs, updateShelf} from "@/api/Shelf_API.ts";
import {CreateEditStorage} from "@/components/CreateEditStorage.tsx";
import {toast} from "sonner";

export default function Storage() {

    const [shelfs, setShelfs] = useState<Shelf[]>([]);
    const [createEdit, setCreateEdit] = useState(false);

    function newCm_cb() {
        setCreateEdit(true)
    }

    function createEdit_cb(shelf: Shelf | undefined) {
        setCreateEdit(false)

        if (shelf == undefined) {
            return
        }

        updateShelf(shelf)
            .then((newShelf) => {
                if (shelf?.id == null) {
                    toast("Shelf has been Created!")
                    setShelfs(prev => [...prev, newShelf])
                } else {
                    // setShelfs(shelfs.map(it => it.id === shelf.id ? self : it))
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
        getShelfs()
            .then((data) => setShelfs(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <StorageTable data={shelfs} newCm_cb={newCm_cb}/>
            </div>
            <CreateEditStorage open={createEdit} shelf={undefined} cb={createEdit_cb}></CreateEditStorage>
        </div>
    )
}
