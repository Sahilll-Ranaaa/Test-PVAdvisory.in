"use client";

import { MenuIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { RainbowButton } from "../buttons/rainbow-btn";

const whatWeDoMenuItems = [
  {
    title: "Consulting",
    href: "/consulting",
  },
  {
    title: "Outsourcing",
    href: "/outsourcing",
  },
  {
    title: "Technology",
    href: "/technology",
  },
  {
    title: "Start-up Solution",
    href: "/start-up-solution",
  },
];

export default function HamburgerSideNavbar() {
  const [isHamburgerMenuVisible, setIsHamburgerMenuVisible] = useState(false);
  return (
    <div>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="md:hidden"
        onClick={() => setIsHamburgerMenuVisible(true)}
      >
        <MenuIcon />
      </Button>
      <AnimatePresence>
        {isHamburgerMenuVisible && (
          <motion.div
            initial={{ backgroundColor: "#000000" }}
            animate={{
              backgroundColor: "#000000B2",
              transition: { duration: 0.3 },
            }}
            exit={{ backgroundColor: "#00000000", transition: { delay: 0.2 } }}
            className="fixed top-0 left-0 w-full h-full z-20"
            onClick={() => setIsHamburgerMenuVisible(false)}
          >
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0, transition: { duration: 0.2, delay: 0.1 } }}
              exit={{ x: 300 }}
              className="bg-white h-full w-[300px] rounded-tl-xl rounded-bl-xl float-right flex flex-col"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="p-2 flex justify-end">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => setIsHamburgerMenuVisible(false)}
                >
                  <X />
                </Button>
              </div>
              <div className="flex-1 px-4">
                <Accordion type="single" collapsible defaultValue="what-we-do">
                  <AccordionItem
                    value="what-we-do"
                    className="border-none hover:no-underline"
                  >
                    <AccordionTrigger className="font-normal px-2 py-2 hover:no-underline hover:bg-gray-100 rounded">
                      What We Do?
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 w-full">
                        {whatWeDoMenuItems.map((item, idx) => (
                          <li key={idx} className="w-full">
                            <Link
                              href={item.href}
                              onClick={() => setIsHamburgerMenuVisible(false)}
                              className="py-2 px-4 inline-block hover:bg-gray-100 rounded w-full"
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div>
                  <Link
                    href="/about"
                    onClick={() => setIsHamburgerMenuVisible(false)}
                    className="text-sm py-2 px-2 inline-block hover:bg-gray-100 rounded w-full"
                  >
                    About
                  </Link>
                  <Link
                    href="/case-studies"
                    onClick={() => setIsHamburgerMenuVisible(false)}
                    className="text-sm py-2 px-2 inline-block hover:bg-gray-100 rounded w-full"
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="https://thepvhub.com"
                    target="_blank"
                    onClick={() => setIsHamburgerMenuVisible(false)}
                    className="text-sm py-2 px-2 inline-block hover:bg-gray-100 rounded w-full"
                  >
                    ThePVhub
                  </Link>
                </div>
              </div>
              <div className="p-2 flex justify-center">
                <RainbowButton
                  className="flex h-9 px-4"
                  onClick={() => {
                    router.push("/engage-us");
                  }}
                >
                  Contact Us
                </RainbowButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ListItem = ({ className, title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {/* <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p> */}
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
