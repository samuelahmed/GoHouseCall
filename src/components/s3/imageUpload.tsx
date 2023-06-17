import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useState } from "react";

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
  const { data: user2 } = api.settingsAPI.userHC_Account.useQuery();
  const createPresignedUrlMutation = api.imageAPI.createUploadUrl.useMutation();
  const newProfileImage = api.imageAPI.newProfileImage.useMutation();

console.log(user2?.image)
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
  };

  return (
    <>
      <Avatar className="h-20 w-20 rounded-full object-cover">
        <AvatarImage src={user2?.image || user?.image2 || user?.image || ""} />
        <AvatarFallback>img error</AvatarFallback>
      </Avatar>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={uploadImage}
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button disabled={!file} type="submit">
          Upload Image
        </Button>
      </form>
    </>
  );
}
