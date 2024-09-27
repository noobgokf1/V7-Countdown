// Set the target time to 12 AM (midnight) in UTC+2 timezone
const targetDateTime = '2024-09-28T01:00:00'; // Midnight 12:00 AM (UTC+2)
const targetTimeZoneOffset = 2 * 60; // UTC+2 in minutes
const tickSound = document.getElementById('tickSound');

const playTickSound = () => {
    tickSound.currentTime = 0; 
    tickSound.play(); 
};

function updateCountdown() {
    const now = new Date();

    // Get the current time in UTC
    const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

    // Calculate the target time in UTC+2 (shift UTC to UTC+2)
    const targetTime = new Date(targetDateTime);
    const targetTimeInUTC2 = new Date(targetTime.getTime() - (targetTimeZoneOffset * 60000));

    const timeDifference = targetTimeInUTC2 - utcNow;

    playTickSound();

    if (timeDifference <= 0) {
        document.querySelector('.countdown').innerHTML = '<p>The V7 Has Been Released! Check Discord Server</p>';
        return;
    }

    // Calculate days, hours, minutes, seconds
    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor((timeDifference / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Update the countdown display
    updateTimeUnitWithSplash('days', days);
    updateTimeUnitWithSplash('hours', hours);
    updateTimeUnitWithSplash('minutes', minutes);
    updateTimeUnitWithSplash('seconds', seconds);

}

// Update time unit and trigger splash effect when the value changes
function updateTimeUnitWithSplash(id, newValue) {
    const element = document.getElementById(id);
    const numberElement = element.querySelector('.number');
    
    // Only animate if the value has changed
    if (numberElement.textContent !== newValue.toString()) {
        numberElement.textContent = newValue;

        // Trigger the splash effect
        createSplashEffect(element);
    }
}

document.addEventListener('click', () => {
    const backgroundSound = document.getElementById('backgroundSound');
    backgroundSound.volume = 0.2
    if (backgroundSound.paused) {
        backgroundSound.play();
    }
});

// Create the splash effect at the center of the number
function createSplashEffect(container) {
    const splashCount = Math.floor(Math.random() * 6) + 5; // Random between 5 and 10 circles
    for (let i = 0; i < splashCount; i++) {
        const circle = document.createElement('div');
        circle.classList.add('splash-circle');

        // Random direction for circle movement (angle)
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        const distance = Math.random() * 50 + 20;  // Random distance to travel

        // Set the x and y move values based on the angle
        const xMove = Math.cos(angle) * distance + 'px';  // Move in x-direction
        const yMove = Math.sin(angle) * distance + 'px';  // Move in y-direction

        // Apply the movement values to the CSS variables
        circle.style.setProperty('--x-move', xMove);
        circle.style.setProperty('--y-move', yMove);

        // Append circle to the container
        container.appendChild(circle);

        // Remove the circle after animation
        setTimeout(() => {
            circle.remove();
        }, 800); // Match with CSS animation duration
    }
}

// Generate floating particles
function generateParticles(count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 5 + 3}px`;  // Random width
        particle.style.height = particle.style.width;  // Keep it a circle
        particle.style.left = `${Math.random() * 100}vw`;  // Random horizontal start
        particle.style.bottom = `${Math.random() * 100}vh`; // Random vertical start
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;  // Random speed
        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 15000); // Max particle duration
    }
}

// Call particle generation
generateParticles(30);

// Update countdown every 1 second
setInterval(updateCountdown, 1000);

// Generate new particles every few seconds
setInterval(() => generateParticles(10), 4000);

// Initialize countdown immediately
updateCountdown();
