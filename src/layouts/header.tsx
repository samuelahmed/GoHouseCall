import SignInOutTrigger from "~/components/auth/signInOutTrigger";

export function Header() {
  return (
    <header className="text-olive1">
      <div className="flex h-14 w-full items-center  bg-blue12 px-4">
        <div className="min-w-fit">House Call</div>
        <div className="w-full text-center">add search bar here</div>
        <div className="min-w-fit">
          <SignInOutTrigger />
        </div>
      </div>
      <div className="flex h-10 w-full items-center justify-start border-b border-blue12 bg-blue11 px-4">
        <div className="pr-4">Sessions</div>
        <div className="px-4">Messages</div>
        <div className="px-4">Account</div>
      </div>
    </header>
  );
}
