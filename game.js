// Flixter ChronoClash - Game Logic

let allClips = [];
let currentLeftClip = null;
let currentRightClip = null;

let score = 0;
let streak = 0;
let highScore = 0;
let isAnswered = false;
let flaggedClips = []; // Array of flagged clip numbers

// DOM Elements
const scoreVal = document.getElementById('score-val');
const streakVal = document.getElementById('streak-val');
const highScoreVal = document.getElementById('highscore-val');

const videoLeft = document.getElementById('video-left');
const videoRight = document.getElementById('video-right');

const titleLeft = document.getElementById('title-left');
const titleRight = document.getElementById('title-right');
const yearLeft = document.getElementById('year-left');
const yearRight = document.getElementById('year-right');
const quoteLeft = document.getElementById('quote-left');
const quoteRight = document.getElementById('quote-right');

const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

const cardLeft = document.getElementById('clip-card-left');
const cardRight = document.getElementById('clip-card-right');
const detailsLeft = document.getElementById('details-left');
const detailsRight = document.getElementById('details-right');

const resultsPanel = document.getElementById('results-panel');
const feedbackBanner = document.getElementById('feedback-banner');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');
const resultsExplanation = document.getElementById('results-explanation');
const nextBtn = document.getElementById('next-btn');

// Flag DOM Elements
const flagBtnLeft = document.getElementById('flag-btn-left');
const flagBtnRight = document.getElementById('flag-btn-right');
const viewFlaggedBtn = document.getElementById('view-flagged-btn');
const flaggedCountDisplay = document.getElementById('flagged-count');
const flaggedModal = document.getElementById('flagged-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const flaggedList = document.getElementById('flagged-list');
const flaggedNumbersBox = document.getElementById('flagged-numbers-box');
const noFlaggedMsg = document.getElementById('no-flagged-msg');

// Initialize Game
async function init() {
    // Load High Score from Local Storage
    highScore = parseInt(localStorage.getItem('flixter_high_score') || '0', 10);
    highScoreVal.textContent = highScore;

    // Load Flagged Clips
    flaggedClips = JSON.parse(localStorage.getItem('flixter_flagged_clips') || '[]');
    updateFlaggedCount();

    try {
        const response = await fetch('downloaded_clips.json');
        if (!response.ok) {
            throw new Error(`Failed to load downloaded_clips.json: ${response.status}`);
        }
        const data = await response.json();
        
        // Filter out NA clips and normalize backslashes to forward slashes for URLs
        allClips = data
            .filter(item => item.clipPath && item.clipPath !== 'NA')
            .map(item => ({
                ...item,
                clipPath: item.clipPath.replace(/\\/g, '/')
            }));

        console.log(`Loaded ${allClips.length} playable clips.`);
        
        if (allClips.length < 2) {
            alert("Not enough clips downloaded to play the game yet. Please run the downloaders first!");
            return;
        }

        // Add Button Handlers
        btnLeft.addEventListener('click', () => makeChoice('left'));
        btnRight.addEventListener('click', () => makeChoice('right'));
        nextBtn.addEventListener('click', startRound);

        // Flag Action Listeners
        flagBtnLeft.addEventListener('click', () => toggleFlag('left'));
        flagBtnRight.addEventListener('click', () => toggleFlag('right'));
        viewFlaggedBtn.addEventListener('click', openFlaggedModal);
        closeModalBtn.addEventListener('click', closeFlaggedModal);
        
        // Close modal on overlay click
        flaggedModal.addEventListener('click', (e) => {
            if (e.target === flaggedModal) {
                closeFlaggedModal();
            }
        });

        startRound();
    } catch (err) {
        console.error("Game initialization failed:", err);
        alert("Failed to load clips data. Make sure you are running a local web server (e.g., 'npm run start-game') and not opening index.html directly from file://");
    }
}

// Start a New Round
function startRound() {
    isAnswered = false;

    // Reset UI Classes & Highlights
    cardLeft.classList.remove('winner', 'loser');
    cardRight.classList.remove('winner', 'loser');
    
    btnLeft.classList.remove('selected-winner', 'selected-loser');
    btnRight.classList.remove('selected-winner', 'selected-loser');
    
    btnLeft.disabled = false;
    btnRight.disabled = false;
    
    detailsLeft.classList.remove('revealed');
    detailsRight.classList.remove('revealed');
    
    resultsPanel.classList.remove('show');

    // Pick two random clips with different release years (to avoid draw issues)
    let leftIndex, rightIndex;
    let attempts = 0;
    
    do {
        leftIndex = Math.floor(Math.random() * allClips.length);
        rightIndex = Math.floor(Math.random() * allClips.length);
        attempts++;
        
        // Safety break to prevent infinite loops if data is too small or uniform
        if (attempts > 100) break;
    } while (
        leftIndex === rightIndex || 
        allClips[leftIndex].year === allClips[rightIndex].year
    );

    currentLeftClip = allClips[leftIndex];
    currentRightClip = allClips[rightIndex];

    // Load Video Sources
    videoLeft.src = currentLeftClip.clipPath;
    videoRight.src = currentRightClip.clipPath;

    // Pre-load videos
    videoLeft.load();
    videoRight.load();

    // Populate Details (will be revealed later)
    titleLeft.textContent = currentLeftClip.movie;
    titleRight.textContent = currentRightClip.movie;
    
    yearLeft.textContent = currentLeftClip.year;
    yearRight.textContent = currentRightClip.year;
    
    quoteLeft.textContent = `"${currentLeftClip.quote}"`;
    quoteRight.textContent = `"${currentRightClip.quote}"`;

    // Render Flag Button states for this round
    renderFlagButtonState('left');
    renderFlagButtonState('right');
}

// Handle User Selection
function makeChoice(selectedSide) {
    if (isAnswered) return;
    isAnswered = true;

    // Pause both videos
    videoLeft.pause();
    videoRight.pause();

    // Disable choice buttons
    btnLeft.disabled = true;
    btnRight.disabled = true;

    // Determine correct side (oldest year)
    const oldestSide = currentLeftClip.year < currentRightClip.year ? 'left' : 'right';
    const isCorrect = selectedSide === oldestSide;

    // Apply Card outlines
    if (oldestSide === 'left') {
        cardLeft.classList.add('winner');
        cardRight.classList.add('loser');
    } else {
        cardRight.classList.add('winner');
        cardLeft.classList.add('loser');
    }

    // Apply button color states
    if (isCorrect) {
        if (selectedSide === 'left') {
            btnLeft.classList.add('selected-winner');
        } else {
            btnRight.classList.add('selected-winner');
        }
    } else {
        if (selectedSide === 'left') {
            btnLeft.classList.add('selected-loser');
        } else {
            btnRight.classList.add('selected-loser');
        }
    }

    // Reveal Details (Movies & Years)
    detailsLeft.classList.add('revealed');
    detailsRight.classList.add('revealed');

    // Update Stats
    if (isCorrect) {
        score++;
        streak++;
        
        feedbackBanner.className = "feedback-banner correct";
        feedbackIcon.textContent = "🎉";
        feedbackText.textContent = "Correct!";
        
        if (streak > highScore) {
            highScore = streak;
            localStorage.setItem('flixter_high_score', highScore.toString());
            highScoreVal.textContent = highScore;
        }
    } else {
        streak = 0;
        
        feedbackBanner.className = "feedback-banner incorrect";
        feedbackIcon.textContent = "😢";
        feedbackText.textContent = "Incorrect";
    }

    // Update displays
    scoreVal.textContent = score;
    streakVal.textContent = `🔥 ${streak}`;

    // Explanation details
    const olderClip = oldestSide === 'left' ? currentLeftClip : currentRightClip;
    const newerClip = oldestSide === 'left' ? currentRightClip : currentLeftClip;
    const diff = newerClip.year - olderClip.year;
    
    resultsExplanation.textContent = `${olderClip.movie} (${olderClip.year}) was released ${diff} year${diff === 1 ? '' : 's'} before ${newerClip.movie} (${newerClip.year}).`;

    // Show Results Panel
    resultsPanel.classList.add('show');
}

// Toggle flagging state for a side
function toggleFlag(side) {
    const clip = side === 'left' ? currentLeftClip : currentRightClip;
    if (!clip) return;

    const num = clip.number;
    const idx = flaggedClips.indexOf(num);

    if (idx > -1) {
        // Unflag
        flaggedClips.splice(idx, 1);
    } else {
        // Flag
        flaggedClips.push(num);
        flaggedClips.sort((a, b) => a - b);
    }

    localStorage.setItem('flixter_flagged_clips', JSON.stringify(flaggedClips));
    updateFlaggedCount();
    renderFlagButtonState(side);
}

// Update the count on the dashboard button
function updateFlaggedCount() {
    flaggedCountDisplay.textContent = flaggedClips.length;
}

// Render the Flag Button label and classes
function renderFlagButtonState(side) {
    const clip = side === 'left' ? currentLeftClip : currentRightClip;
    const btn = side === 'left' ? flagBtnLeft : flagBtnRight;
    if (!clip || !btn) return;

    const isFlagged = flaggedClips.includes(clip.number);
    if (isFlagged) {
        btn.classList.add('flagged');
        btn.textContent = "🚩 Flagged";
    } else {
        btn.classList.remove('flagged');
        btn.textContent = "🚩 Flag Clip";
    }
}

// Modal open/close actions
function openFlaggedModal() {
    renderFlaggedModalData();
    flaggedModal.classList.add('active');
}

function closeFlaggedModal() {
    flaggedModal.classList.remove('active');
}

// Render the elements inside the modal
function renderFlaggedModalData() {
    flaggedNumbersBox.innerHTML = '';
    flaggedList.innerHTML = '';

    if (flaggedClips.length === 0) {
        noFlaggedMsg.style.display = 'block';
        return;
    }

    noFlaggedMsg.style.display = 'none';

    flaggedClips.forEach(num => {
        const clip = allClips.find(c => c.number === num);
        
        // 1. Create Chip
        const chip = document.createElement('div');
        chip.className = 'flagged-chip';
        chip.innerHTML = `
            <span>#${num}</span>
            <button class="remove-chip-btn" data-num="${num}">&times;</button>
        `;
        flaggedNumbersBox.appendChild(chip);

        // 2. Create list item detail
        if (clip) {
            const li = document.createElement('li');
            li.className = 'flagged-item';
            li.innerHTML = `
                <div class="flagged-item-details">
                    <span class="flagged-item-title">${clip.movie} (${clip.year})</span>
                    <span class="flagged-item-quote">"${clip.quote}"</span>
                </div>
                <span class="flagged-item-num">#${clip.number}</span>
            `;
            flaggedList.appendChild(li);
        }
    });

    // Add remove handlers to chips
    document.querySelectorAll('.remove-chip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const num = parseInt(e.target.getAttribute('data-num'), 10);
            const idx = flaggedClips.indexOf(num);
            if (idx > -1) {
                flaggedClips.splice(idx, 1);
                localStorage.setItem('flixter_flagged_clips', JSON.stringify(flaggedClips));
                updateFlaggedCount();
                
                // Re-render modal and active round button states
                renderFlaggedModalData();
                renderFlagButtonState('left');
                renderFlagButtonState('right');
            }
        });
    });
}

// Run Initializer on window load
window.addEventListener('DOMContentLoaded', init);
