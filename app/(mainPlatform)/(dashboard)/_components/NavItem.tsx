"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export type Organization={
    id:string;
    slug:string;
    imageUrl:string;
    name:string;
}
interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id:string)=>void;
}
export function NavItem({isExpanded, isActive, organization, onExpand}:NavItemProps) {
    const router= useRouter() //for page router, import will be from next/router but for app rouuter import will be from next/navigation
    const pathName= usePathname()
    const routes= [
        {
            label: "Boards",
            icon: <Layout className="w-4 h-4 mr-2"/>,
            href: `/organization/${organization.id}`
        },
        {
            label: "Activity",
            icon: <Activity className="w-4 h-4 mr-2"/>,
            href: `/organization/${organization.id}/activity`
        },
        {
            label: "Settings",
            icon: <Settings className="w-4 h-4 mr-2"/>,
            href: `/organization/${organization.id}/settings`
        },
        {
            label: "Billing",
            icon: <CreditCard className="w-4 h-4 mr-2"/>,
            href: `/organization/${organization.id}/billing`
        }
    ]

    const onClick=(href: string)=>{
        router.push(href)
    }

  return (
    <AccordionItem value={organization.id} className="border-none">
        <AccordionTrigger onClick={()=>onExpand(organization.id)} className={cn("flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",isActive && !isExpanded && "bg-sky-500/10 text-sky-700")}>
            <div className="flex items-center gap-x-2">
                <div className="w-7 h-7 relative">
                    <Image
                    fill
                    src={organization.imageUrl}
                    alt="organization"
                    className="rounded-sm object-cover"
                    />

                </div>
                <span className="font-medium text-sm">
                    {organization.name}
                </span>
            </div>
        </AccordionTrigger>
        <AccordionContent className="pt-1 text-neutral-700">
            {
                routes.map((route)=>{
                    return(
                        <Button
                        key= {route.href}
                        size="sm"
                        onClick={()=>onClick(route.href)}
                        className={cn(
                            "w-full font-normal pl-10 justify-start mb-1",
                            pathName=== route.href && "bg-sky-500/10 text-sky-700"
                        )}
                        variant="ghost"
                        >
                        {route.icon}
                        {route.label}
                        </Button>
                    )
                })
            }
        </AccordionContent>
    </AccordionItem>
  )
}
