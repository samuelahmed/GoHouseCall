import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/useToast";

export function EmailVerification() {
  const { toast } = useToast();
  const currentTime = new Date().toLocaleTimeString();

  const {
    data: emailVerified,
    isLoading: emailLoading,
    refetch: emailRefetch,
  } = api.emailAPI.userEmailVerificationStatus.useQuery();

  const {
    data: verificationToken,
    isLoading: tokenLoading,
    refetch: tokenRefetch,
  } = api.emailAPI.checkVerificationToken.useQuery();

  const handleClick = async () => {
    await emailRefetch();
    await tokenRefetch();
  };
  const { mutate } = api.emailAPI.sendConfirmationEmail.useMutation();

  return (
    <div>
      {/* Send Login Email because user is not verified and no token exists */}
      {!emailVerified?.emailVerified &&
        verificationToken?.identifier !== null &&
        (emailLoading ? (
          <div>checking...</div>
        ) : (
          <Button
            className=""
            variant="outline"
            onClick={() => {
              handleClick;
              mutate();
              toast({
                title: "Verfication Email Sent",
                description: `"Email sent to ${
                  emailVerified?.email || ""
                } at ${currentTime}"`,
              });
            }}
          >
            Send Verification Email
          </Button>
        ))}
      {/* Resend Login Email because user is not verified and token exists */}
      {!emailVerified?.emailVerified &&
        verificationToken?.identifier === null &&
        (tokenLoading ? (
          <div>checking...</div>
        ) : (
          <Button
            className=""
            variant="outline"
            onClick={() => {
              handleClick;
              mutate();
              toast({
                title: "Verfication Email Sent",
                description: `"Email sent to ${
                  emailVerified?.email || ""
                } at ${currentTime}"`,
              });
            }}
          >
            Resend Verification Email
          </Button>
        ))}
      {/* Email verified */}
      {emailVerified?.emailVerified &&
        (emailLoading ? (
          <div>checking...</div>
        ) : (
          <div> email verified :) </div>
        ))}
    </div>
  );
}
