document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const formSteps = document.querySelectorAll('.form-step');
    let currentStep = 0;

    // Initialize Flatpickr for date and time selection
    flatpickr("#bookingDate", {
        dateFormat: "Y-m-d",
        minDate: "today"
    });

    flatpickr("#bookingTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minTime: "09:00",
        maxTime: "19:00",
        minuteIncrement: 15
    });

    // Show current step
    function showStep(stepIndex) {
        formSteps.forEach((step, index) => step.classList.toggle('active', index === stepIndex));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Calculate total price
    function calculateTotalPrice() {
        return Array.from(document.querySelectorAll('input[name="service"]:checked'))
            .reduce((total, cb) => total + parseFloat(cb.dataset.price || 0), 0);
    }

    // Update summary section
    function updateSummary() {
        const summaryServices = document.getElementById('summaryServices');
        summaryServices.innerHTML = '';

        document.querySelectorAll('input[name="service"]:checked').forEach(cb => {
            const li = document.createElement('li');
            li.textContent = `${cb.value} ($${cb.dataset.price})`;
            summaryServices.appendChild(li);
        });

        document.getElementById('summaryTotalPrice').textContent = `$${calculateTotalPrice().toFixed(2)}`;
        document.getElementById('summaryDate').textContent = document.getElementById('bookingDate').value || 'Not selected';
        document.getElementById('summaryTime').textContent = document.getElementById('bookingTime').value || 'Not selected';
        document.getElementById('summaryName').textContent = document.getElementById('clientName').value || 'N/A';
        document.getElementById('summaryEmail').textContent = document.getElementById('clientEmail').value || 'N/A';
        document.getElementById('summaryPhone').textContent = document.getElementById('clientPhone').value || 'N/A';

        const staffSelect = document.getElementById('staffPreference');
        document.getElementById('summaryStaff').textContent = staffSelect.options[staffSelect.selectedIndex]?.text || 'No preference';
    }

    // Next buttons
    document.querySelectorAll('[id^="nextStep"]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep === 0 && document.querySelectorAll('input[name="service"]:checked').length === 0) {
                alert('Please select at least one service.');
                return;
            }
            if (currentStep === 1) {
                const date = document.getElementById('bookingDate').value;
                const time = document.getElementById('bookingTime').value;
                if (!date || !time) {
                    alert('Please select both a date and a time.');
                    return;
                }
            }
            if (currentStep === 2) {
                const name = document.getElementById('clientName').value;
                const email = document.getElementById('clientEmail').value;
                const phone = document.getElementById('clientPhone').value;
                if (!name || !email || !phone) {
                    alert('Please fill in all your contact details.');
                    return;
                }
                if (!/\S+@\S+\.\S+/.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                updateSummary();
            }
            currentStep++;
            showStep(currentStep);
        });
    });

    // Previous buttons
    document.querySelectorAll('[id^="prevStep"]').forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep = Math.max(currentStep - 1, 0);
            showStep(currentStep);
        });
    });

    // Form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            services: Array.from(document.querySelectorAll('input[name="service"]:checked')).map(cb => ({
                name: cb.value,
                price: parseFloat(cb.dataset.price)
            })),
            totalPrice: calculateTotalPrice(),
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            clientName: document.getElementById('clientName').value,
            clientEmail: document.getElementById('clientEmail').value,
            clientPhone: document.getElementById('clientPhone').value,
            staffPreference: document.getElementById('staffPreference').value
        };
        console.log('Booking Confirmed:', formData);

        // Show confirmation message
        bookingForm.style.display = 'none';
        const confirmation = document.getElementById('bookingConfirmation');
        confirmation.style.display = 'block';
        document.getElementById('confirmedEmail').textContent = formData.clientEmail;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize
    showStep(currentStep);
});
