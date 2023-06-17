import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/components/ui/useToast";

async function uploadFileToS3({
  getPresignedUrl,
  file,
}: {
  getPresignedUrl: () => Promise<{
    url: string;
    fields: Record<string, string>;
  }>;
  file: File;
}) {
  const { url, fields } = await getPresignedUrl();
  const data: Record<string, any> = {
    ...fields,
    "Content-Type": file.type,
    file,
  };
  const formData = new FormData();
  for (const name in data) {
    formData.append(name, data[name] as string);
  }
  await fetch(url, {
    method: "POST",
    body: formData,
  });
}

export function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const { data: user } = api.WelcomeFormRouter.me.useQuery();
  const { data: user2, isLoading } = api.settingsAPI.userHC_Account.useQuery();
  const createPresignedUrlMutation = api.imageAPI.createUploadUrl.useMutation();
  const newProfileImage = api.imageAPI.newProfileImage.useMutation();

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    const imageName = `${user?.id || ""}${Date.now()}`;
    e.preventDefault();
    if (!file) return;
    await uploadFileToS3({
      getPresignedUrl: () =>
        createPresignedUrlMutation.mutateAsync({
          imageName: imageName,
        }),
      file,
    });
    await newProfileImage.mutateAsync({
      imageName: imageName,
    });
    setFile(null);
    toast({
      title: `${user2?.name || ""}`,
      description: "You have successfully updated your profile image!",
      duration: 5000,
    });
  };

  return (
    <>
      <Avatar className="h-20 w-20 rounded-full object-cover">
        {isLoading && <AvatarFallback>loading...</AvatarFallback>}
        <AvatarImage src={user2?.image || user?.image2 || user?.image || ""} />
      </Avatar>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={uploadImage}
      >
        <div className="w-fit py-1">
          <Label htmlFor="picture">Picture</Label>
          <Input
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            id="picture"
            type="file"
          />
        </div>
        {file && (
          <Button variant="outline" disabled={!file} type="submit">
            Update Image
          </Button>
        )}
      </form>
    </>
  );
}
