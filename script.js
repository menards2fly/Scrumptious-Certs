document.getElementById("signForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const responseMessage = document.getElementById("responseMessage");

  try {
    const response = await fetch("/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      responseMessage.textContent = "Document sent for signing. Signing ID: " + result.signing_id;
    } else {
      responseMessage.textContent = "Error: " + result.message;
    }
  } catch (error) {
    console.error(error);
    responseMessage.textContent = "Error sending request.";
  }
});
