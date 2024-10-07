"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  {
    title: "HOME",
    href: "/",
  },
  {
    title: "ABOUT",
    href: "/about",
  },
  {
    title: "RANKING",
    href: "/ranking",
  },
  {
    title: "BLOG",
    href: "/blog",
  },
]

// ナビゲーション
const Navigation = () => {
  const pathname = usePathname()

  return (
    <header>
      <div className="mx-auto px-2 py-2 sm:py-4 text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/suzukazine-logo.svg"
            width={120}
            height={120}
            alt="avatar"
            className="sm:w-48 sm:h-auto"
            priority={false}
          />
        </Link>
      </div>

      <div className="bg-gray-100">
        <div className="mx-auto max-w-screen-lg px-2">
          <div className="flex items-center justify-between text-sm font-bold">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "border-r border-l border-white py-3 text-center w-full hover:bg-black hover:text-white",
                  pathname === item.href && "bg-black text-white"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation