// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const paymentForm = document.getElementById("paymentForm");

  if (!paymentForm) {
    console.error("Error: Form with ID 'paymentForm' not found.");
    return;
  }

  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submission prevented."); // Debug log

    // Paystack integration
    const email = document.getElementById("email-address").value;
    const amount = document.getElementById("amountInput").value;

    if (!email || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    let handler = PaystackPop.setup({
      key: "pk_test_59195443eee0e11f5ae308953e2a144c489269ed",
      email: email,
      amount: amount * 100,
      ref: "order_" + Date.now(),
      onClose: function () {
        alert("Payment window closed.");
      },
      callback: function (response) {
        window.location.href =
          "orderPlaced.html?reference=" + response.reference;
      },
    });

    handler.openIframe();
  });
});
