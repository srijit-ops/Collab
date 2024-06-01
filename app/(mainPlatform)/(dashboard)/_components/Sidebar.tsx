"use client"

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { OrganizationList, useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, Organization } from "./NavItem";

interface SidebarProps {
    storageKey?: string;
}

export function Sidebar({
    storageKey= "collab-sidebar-state"
}:SidebarProps) {

    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {}) //it will look likw {123:true}
    const {organization: activeOrganization, isLoaded: isLoadedOrg}= useOrganization()
    const {userMemberships, isLoaded: isLoadedOrgList}= useOrganizationList({
        userMemberships: {
            infinite:true
        }
    })
    const defaultAccordionValue: string[]= Object.keys(expanded) //by this we are turing the "expanded" object into an array which contains only those ids which expansion property is set to true mean only those ids or items which are expanded. so we are getting turning {123:true, 335:false, 356:true} expanded object to this array [123,356]
    .reduce((acc: string[], key:string)=>{
        if(expanded[key]){
            acc.push(key)
        }
        return acc
    }, [])

    const onExpand= (id:string)=>{
        setExpanded(current=>({
            ...current, 
            [id]: !expanded[id]
        }))
    }

    if(!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading){
        return (
            <>
            <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-10 w-[50%]"/>
            <Skeleton className="h-10 w-10"/>
            </div>
            <div className="space-y-2">
                <NavItem.Skeleton/>
                <NavItem.Skeleton/>
                <NavItem.Skeleton/>
            </div>
            </>

    )
    }


  return (
    <>
    <div className="font-medium text-sm flex items-center mb-1">
        <span className="pl-4">
            Workspaces
        </span>
        <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
            <Link href="/select-org">
                <Plus className="h-4 w-4"/>
            </Link>
        </Button>
    </div>
    <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2"> 
        {
            userMemberships.data.map(({organization})=>{
                return(
                    <NavItem
                key={organization.id}
                isActive={activeOrganization?.id===organization.id}
                isExpanded={expanded[organization.id]}
                organization={organization as Organization}
                onExpand={onExpand}
                />
                )
            })
        }
    </Accordion>
    </>
  )
}
