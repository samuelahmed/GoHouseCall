import SignInOutTrigger from "~/components/auth/authShowcase";
import Link from "next/link";

import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,

  navigationMenuTriggerStyle,
} from "~/components/ui/navigationMenu";

export function Header() {
  return (
    <header className="">
      <div className="flex h-14 w-full items-center  bg-blue12 px-4">
        <div className="min-w-fit">House Call</div>
        <div className="w-full text-center">add search bar here</div>
        <div className="min-w-fit">
          <SignInOutTrigger />
        </div>
      </div>
      <div className="flex h-12 w-full items-center justify-start border-b border-blue12 bg-blue11 px-4">
        <div className="min-w-fit text-olive1">
          <NavigationMenu>
            <NavigationMenuList>

            <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Sessions
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Messages
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
  

              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Account
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
