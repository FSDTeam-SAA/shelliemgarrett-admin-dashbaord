"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Grip, ShoppingBasket } from "lucide-react";
import { LogoutModal } from "../Dialogs/LogoutModal";
const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    name: "Requested Products",
    href: "/requested-product",
    icon: LayoutDashboard,
  },
  { name: "Main Category", href: "/category", icon: Grip },
  { name: "Sub Category", href: "/sub-category", icon: ShoppingBasket },
  { name: "Seller Categories", href: "/sr-category", icon: ShoppingBasket },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen sticky bottom-0 top-0 w-[350px] flex-col bg-[#212121] z-50">
      {/* Logo */}
      <div className="h-[80px] flex items-center justify-center">
        <div className="">
          <h1 className="text-green-500 text-3xl font-bold">Logo</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 flex flex-col items-center justify-start px-3 overflow-y-auto mt-3">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex w-[90%] mx-auto items-center justify-start gap-2 space-y-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white text-black"
                  : "text-slate-300 hover:bg-slate-600/50 hover:text-white",
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 transition-colors duration-200",
                  isActive ? "text-black" : "",
                )}
              />
              <span
                className={cn(
                  "font-normal text-base leading-[120%] transition-colors duration-200 text-center",
                  isActive ? "text-black font-medium" : "",
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout fixed at bottom */}
      <div className="p-6">
       <LogoutModal />
      </div>
    </div>
  );
}
