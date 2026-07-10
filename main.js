var typed = new Typed(".text", {
    strings: ["Full-Stack Developer", "Machine Learner Enthusiast", "Python Developer", "Problem Solver"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
function openCertificate(pdfPath) {

    document.getElementById("certificateFrame").src = pdfPath;

    const modal = new bootstrap.Modal(
        document.getElementById("certificateModal")
    );

    modal.show();
}

document.getElementById("certificateModal").addEventListener("hidden.bs.modal", function () {
    document.getElementById("certificateFrame").src = "";
});

// ================= CONTACT FORM VALIDATION =================

const form = document.getElementById("contactForm");

// Toast Functions
function showError(message) {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });
}

function showSuccess(message) {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Regular Expressions
    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name Validation
    if (!nameRegex.test(name)) {
        showError("Please enter a valid name.");
        return;
    }

    // Email Validation
    if (!emailRegex.test(email)) {
        showError("Please enter a valid email address.");
        return;
    }

    // Subject Validation
    if (subject.length < 5) {
        showError("Subject must be at least 5 characters.");
        return;
    }

    // Message Validation
    if (message.length < 10) {
        showError("Message must be at least 10 characters.");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    subject,
                    message
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            showSuccess("Message sent successfully!");
            form.reset();
        } else {
            showError(data.message || "Failed to send message.");
        }

    } catch (error) {
        console.log(error);
        showError("Unable to connect to server.");
    }
});