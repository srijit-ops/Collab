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

    useEffect(()=>{
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
