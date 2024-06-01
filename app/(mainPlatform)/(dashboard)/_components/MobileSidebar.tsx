"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"

export function MobileSidebar() {
    const pathName= usePathname()

    const [mounted, setMounted] = useState(false)

    const onOpen= useMobileSidebar((state)=>state.onOpen)
    const onClose= useMobileSidebar((state)=>state.onClose)
    const isOpen= useMobileSidebar((state)=>state.isOpen)

    useEffect(()=>{    //this part and the mounted state part is needed to avoid the hydration error, even if i deckare a component to be use client, it still runs on server for the first time and then runs on client side, so this error mainly occcurs i modal or sheet type comps where open or close states are present, now in some case when the comp first runs on server it gets open as true but on client side it's actually false, so because of this conflict, hydration error occurs. 
        //now useeffcet only runs in client side, so when this comp first runs on server the mounted state is sill false as it cant come inside this useefffect, so it will render nothing first, then when this comp again will run on cient side, this iseffect will run and mounted becomes true, then tje actual content will render with modals and sheets so that it only runs on the clind sude only.
        setMounted(true)
    },[])

    useEffect(()=>{
        onClose()
    },[pathName, onClose])


    if(!mounted){
        return null
    }
  return (
    <>
        <Button 
        onClick={onOpen}
        className="blocl md:hidden mr-2"
        variant="ghost"
        size="sm"
        >
            <Menu className="w-4 h-4"/>
        </Button>
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
            side="left"
            className="p-2 pt-10"
            >
                <Sidebar storageKey="t-sidebar-mobile-state"/>
            </SheetContent>
        </Sheet>
    </>
  )
}
