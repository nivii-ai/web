"use server";

export async function sendDemoRequest(data: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
}) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value ?? "");
  });

  const response = await fetch(
    "https://hook.us2.make.com/6l17j2fse17polfsq54y0rpjbd56nr3k",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send demo request");
  }

  return true;
}
