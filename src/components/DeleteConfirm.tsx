import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {DialogDescription} from "@radix-ui/react-dialog";
import type {Part} from "@/Models/Part.ts";

export function DeleteConfirm({open, part, cb}: {
    open: boolean
    part: Part | undefined,
    cb: (ok: boolean) => void;
}) {

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                        This will permanently delete the Part "{part?.name}".
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => cb(false)}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => cb(true)}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
