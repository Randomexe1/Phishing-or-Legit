// ------------------------------
// TITLE & END SCREEN LOGIC
// ------------------------------
const titleScreen = document.getElementById("titleScreen");
const gameContainer = document.getElementById("gameContainer");
const endScreen = document.getElementById("endScreen");

const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");

const finalScoreEl = document.getElementById("finalScore");
const finalTotalEl = document.getElementById("finalTotal");
const finalAccuracyEl = document.getElementById("finalAccuracy");

startButton.addEventListener("click", () => {
  titleScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  initQuiz();
});

playAgainButton.addEventListener("click", () => {
  endScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  initQuiz();
});

// ------------------------------
// 20-EMAIL QUESTION BANK
// ------------------------------
const questions = [
  // 10 LEGITIMATE EMAILS
  {
    from: "IT Support <it-helpdesk@school.edu>",
    time: "8:12 AM",
    subject: "Planned maintenance on student Wi‑Fi tonight",
    body:
      "Hello,\n\nWe will be performing scheduled maintenance on the student Wi‑Fi network tonight from 11:00 PM to 1:00 AM.\n\nDuring this window, you may briefly lose access to the Internet. No action is required.\n\nThank you,\nIT Support",
    isPhishing: false,
    explanation: "Calm tone, no links, no urgency, and a familiar sender."
  },
  {
    from: "Library Services <library@school.edu>",
    time: "10:03 AM",
    subject: "Reminder: Book due tomorrow",
    body:
      "Hi,\n\nThis is a reminder that your borrowed book, \"Introduction to Networking\", is due tomorrow.\n\nYou can renew it on the official library website.\n\nThank you,\nSchool Library",
    isPhishing: false,
    explanation: "A normal reminder referencing a real service you know."
  },
  {
    from: "Cafeteria <noreply@schoolcafeteria.edu>",
    time: "12:15 PM",
    subject: "New lunch menu survey",
    body:
      "Hello students,\n\nWe are updating our lunch menu and would love your feedback.\n\nPlease complete the survey on the official school website by Friday.\n\nThank you,\nCafeteria Staff",
    isPhishing: false,
    explanation: "Points to the official school website and uses a normal tone."
  },
  {
    from: "Principal <principal@school.edu>",
    time: "9:30 AM",
    subject: "Assembly schedule for next week",
    body:
      "Good morning,\n\nNext Wednesday we will hold a school-wide assembly in the main gym.\n\nPlease check the official school portal for your grade's time slot.\n\nThank you,\nPrincipal",
    isPhishing: false,
    explanation: "Standard school announcement with no suspicious elements."
  },
  {
    from: "Counselor <counseling@school.edu>",
    time: "2:05 PM",
    subject: "Optional workshop: Study skills",
    body:
      "Hi,\n\nWe are offering an optional study skills workshop next week.\n\nIf interested, sign up on the counseling page.\n\nBest,\nSchool Counselor",
    isPhishing: false,
    explanation: "Calm, optional, and references a known school page."
  },
  {
    from: "Science Department <science@school.edu>",
    time: "7:55 AM",
    subject: "Field trip permission reminder",
    body:
      "Hello,\n\nIf you are attending the science museum trip, please return your permission form by Friday.\n\nForms can be submitted to your science teacher.\n\nThank you,\nScience Department",
    isPhishing: false,
    explanation: "No links, no urgency, and a familiar school department."
  },
  {
    from: "Nurse’s Office <nurse@school.edu>",
    time: "11:22 AM",
    subject: "Vaccination record update",
    body:
      "Hello,\n\nWe are updating student vaccination records.\n\nIf you recently received a vaccine, please bring a physical copy of your updated record to the nurse’s office.\n\nThank you,\nSchool Nurse",
    isPhishing: false,
    explanation: "Requests an in‑person action, not digital credentials."
  },
  {
    from: "Math Club <mathclub@school.edu>",
    time: "4:18 PM",
    subject: "Math Club meeting this Thursday",
    body:
      "Hi everyone,\n\nOur next Math Club meeting is this Thursday after school in Room 204.\n\nSnacks will be provided.\n\nSee you there!",
    isPhishing: false,
    explanation: "A normal club announcement with no suspicious content."
  },
  {
    from: "Yearbook Committee <yearbook@school.edu>",
    time: "1:44 PM",
    subject: "Submit your club photos",
    body:
      "Hello,\n\nWe are collecting club photos for the yearbook.\n\nPlease upload them to the official yearbook portal by next Friday.\n\nThank you,\nYearbook Committee",
    isPhishing: false,
    explanation: "References a known school portal and uses a normal tone."
  },
  {
    from: "Coach Ramirez <coach.ramirez@school.edu>",
    time: "6:50 AM",
    subject: "Practice schedule update",
    body:
      "Good morning team,\n\nPractice will end 30 minutes early today due to gym availability.\n\nSee you after school.\n\nCoach Ramirez",
    isPhishing: false,
    explanation: "A simple schedule update from a known coach."
  },

  // 9 OBVIOUS PHISHING EMAILS
  {
    from: "Micorsoft Security Team <security@micorsoft-support.com>",
    time: "6:41 AM",
    subject: "URGENT: Your account will be terminated in 24 hours!!!",
    body:
      "Dear user,\n\nWe detected unusual activites in your account.\n\nCLICK NOW to verify: http://micorsoft-security-check.com/login\n\nFailure will result in permanent lose of data.\n\nMicorsoft Team",
    isPhishing: true,
    explanation: "Typos, fake domain, extreme urgency, and a suspicious link."
  },
  {
    from: "Bank Alert <support@bank-secure-check.com>",
    time: "3:02 AM",
    subject: "Verify your bank account now",
    body:
      "Dear customer,\n\nYour bank acount is locked.\n\nReply with your full name, DOB, and PIN.\n\nSincerly,\nSecurity Department",
    isPhishing: true,
    explanation: "Banks never ask for PINs or personal info by email."
  },
  {
    from: "Gaming Rewards <rewards@free-steamcodes.net>",
    time: "11:47 PM",
    subject: "You won a FREE GAME!!!",
    body:
      "Congratulation!\n\nDownload the attached file to claim your prize.\n\nDo not share this email.",
    isPhishing: true,
    explanation: "Too good to be true and asks you to run an unknown file."
  },
  {
    from: "Apple Billing <billing@apple-payments-check.net>",
    time: "5:22 AM",
    subject: "Your Apple ID has been suspended",
    body:
      "Your Apple ID is suspended due to suspicious logins.\n\nRestore access here: http://apple-verify-now.net",
    isPhishing: true,
    explanation: "Fake domain and scare tactics."
  },
  {
    from: "School Admin <admin@school-verification.com>",
    time: "9:14 PM",
    subject: "Update your student password",
    body:
      "Your password has expired.\n\nClick here to reset: http://school-login-reset.com",
    isPhishing: true,
    explanation: "Schools do not use external password-reset domains."
  },
  {
    from: "Package Delivery <tracking@fast-shipper.net>",
    time: "7:03 AM",
    subject: "Your package cannot be delivered",
    body:
      "We could not deliver your package.\n\nPay the $1.50 redelivery fee here: http://fast-shipper-fee.com",
    isPhishing: true,
    explanation: "Unexpected package + payment request = classic scam."
  },
  {
    from: "Scholarship Board <awards@scholarship-winner.net>",
    time: "8:55 PM",
    subject: "You have been selected for a scholarship",
    body:
      "You are selected for a $5,000 scholarship.\n\nProvide your SSN to confirm eligibility.",
    isPhishing: true,
    explanation: "Requests highly sensitive information."
  },
  {
    from: "Zoom Support <support@zoom-video-help.net>",
    time: "6:12 AM",
    subject: "Your Zoom account will be disabled",
    body:
      "Your account will be disabled unless you verify.\n\nClick here: http://zoom-verify-login.net",
    isPhishing: true,
    explanation: "Fake domain and urgency."
  },
  {
    from: "Spotify Premium <premium@spotify-upgrade.net>",
    time: "4:33 AM",
    subject: "Your payment failed",
    body:
      "Your Spotify payment failed.\n\nUpdate your card here: http://spotify-billing-update.net",
    isPhishing: true,
    explanation: "Spotify does not use off‑brand billing domains."
  },

  // 1 SUBTLE / HARD-TO-SPOT PHISHING EMAIL
  {
    from: "School Portal <notifications@school-edu.com>",
    time: "1:22 PM",
    subject: "New message from your teacher",
    body:
      "Hello,\n\nYou have received a new message from one of your teachers.\n\nView it here: https://school-edu.com/portal/messages\n\nThank you,\nSchool Portal",
    isPhishing: true,
    explanation:
      "Looks professional, but the domain is school-edu.com, not the real school.edu. Attackers often register look‑alike domains."
  }
];

// ------------------------------
// QUIZ LOGIC
// ------------------------------
const emailFromEl = document.getElementById("emailFrom");
const emailTimeEl = document.getElementById("emailTime");
const emailSubjectEl = document.getElementById("emailSubject");
const emailBodyEl = document.getElementById("emailBody");
const emailTagEl = document.getElementById("emailTag");

const questionNumberEl = document.getElementById("questionNumber");
const questionTotalEl = document.getElementById("questionTotal");
const scoreDisplayEl = document.getElementById("scoreDisplay");
const progressFillEl = document.getElementById("progressFill");
const legitRatioLabelEl = document.getElementById("legitRatioLabel");

const btnPhishing = document.getElementById("btnPhishing");
const btnLegit = document.getElementById("btnLegit");
const btnNext = document.getElementById("btnNext");

const feedbackEl = document.getElementById("feedback");
const feedbackIconEl = document.getElementById("feedbackIcon");
const feedbackTitleEl = document.getElementById("feedbackTitle");
const feedbackMessageEl = document.getElementById("feedbackMessage");

let currentIndex = 0;
let score = 0;
let answered = false;

const totalQuestions = questions.length;
const totalLegit = questions.filter(q => !q.isPhishing).length;
const totalPhishing = totalQuestions - totalLegit;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initQuiz() {
  shuffle(questions);
  currentIndex = 0;
  score = 0;
  answered = false;
  scoreDisplayEl.textContent = "0";
  questionTotalEl.textContent = totalQuestions.toString();
  feedbackEl.classList.remove("visible", "correct", "incorrect");
  btnNext.style.display = "none";
  btnPhishing.disabled = false;
  btnLegit.disabled = false;
  updateLegitRatioLabel();
  renderQuestion();
}

function updateLegitRatioLabel() {
  legitRatioLabelEl.textContent = `Legit: ${totalLegit} • Phishing: ${totalPhishing}`;
}

function renderQuestion() {
  const q = questions[currentIndex];
  emailFromEl.textContent = q.from;
  emailTimeEl.textContent = q.time;
  emailSubjectEl.textContent = q.subject;
  emailBodyEl.textContent = q.body;

  emailTagEl.textContent = "Training";
  emailTagEl.style.color = "#9ca3af";
  emailTagEl.style.borderColor = "rgba(148, 163, 184, 0.4)";

  questionNumberEl.textContent = (currentIndex + 1).toString();
  progressFillEl.style.width = ((currentIndex) / totalQuestions) * 100 + "%";

  feedbackEl.classList.remove("visible", "correct", "incorrect");
  answered = false;
  btnNext.style.display = "none";
  btnPhishing.disabled = false;
  btnLegit.disabled = false;
}

function showFeedback(isCorrect, explanation) {
  answered = true;
  btnPhishing.disabled = true;
  btnLegit.disabled = true;

  if (currentIndex < totalQuestions - 1) {
    btnNext.style.display = "block";
  } else {
    showEndScreen();
  }

  feedbackEl.classList.add("visible");
  if (isCorrect) {
    feedbackEl.classList.add("correct");
    feedbackIconEl.textContent = "✅";
    feedbackTitleEl.textContent = "Correct!";
  } else {
    feedbackEl.classList.add("incorrect");
    feedbackIconEl.textContent = "⚠️";
    feedbackTitleEl.textContent = "Incorrect.";
  }

  feedbackMessageEl.textContent = explanation;

  const q = questions[currentIndex];
  if (q.isPhishing) {
    emailTagEl.textContent = "Suspicious";
    emailTagEl.style.color = "#f97373";
    emailTagEl.style.borderColor = "rgba(248, 113, 113, 0.8)";
  } else {
    emailTagEl.textContent = "Likely safe";
    emailTagEl.style.color = "#4ade80";
    emailTagEl.style.borderColor = "rgba(34, 197, 94, 0.7)";
  }
}

function showEndScreen() {
  const accuracy = Math.round((score / totalQuestions) * 100);
  finalScoreEl.textContent = score.toString();
  finalTotalEl.textContent = totalQuestions.toString();
  finalAccuracyEl.textContent = accuracy.toString();

  gameContainer.classList.add("hidden");
  endScreen.classList.remove("hidden");
}

function handleAnswer(userThinksPhishing) {
  if (answered) return;
  const q = questions[currentIndex];
  const isCorrect = (userThinksPhishing === q.isPhishing);
  if (isCorrect) {
    score++;
    scoreDisplayEl.textContent = score.toString();
  }
  showFeedback(isCorrect, q.explanation);
}

btnPhishing.addEventListener("click", () => handleAnswer(true));
btnLegit.addEventListener("click", () => handleAnswer(false));

btnNext.addEventListener("click", () => {
  if (currentIndex < totalQuestions - 1) {
    currentIndex++;
    renderQuestion();
  }
});
