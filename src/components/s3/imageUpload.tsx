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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    formData.append(name, data[name]);
  }
  await fetch(url, {
    method: "POST",
    body: formData,
  });
}

export function ImageUpload() {
  const { data: user } = api.WelcomeFormRouter.me.useQuery();

  const [file, setFile] = useState<File | null>(null);

  //1. get secure url from Server
  // const mutation = api.imageAPI.createUploadUrl.useMutation();

  const createPresignedUrlMutation = api.imageAPI.createUploadUrl.useMutation();

  // const imageName = file?.name || ""

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    await uploadFileToS3({
      getPresignedUrl: () =>
        createPresignedUrlMutation.mutateAsync({
          // imageName: "meow",
          imageName: file.name,
        }),
      file,
    });
    setFile(null);
  };
  // await courseQuery.refetch();

  // await courseQuery.refetch();
  // console.log(mutation)

  // const triggerMutation = () => {
  //   mutation.mutate({
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     // imageName: selectedImage.name || "",
  //   });
  // };

  // console.log(uploadUrl);
  //2.  post the image directly to the s3 bucket
  // async function uploadFileToS3({
  //   getPresignedUrl,
  //   file,
  // }: {
  //   getPresignedUrl: () => Promise<{
  //     url: string;
  //     fields: Record<string, string>;
  //   }>;
  //   file: File;
  // }) {
  //   const { url, fields } = await getPresignedUrl();
  //   const data: Record<string, any> = {
  //     ...fields,
  //     "Content-Type": file.type,
  //     file,
  //   };
  //   const formData = new FormData();
  //   for (const name in data) {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     formData.append(name, data[name]);
  //   }
  //   await fetch(url, {
  //     method: "POST",
  //     body: formData,
  //   });
  // }

  //3. post to server to store any extra data

  // const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // if (!file) return;
  //   await uploadFileToS3({
  //     getPresignedUrl: () =>
  //       mutation.mutateAsync({
  //         imageName: file.name,
  //       }),
  //     file,
  //   });
  //   setFile(null);
  // await courseQuery.refetch();

  // if (fileRef.current) {
  //   fileRef.current.value = "";
  // }

  return (
    <>
      <Avatar className="h-20 w-20 rounded-full object-cover">
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback>{user?.image || ""}</AvatarFallback>
      </Avatar>
      {/* <form */}
      {/* // onSubmit={uploadImage}
        // onSubmit={() => uploadImage} */}
      {/* > */}
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={uploadImage}
      >
        <input
          type="file"
          // name="myImage"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onChange={(e) => setFile(e.target.files?.[0] || null)}

          // label="Course Image"
          // onChange={setFile}
          // value={file}
        />

        <Button
          disabled={!file}
          type="submit"
          // variant="light"
          // color="blue"
          // mt="md"
          // radius="md"
        >
          Upload Image
        </Button>
      </form>
      {/* <input
          type="file"
          // name="myImage"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          // ={setFile}
          // value={file}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <Button 
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={uploadImage}>Upload Image</Button>
      </form> */}

      {/* <Button onClick={triggerMutation} size="sm" variant="outline">
        Upload profile image
      </Button> */}
    </>
  );
}
