import Image from "next/image"
import Link from "next/link"


export function Logo() {
  return (
    <Link href="/">
        <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
    src="/collab-logo.svg"
    alt="logo"
    height={30}
    width={30}
    />
    <p className="font-semibold text-neutral-900 pb-1">Collab</p>
        </div>
    </Link>
  )
}
