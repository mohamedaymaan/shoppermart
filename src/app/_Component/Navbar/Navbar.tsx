"use client";
import { useContext } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CountContext } from "@/CountProvider";

const menuItem: { path: string; content: string; protected: boolean }[] = [
  { path: "/", content: "Home", protected: false },
  { path: "/products", content: "Products", protected: false },
  { path: "/brands" , content: "Brands", protected: false },
  { path: "/allorders" , content: "Orders", protected: true },
  // { path: "/register", content: "Sign Up", protected: false },
];
const menuAuthItem: { path: string; content: string }[] = [
  { path: "/login", content: "Login" },
];
export default function Navbar() {
  const { data, status } = useSession();
  const CountData = useContext(CountContext);

  function logout() {
    signOut({
      callbackUrl: "/login",
    });
  }
  return (
    <NavigationMenu
      viewport={false}
      className="max-w-full justify-between p-5 shadow-2xl"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">
              <span className="font-semibold text-[18px]">
                Shopper<span className="text-main">Mart</span>{" "}
              </span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        {menuItem.map((item) => {
          return (
            <NavigationMenuItem key={item.path}>
              {item.protected && status == "authenticated" && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              )}
              {!item.protected && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
        {status == "unauthenticated" && (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/register">Sign Up</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>

      <NavigationMenuList>
        {status == "authenticated" && (
          <>
            {/* <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/wishlist">
                  <Image
                    src={"/icons/Wishlist.png"}
                    alt="wishlisticon"
                    width={25}
                    height={25}
                  />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem> */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/cart" className="relative">
                  <Image
                    src={"/icons/Cart.png"}
                    alt="carticon"
                    width={25}
                    height={25}
                  />

                  {CountData?.count == 0 ? (
                    ""
                  ) : (
                    <Badge
                      className="absolute -top-1 -end-[0.2px] h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                      variant="destructive"
                    >
                      {CountData?.count}
                    </Badge>
                  )}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        )}

        {status == "authenticated" ? (
          <div className="flex flex-wrap">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/icons/user.png" />
                    <AvatarFallback>userIcon</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">
                    <span className="text-main">Hello, </span>
                    {data?.user.name}
                  </span>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <span className="text-main cursor-pointer" onClick={logout}>
                  Logout
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        ) : (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/login">Login</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
