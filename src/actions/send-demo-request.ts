"use server";

export async function sendDemoRequest(data: {
  name: string;
  email: string;
  company: string;
  question: string;
}) {
  const [firstName, ...rest] = data.name.trim().split(/\s+/);
  const formData = new FormData();

  // El webhook de Make espera los nombres separados desde la versión anterior del formulario.
  Object.entries({
    ...data,
    firstName,
    lastName: rest.join(" "),
  }).forEach(([key, value]) => {
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
