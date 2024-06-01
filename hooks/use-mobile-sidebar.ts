import {create} from "zustand"

type MobileSidebarStore= {
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=>void;
}

export const useMobileSidebar= create<MobileSidebarStore>((set)=>({ //by this we created a global store containng this data
    isOpen: false,
    onOpen: ()=>set({isOpen:true}),
    onClose: ()=>set({isOpen: false})
}))