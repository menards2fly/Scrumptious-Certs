document.getElementById("purchaseForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const responseMessage = document.getElementById("responseMessage");

  try {
    const response = await fetch("https://your-backend-url/submit", {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    if (data.success) {
      responseMessage.textContent = "Success! ID: " + data.signing_id;
    } else {
      responseMessage.textContent = "Error: " + data.message;
    }
  } catch (err) {
    responseMessage.textContent = "Error submitting form.";
  }
});
