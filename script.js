
const targetDateTime = '2024-09-28T01:00:00'; 
const targetTimeZoneOffset = 2 * 60; 
const tickSound = document.getElementById('tickSound');

const playTickSound = () => {
    tickSound.currentTime = 0; 
    tickSound.play(); 
};

function updateCountdown() {
    const now = new Date();

    const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

    const targetTime = new Date(targetDateTime);
    const targetTimeInUTC2 = new Date(targetTime.getTime() - (targetTimeZoneOffset * 60000));

    const timeDifference = targetTimeInUTC2 - utcNow;

    playTickSound();

    if (timeDifference <= 0) {
        document.querySelector('.countdown').innerHTML = '<p>The V7 Has Been Released! Check Discord Server</p>';
        return;
    }

    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor((timeDifference / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    updateTimeUnitWithSplash('days', days);
    updateTimeUnitWithSplash('hours', hours);
    updateTimeUnitWithSplash('minutes', minutes);
    updateTimeUnitWithSplash('seconds', seconds);

}


function updateTimeUnitWithSplash(id, newValue) {
    const element = document.getElementById(id);
    const numberElement = element.querySelector('.number');
    
    if (numberElement.textContent !== newValue.toString()) {
        numberElement.textContent = newValue;

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

function createSplashEffect(container) {
    const splashCount = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < splashCount; i++) {
        const circle = document.createElement('div');
        circle.classList.add('splash-circle');

        const angle = Math.random() * 2 * Math.PI; 
        const distance = Math.random() * 50 + 20; 

        const xMove = Math.cos(angle) * distance + 'px';  
        const yMove = Math.sin(angle) * distance + 'px';  

        circle.style.setProperty('--x-move', xMove);
        circle.style.setProperty('--y-move', yMove);

        container.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 800); 
    }
}

function generateParticles(count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 5 + 3}px`;  
        particle.style.height = particle.style.width;  
        particle.style.left = `${Math.random() * 100}vw`;  
        particle.style.bottom = `${Math.random() * 100}vh`; 
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`; 
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 15000); 
    }
}

generateParticles(30);


setInterval(updateCountdown, 1000);


setInterval(() => generateParticles(10), 4000);

updateCountdown();
