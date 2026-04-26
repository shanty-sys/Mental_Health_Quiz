/**
 * MENTAL HEALTH AWARENESS QUIZ - APP LOGIC
 * Focus: HCI, Empathy, and Progress Tracking
 */

// 1. DATA: 10 Lessons & Quizzes
const lessons = [
    {
        id: 0,
        title: "What Is Stress?",
        icon: "🌿",
        content: "Stress is your body's reaction to a challenge or demand. In short bursts, it can be positive, such as when it helps you avoid danger. But when stress lasts a long time, it may harm your health.",
        tip: "Try the 4-7-8 breathing technique when you feel a surge of stress.",
        question: "Is all stress inherently bad for the human body?",
        options: ["Yes, stress is always harmful.", "No, short-term stress can be a motivator.", "Stress has no effect on the body."],
        answer: 1, // Index of correct option
        explanation: "Short-term stress (eustress) can help with focus, but chronic stress is what we need to manage.",
        tipAfter: "Friendly tip: Notice where you feel stress in your body—shoulders, jaw, or stomach?"
    },
    {
        id: 1,
        title: "Understanding Anxiety",
        icon: "☁️",
        content: "Anxiety is more than just feeling stressed. It's a persistent feeling of dread or unease that doesn't go away even when the trigger is gone.",
        tip: "Anxiety often focuses on the future. Ground yourself in the 'now'.",
        question: "What is a key difference between stress and anxiety?",
        options: ["They are exactly the same thing.", "Anxiety is always shorter than stress.", "Stress goes away after a threat; anxiety can persist."],
        answer: 2,
        explanation: "Stress is typically a response to an external trigger, while anxiety is an internal persistent worry.",
        tipAfter: "Try the 5-4-3-2-1 grounding technique: name 5 things you can see."
    },
    {
        id: 2,
        title: "The Power of Sleep",
        icon: "🌙",
        content: "Sleep is the foundation of mental health. During sleep, your brain processes emotions and clears out toxins.",
        tip: "Keep your bedroom cool and dark for better sleep quality.",
        question: "How does sleep deprivation affect your emotional regulation?",
        options: ["It makes the emotional centers of the brain more reactive.", "It makes you more resilient.", "It has no impact on mood."],
        answer: 0,
        explanation: "Lack of sleep makes the amygdala more sensitive, leading to higher irritability and sadness.",
        tipAfter: "Try to put away screens 30 minutes before bed tonight."
    },
    {
        id: 3,
        title: "Social Connection",
        icon: "🤝",
        content: "Humans are social creatures. Quality connections release oxytocin, which acts as a natural stress buffer.",
        tip: "One deep conversation is often more healing than ten small-talks.",
        question: "Does 'connection' mean you have to be an extrovert?",
        options: ["No, even one meaningful bond provides mental health benefits.", "Yes, only extroverts get the benefits.", "Connection only counts if it is in-person."],
        answer: 0,
        explanation: "The quality of the bond matters far more than the quantity of friends you have.",
        tipAfter: "Reach out to one friend today just to say 'Hi'."
    },
    {
        id: 4,
        title: "Mindfulness & Presence",
        icon: "🧘",
        content: "Mindfulness is the practice of being fully present without judgment. It helps break the cycle of overthinking.",
        tip: "You can be mindful while doing anything—even washing dishes.",
        question: "What is the core goal of mindfulness?",
        options: ["To stop all thoughts completely.", "To think only positive thoughts.", "To observe thoughts without being controlled by them."],
        answer: 2,
        explanation: "Mindfulness isn't about clearing your mind; it's about noticing your mind without judgment.",
        tipAfter: "Take a deep breath. Right now. That's mindfulness!"
    },
    {
        id: 5,
        title: "Physical Movement",
        icon: "🏃",
        content: "Exercise releases endorphins and reduces cortisol. It’s one of the most effective natural anti-anxiety treatments.",
        tip: "A 10-minute walk can be just as effective as a 45-minute gym session for mood.",
        question: "How does exercise impact cortisol (the stress hormone)?",
        options: ["It increases it permanently.", "It helps the body regulate and lower it over time.", "It has no effect on hormones."],
        answer: 1,
        explanation: "Regular movement helps the body process and clear stress hormones more efficiently.",
        tipAfter: "Movement is a celebration of what your body can do, not a punishment."
    },
    {
        id: 6,
        title: "Setting Boundaries",
        icon: "🛡️",
        content: "Boundaries are the distance at which I can love you and still love me. They prevent burnout and resentment.",
        tip: "'No' is a complete sentence.",
        question: "Is setting a boundary an act of selfishness?",
        options: ["Yes, you should always put others first.", "No, it is a form of self-respect that preserves relationships.", "Only if you say it rudely."],
        answer: 1,
        explanation: "Boundaries help sustain relationships by preventing the burnout that leads to withdrawal.",
        tipAfter: "It's okay to protect your peace."
    },
    {
        id: 7,
        title: "Self-Compassion",
        icon: "❤️",
        content: "We are often our own harshest critics. Self-compassion means treating yourself like you would treat a dear friend.",
        tip: "Notice your 'Self-Talk'. Would you say those things to a child?",
        question: "What is a component of self-compassion?",
        options: ["Recognizing that imperfection is part of the human experience.", "Ignoring your mistakes.", "Comparing yourself to others."],
        answer: 0,
        explanation: "Common humanity—the idea that everyone struggles—is a pillar of self-compassion.",
        tipAfter: "Forgive yourself for a mistake you made today. You're learning."
    },
    {
        id: 8,
        title: "Digital Well-being",
        icon: "📱",
        content: "Constant notifications and 'doom-scrolling' keep the brain in a state of high alert (fight or flight).",
        tip: "Turn off non-human notifications (apps/news) to reduce baseline anxiety.",
        question: "What is 'Doom-scrolling'?",
        options: ["Reading news only once a day.", "Playing video games for hours.", "Continuously scrolling through bad news despite it causing distress."],
        answer: 2,
        explanation: "Doom-scrolling keeps the brain's threat-detection system activated, causing chronic stress.",
        tipAfter: "Try a 'Grey-scale' screen mode to make your phone less addictive."
    },
    {
        id: 9,
        title: "Breaking the Stigma",
        icon: "🔓",
        content: "Mental health is just health. Seeking professional help is a sign of high emotional intelligence and strength.",
        tip: "Therapy is like a gym for your mind.",
        question: "Is asking for help a sign of weakness?",
        options: ["Yes, strong people handle things alone.", "No, it takes courage to recognize when you need support.", "Only if you have a serious diagnosis."],
        answer: 1,
        explanation: "Seeking help is a proactive way to manage your health and build long-term resilience.",
        tipAfter: "You've finished the lessons! You're a mental health advocate now."
    }
];

// 2. CORE UTILITIES
const getLessonId = () => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 0;
};

const saveProgress = (id) => {
    let completed = JSON.parse(localStorage.getItem('mh_completed') || '[]');
    if (!completed.includes(id)) {
        completed.push(id);
        localStorage.setItem('mh_completed', JSON.stringify(completed));
    }
};

// 3. PAGE ROUTING & RENDERING
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('lesson.html') || path.endsWith('/lesson')) {
        renderLesson();
    } else if (path.includes('quiz.html') || path.endsWith('/quiz')) {
        renderQuiz();
    } else if (path.includes('results.html') || path.endsWith('/results')) {
        renderResults();
    } else {
        // Default: home page (handles both index.html and /)
        renderHome();
    }
});

// --- HOME PAGE LOGIC ---
function renderHome() {
    const grid = document.getElementById('lessons-grid');
    const progFill = document.getElementById('prog-fill');
    const progCount = document.getElementById('prog-count');
    const completed = JSON.parse(localStorage.getItem('mh_completed') || '[]');

    // Update Progress Bar
    const pct = (completed.length / lessons.length) * 100;
    progFill.style.width = `${pct}%`;
    progCount.innerText = `${completed.length} of 10 complete`;

    // Fill Lessons
    grid.innerHTML = lessons.map((l, idx) => `
        <a href="lesson.html?id=${l.id}" class="lesson-chip ${completed.includes(l.id) ? 'completed' : ''}">
            ${completed.includes(l.id) ? '<span class="chip-check">✓</span>' : ''}
            <span class="chip-icon">${l.icon}</span>
            <span class="chip-num">Lesson ${idx + 1}</span>
            <div class="chip-title">${l.title}</div>
        </a>
    `).join('');
}

// --- LESSON PAGE LOGIC ---
function renderLesson() {
    const id = getLessonId();
    const lesson = lessons[id];

    document.getElementById('lesson-title').innerText = lesson.title;
    document.getElementById('lesson-num').innerText = `Lesson ${id + 1} of 10`;
    document.getElementById('lesson-icon').innerText = lesson.icon;
    document.getElementById('lesson-body').innerHTML = `<p>${lesson.content}</p>`;
    document.getElementById('tip-text').innerText = lesson.tip;
    document.getElementById('lesson-prog-fill').style.width = `${((id + 1) / 10) * 100}%`;
    document.getElementById('lesson-counter').innerText = `${id + 1} / 10`;
    
    document.getElementById('btn-quiz').href = `quiz.html?id=${id}`;
    
    // Set up Prev button
    const prevBtn = document.getElementById('btn-prev');
    if (id === 0) prevBtn.style.visibility = 'hidden';
    
    window.prevLesson = () => {
        window.location.href = `lesson.html?id=${id - 1}`;
    };
}

// --- QUIZ PAGE LOGIC ---
let currentScore = parseInt(sessionStorage.getItem('mh_score') || '0');

function maybeResetScore() {
    const id = getLessonId();
    if (id === 0) {
        currentScore = 0;
        sessionStorage.setItem('mh_score', 0);
    }
}

function renderQuiz() {
    maybeResetScore();
    const id = getLessonId();
    const lesson = lessons[id];
    
    document.getElementById('quiz-lesson-label').innerText = `Lesson ${id + 1} · ${lesson.title}`;
    document.getElementById('quiz-question').innerText = lesson.question;
    document.getElementById('score-num').innerText = currentScore;
    document.getElementById('back-to-lesson').href = `lesson.html?id=${id}`;
    document.getElementById('quiz-prog-fill').style.width = `${((id + 1) / 10) * 100}%`;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = lesson.options.map((opt, i) => `
        <button class="option-btn" onclick="checkAnswer(${i}, ${lesson.answer}, ${id})">
            <span class="option-marker">${String.fromCharCode(65 + i)}</span>
            ${opt}
        </button>
    `).join('');
}

window.checkAnswer = (selected, correct, lessonId) => {
    const buttons = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('feedback');
    const verdict = document.getElementById('feedback-verdict');
    const explanation = document.getElementById('feedback-explanation');
    const ftipText = document.getElementById('ftip-text');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selected === correct) {
        buttons[selected].classList.add('correct');
        verdict.innerText = "That's right! ✨";
        currentScore++;
        sessionStorage.setItem('mh_score', currentScore);
    } else {
        buttons[selected].classList.add('wrong');
        buttons[correct].classList.add('correct');
        verdict.innerText = "Not quite, but that's okay. 🌿";
    }

    explanation.innerText = lessons[lessonId].explanation;
    ftipText.innerText = lessons[lessonId].tipAfter;
    feedback.classList.remove('hidden');
    saveProgress(lessonId);
    
    document.getElementById('score-num').innerText = currentScore;

    // Update button text for final lesson
    if (lessonId === 9) {
        document.getElementById('btn-next').innerText = "See my results →";
    }
};

window.nextQuestion = () => {
    const id = getLessonId();
    if (id < 9) {
        window.location.href = `lesson.html?id=${id + 1}`;
    } else {
        window.location.href = `results.html`;
    }
};

// --- RESULTS PAGE LOGIC ---
function renderResults() {
    const finalScore = parseInt(sessionStorage.getItem('mh_score') || '0');
    const pct = Math.round((finalScore / 10) * 100);
    
    document.getElementById('score-big').innerText = `${finalScore}/10`;
    document.getElementById('score-pct').innerText = `${pct}%`;

    const badge = document.getElementById('result-badge');
    const msg = document.getElementById('result-message');

    if (pct >= 80) {
        badge.innerText = "Mental Health Champion 🏆";
        msg.innerText = "You have a deep understanding of emotional well-being. Share your light with others!";
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#7d77ba', '#ccbeeb', '#6fc997']
            });
        }
    } else if (pct >= 50) {
        badge.innerText = "Mindful Explorer 🌿";
        msg.innerText = "You're building great habits! Keep practicing these small shifts in perspective.";
    } else {
        badge.innerText = "Kind Beginner 🤍";
        msg.innerText = "Starting is the hardest part. You’ve taken the first step toward a healthier mind.";
    }
}

window.resetAndTryAgain = () => {
    localStorage.removeItem('mh_completed');
    sessionStorage.removeItem('mh_score');
    currentScore = 0;
    window.location.href = 'index.html';
};

window.shareResult = () => {
    const score = sessionStorage.getItem('mh_score') || '0';
    const pct = Math.round((parseInt(score) / 10) * 100);
    const text = `I scored ${score}/10 (${pct}%) on the Mental Health Awareness Quiz! 💚 Try it yourself!`;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.btn-outline');
        btn.innerText = 'Copied! ✓';
        setTimeout(() => btn.innerText = 'Share my result', 2000);
    }).catch(() => {
        alert('Could not copy. Please copy manually: ' + text);
    });
};
