document.getElementById("purchaseForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = {
    name: form.name.value,
    email: form.email.value,
    udid: form.udid.value,
    deviceType: form.deviceType.value,
    deliveryType: form.deliveryType.value,
    revokeProtectionIncluded: form.revokeProtectionIncluded.checked
  };

  const responseMessage = document.getElementById("responseMessage");

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
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
