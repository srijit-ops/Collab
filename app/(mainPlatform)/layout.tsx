import { ClerkProvider } from "@clerk/nextjs"

function MainPlatformLayout({children}:{children:React.ReactNode}) {
  return (
    <ClerkProvider>
        {children}
    </ClerkProvider>
  )
}

export default MainPlatformLayout