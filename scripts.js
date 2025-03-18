document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  const entryForm = document.getElementById("entryForm");
  const invoicePreview = document.getElementById("invoicePreview");
  const invoiceButtons = document.getElementById("invoiceButtons");
  const generateInvoiceBtn = document.getElementById("generateInvoiceBtn");
  const editInvoiceBtn = document.getElementById("editInvoiceBtn");
  const downloadPdfBtn = document.getElementById("downloadPdfBtn");
  const printInvoiceBtn = document.getElementById("printInvoiceBtn");
  const pdfContainer = document.getElementById("pdfContainer");

  // Define package items with their details
  const packageItems = [
    {
      id: "weddingAlbum",
      name: "Wedding Album",
      includeId: "includeWeddingAlbum",
      sizeId: "weddingAlbumSize",
      qtyId: "weddingAlbumQty",
    },
    {
      id: "weddingEnlargement",
      name: "Wedding Enlargement",
      includeId: "includeWeddingEnlargement",
      sizeId: "weddingEnlargementSize",
      qtyId: "weddingEnlargementQty",
    },
    {
      id: "thankingCard",
      name: "Thanking card",
      includeId: "includeThankingCard",
      sizeId: "thankingCardSize",
      qtyId: "thankingCardQty",
    },
    {
      id: "groupPhoto",
      name: "Group Photo",
      includeId: "includeGroupPhoto",
      sizeId: "groupPhotoSize",
      qtyId: "groupPhotoQty",
    },
    {
      id: "preShootAlbum",
      name: "PRE-SHOOT Album",
      includeId: "includePreShootAlbum",
      sizeId: "preShootAlbumSize",
      qtyId: "preShootAlbumQty",
    },
    {
      id: "familyAlbum",
      name: "Family Album",
      includeId: "includeFamilyAlbum",
      sizeId: "familyAlbumSize",
      qtyId: "familyAlbumQty",
    },
    {
      id: "preShootPhotography",
      name: "Pre-Shoot Photography",
      includeId: "includePreShootPhotography",
      sizeId: "preShootPhotographySize",
      qtyId: "preShootPhotographyQty",
    },
  ];

  // Define extras with their details
  const extras = [
    {
      id: "extraEnlargements",
      name: "Enlargements",
      includeId: "extraEnlargements",
      sizeId: "extraEnlargementsSize",
      qtyId: "extraEnlargementsQty",
      priceId: "extraEnlargementsPrice",
      hasSize: true,
      hasQty: true,
    },
    {
      id: "extraThankCard",
      name: "Thank Card",
      includeId: "extraThankCard",
      sizeId: "extraThankCardSize",
      qtyId: "extraThankCardQty",
      priceId: "extraThankCardPrice",
      hasSize: true,
      hasQty: true,
    },
    {
      id: "extraAdditionalAlbum",
      name: "Additional Album",
      includeId: "extraAdditionalAlbum",
      sizeId: "extraAdditionalAlbumSize",
      qtyId: "extraAdditionalAlbumQty",
      priceId: "extraAdditionalAlbumPrice",
      hasSize: true,
      hasQty: true,
    },
    {
      id: "extraGoingawayShoot",
      name: "Goingaway Shoot",
      includeId: "extraGoingawayShoot",
      priceId: "extraGoingawayShootPrice",
      hasSize: false,
      hasQty: false,
    },
    {
      id: "extraTransport",
      name: "Transport will be Added",
      includeId: "extraTransport",
      qtyId: "extraTransportQty",
      priceId: "extraTransportPrice",
      hasSize: false,
      hasQty: true,
      qtyLabel: "KM",
    },
  ];

  // Generate Invoice
  generateInvoiceBtn.addEventListener("click", function () {
    // Show invoice and buttons, hide form
    entryForm.classList.add("hidden");
    invoicePreview.classList.remove("hidden");
    invoiceButtons.classList.remove("hidden");

    // Fill in client information
    document.getElementById("displayBilledTo").textContent =
      document.getElementById("billedTo").value;
    document.getElementById("displayBrideGroomName").textContent =
      document.getElementById("brideGroomName").value;
    document.getElementById("displayBrideContact").textContent =
      document.getElementById("brideContact").value;
    document.getElementById("displayGroomContact").textContent =
      document.getElementById("groomContact").value;
    document.getElementById("displayFunctionLocation").textContent =
      document.getElementById("functionLocation").value;

    // Fill in the Bride and Groom Dressing Details
    document.getElementById("displayBridalSalonInfo").textContent =
      document.getElementById("bridalSalonInfo").value;
    document.getElementById("displayGroomDressingInfo").textContent =
      document.getElementById("groomDressingInfo").value;
    document.getElementById("displayBridalGroupAvailability").textContent =
      document.getElementById("bridalGroupAvailability").value;
    document.getElementById("displayBridesmaidCount").textContent =
      document.getElementById("bridesmaidCount").value;
    document.getElementById("displayBestmanCount").textContent =
      document.getElementById("bestmanCount").value;
    document.getElementById("displayFlowerGirlCount").textContent =
      document.getElementById("flowerGirlCount").value;
    document.getElementById("displayPageboyCount").textContent =
      document.getElementById("pageboyCount").value;

    // Format wedding date
    const rawDate = document.getElementById("weddingDate").value;
    if (rawDate) {
      const dateObj = new Date(rawDate);
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      document.getElementById("displayWeddingDate").textContent = formattedDate;
    }

    // Format homecoming date
    const rawHomecomingDate = document.getElementById("homecomingDate").value;
    if (rawHomecomingDate) {
      const homecomingDateObj = new Date(rawHomecomingDate);
      const formattedHomecomingDate = homecomingDateObj.toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      document.getElementById("displayHomecomingDate").textContent =
        formattedHomecomingDate;
    }

    // Update package price display
    const packagePrice =
      parseFloat(document.getElementById("packagePrice").value) || 0;
    document.getElementById("packagePriceDisplay").textContent =
      numberWithCommas(packagePrice) + "LKR";

    // Clear previous items
    const invoiceItemsBody = document.getElementById("invoiceItemsBody");
    invoiceItemsBody.innerHTML = "";

    // Add package items to the invoice
    packageItems.forEach((item) => {
      if (document.getElementById(item.includeId).checked) {
        const size = document.getElementById(item.sizeId).value;
        const qty = document.getElementById(item.qtyId).value;

        const row = document.createElement("tr");
        row.innerHTML = `
                            <td>${item.name}</td>
                            <td>${size}</td>
                            <td>${qty}</td>
                            <td></td>
                        `;
        invoiceItemsBody.appendChild(row);
      }
    });

    // Clear previous extras
    const extrasItemsBody = document.getElementById("extrasItemsBody");
    extrasItemsBody.innerHTML = "";

    // Add extras to invoice and calculate total
    let totalExtrasCost = 0;

    extras.forEach((item) => {
      if (document.getElementById(item.includeId).checked) {
        const row = document.createElement("tr");
        let size = "N/A";
        let qty = "N/A";

        if (item.hasSize) {
          size = document.getElementById(item.sizeId).value;
        }

        if (item.hasQty) {
          qty = document.getElementById(item.qtyId).value;
          if (item.qtyLabel) {
            qty += item.qtyLabel;
          }
        }

        const price =
          parseFloat(document.getElementById(item.priceId).value) || 0;
        totalExtrasCost += price;

        row.innerHTML = `
                            <td>${item.name}</td>
                            <td>${size}</td>
                            <td>${qty}</td>
                            <td>${numberWithCommas(price)}</td>
                        `;
        extrasItemsBody.appendChild(row);
      }
    });

    // Calculate totals
    const subtotal = packagePrice + totalExtrasCost;
    const discount =
      parseFloat(document.getElementById("discountAmount").value) || 0;
    const totalAmount = subtotal - discount;

    // Update totals display
    document.getElementById("subtotal").textContent =
      "LKR " + numberWithCommas(subtotal);
    document.getElementById("discount").textContent =
      "LKR " + numberWithCommas(discount);
    document.getElementById("totalAmount").textContent =
      "LKR " + numberWithCommas(totalAmount);
  });

  // Edit Invoice Button
  editInvoiceBtn.addEventListener("click", function () {
    invoicePreview.classList.add("hidden");
    invoiceButtons.classList.add("hidden");
    entryForm.classList.remove("hidden");
  });

  // Download PDF Button
  downloadPdfBtn.addEventListener("click", function () {
    // Clone invoice preview for PDF
    const pdfContent = invoicePreview.cloneNode(true);
    pdfContainer.innerHTML = "";
    pdfContainer.appendChild(pdfContent);

    // Generate PDF
    const opt = {
      margin: 10,
      filename: "wedding_photography_invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        scrollY: 0,
        windowWidth: document.documentElement.offsetWidth
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Use html2pdf library
    html2pdf().set(opt).from(pdfContainer).save();
  });

  // Print Invoice Button
  printInvoiceBtn.addEventListener("click", function () {
    window.print();
  });

  // Helper function to format numbers with commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Change handlers for package price
  document
    .getElementById("packagePrice")
    .addEventListener("input", function () {
      // You can add validation here if needed
    });

  // Add change handlers for extras prices and quantities
  extras.forEach((item) => {
    if (item.priceId) {
      document
        .getElementById(item.priceId)
        .addEventListener("input", function () {
          // You can add validation here if needed
        });
    }

    if (item.qtyId) {
      document
        .getElementById(item.qtyId)
        .addEventListener("input", function () {
          // You can add validation here if needed
        });
    }

    // Add change handler for checkboxes
    document
      .getElementById(item.includeId)
      .addEventListener("change", function () {
        const isChecked = this.checked;

        // Enable/disable the corresponding form fields
        if (item.sizeId) {
          document.getElementById(item.sizeId).disabled = !isChecked;
        }

        if (item.qtyId) {
          document.getElementById(item.qtyId).disabled = !isChecked;
        }

        if (item.priceId) {
          document.getElementById(item.priceId).disabled = !isChecked;
        }
      });
  });

  // Add change handlers for package items checkboxes
  packageItems.forEach((item) => {
    document
      .getElementById(item.includeId)
      .addEventListener("change", function () {
        const isChecked = this.checked;

        // Enable/disable the corresponding form fields
        document.getElementById(item.sizeId).disabled = !isChecked;
        document.getElementById(item.qtyId).disabled = !isChecked;
      });
  });

  // Initialize form fields based on checkbox status
  function initFormFields() {
    // Initialize extras fields
    extras.forEach((item) => {
      const isChecked = document.getElementById(item.includeId).checked;

      if (item.sizeId) {
        document.getElementById(item.sizeId).disabled = !isChecked;
      }

      if (item.qtyId) {
        document.getElementById(item.qtyId).disabled = !isChecked;
      }

      if (item.priceId) {
        document.getElementById(item.priceId).disabled = !isChecked;
      }
    });

    // Initialize package items fields
    packageItems.forEach((item) => {
      const isChecked = document.getElementById(item.includeId).checked;

      document.getElementById(item.sizeId).disabled = !isChecked;
      document.getElementById(item.qtyId).disabled = !isChecked;
    });
  }

  // Call initialization function
  initFormFields();
});
