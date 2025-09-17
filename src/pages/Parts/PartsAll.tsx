import {PartTable} from "@/pages/Tables/part-table.tsx";
import {useEffect, useState} from "react";
import {StockDrawer} from "@/components/StockDrawer.tsx";
import {toast} from "sonner";
import {DeleteConfirm} from "@/components/DeleteConfirm.tsx";
import {CreateEditPart} from "@/components/CreateEditPart.tsx";
import type {Part} from "@/Models/Part.ts";
import {deletePart, getParts, updatePart} from "@/api/Part_API.ts";

export default function PartsAll() {

    const [parts, setParts] = useState<Part[]>([]);
    const [selectedPart, setSelectedPart] = useState<Part | undefined>(undefined);

    const [openStockAdj, setOpenStockAdj] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [createEdit, setCreateEdit] = useState(false);

    useEffect(() => {
        getParts()
            .then((data) => setParts(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    function newCM_cb() {
        setCreateEdit(true)
    }

    function editCM_cb(id: number) {
        setSelectedPart(parts.find(it => it.id === id));
        setCreateEdit(true)
    }

    function deleteCM_cb(id: number) {
        setSelectedPart(parts.find(it => it.id == id));
        setOpenDeleteConfirm(true)
    }

    function adjustStockCM_cb(id: number) {
        setSelectedPart(parts.find(it => it.id == id));
        setOpenStockAdj(true)
    }

    function createEdit_cb(part: Part | undefined) {
        setCreateEdit(false)
        setSelectedPart(undefined)

        if (part == undefined) {
            return
        }

        updatePart(part)
            .then((newPart) => {
                if (part.id == null) {
                    toast("Part has been Created!")
                    setParts(prev => [...prev, newPart])
                } else {
                    setParts(parts.map(it => it.id === part.id ? part : it))
                    toast("Part has been Updated!")
                }

                setSelectedPart(undefined)
            })
            .catch((error) => {
                console.error('Error:', error)
                toast("Could not update Part")
                setSelectedPart(undefined)
            });
    }

    function deleteConfirm_cb(ok: boolean) {
        setOpenDeleteConfirm(false)

        if (!ok) {
            setSelectedPart(undefined)
            return
        }

        if (!selectedPart) {
            return;
        }

        deletePart(selectedPart).then(() => {
            toast(selectedPart.name + " has been Deleted!")
            setParts(parts.filter(it => it.id != selectedPart.id))
            setSelectedPart(undefined)
        }).catch((error) => {
            console.error('Error:', error)
            toast("Error while deleting!!")
            setSelectedPart(undefined)
        })

    }

    function handleStockAdj_cb(amount: number, aboard: boolean) {
        if (aboard) {
            setOpenStockAdj(false)
            setSelectedPart(undefined)
            return;
        }

        if (!selectedPart) {
            return;
        }

        const part = selectedPart;
        part.quantity = amount;
        updatePart(part)
            .then(() => {
                setParts(parts.map(it => it.id === part.id ? part : it))
                toast("Stock has been Updated!")
                setSelectedPart(undefined)
            })
            .catch((error) => {
                console.error('Error:', error)
                toast("Could not update Stock")
                setSelectedPart(undefined)
            });

        setOpenStockAdj(false)
        setSelectedPart(undefined)
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
                <PartTable data={parts}
                           newCm_cb={newCM_cb}
                           edit_cb={editCM_cb}
                           delete_cb={deleteCM_cb}
                           adjustStock_cb={adjustStockCM_cb}
                />
            </div>
            <StockDrawer open={openStockAdj} part={selectedPart} cb={handleStockAdj_cb}></StockDrawer>
            <DeleteConfirm open={openDeleteConfirm} part={selectedPart} cb={deleteConfirm_cb}></DeleteConfirm>
            <CreateEditPart open={createEdit} part={selectedPart} cb={createEdit_cb}></CreateEditPart>
        </div>
    )
}
