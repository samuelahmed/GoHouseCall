import SignInOutTrigger from "~/components/auth/authShowcase";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Input } from "~/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigationMenu";

export function Header() {
  const router = useRouter();
  return (
    <header className="">
      <div className="flex h-14 w-full items-center  bg-blue12 px-1 md:px-4">
        <div
          className="flex min-w-fit items-center space-x-2 px-2 text-xl text-olive1 hover:cursor-pointer"
          onClick={() => {
            void router.push("/");
          }}
        >
          <Image src="/faviconLarge.png" alt="HC Logo" width={30} height={30} />
          <text className="font-robotoSlab">House Call</text>
        </div>
        <div className="flex w-full items-center  justify-center px-4 text-olive1">
          <Input placeholder="Search" className="max-w-lg" />
        </div>
        <div className="min-w-fit px-2">
          <SignInOutTrigger />
        </div>
      </div>
      <div className="flex h-12 w-full items-center justify-start border-b border-blue12 bg-blue11 px-1 md:px-4">
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
