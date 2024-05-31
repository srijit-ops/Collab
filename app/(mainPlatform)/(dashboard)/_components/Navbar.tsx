import { Plus } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";


export function Navbar() {
  return (
    <nav className="fixed z-50 top-0 px-4 h-14 border-b w-full shadow-sm bg-white flex items-center">
        {/*mobile sidebar*/}
        <div className="flex items-center gap-x-4">
            <div className="hidden md:flex">
                <Logo/>
            </div>
            <Button size="sm" variant="primary" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                Create
            </Button>
            <Button size="sm" variant="primary" className="rounded-sm md:hidden block">
                <Plus className="h-4 w-4"/>
            </Button>
        </div>
        <div className="ml-auto flex items-center gap-x-2">
            <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id" //when a new org is craeted
            afterLeaveOrganizationUrl="/select-org"
            afterSelectOrganizationUrl="/organization/:id"
            appearance={{
                elements:{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }
            }}
            />
            <UserButton
            afterSignOutUrl="/"
            appearance={{
                elements:{
                    avatarBox:{
                        height:30,
                        width:30
                    }
                }
            }}
            />
        </div>
    </nav>
  )
}
