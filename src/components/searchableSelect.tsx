"use client"

import {useState} from "react"
import {CheckIcon, ChevronsUpDownIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"


export type searchableSelectElement = { id: number, label: string }

export function SearchableSelect({placeholder, elements, value, setValue}: {
    placeholder: string
    elements: searchableSelectElement[]
    value?: number | undefined
    setValue: (val: number | undefined) => void
}) {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {elements.find(it => it.id == value)?.label || ("select a " + placeholder)}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        value={inputValue}
                        onValueChange={setInputValue}
                        placeholder={("select a " + placeholder)}
                    />
                    <CommandList>
                        <CommandEmpty>{"No " + placeholder + " found."}</CommandEmpty>
                        <CommandGroup>
                            {elements.sort((a,b) => a.label.localeCompare(b.label)).map((element) => (
                                <CommandItem
                                    key={element.id}
                                    value={element.label}
                                    onSelect={() => {
                                        setValue(element.id)
                                        setOpen(false)
                                    }}>
                                    <CheckIcon
                                        className={cn("mr-2 h-4 w-4", value == element.id ? "opacity-100" : "opacity-0")}
                                    />
                                    {element.label}
                                </CommandItem>))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}