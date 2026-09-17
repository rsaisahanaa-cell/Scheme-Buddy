/* =====================================================
   SCHEMEBUDDY 2.0
   COMPLETE FRONT-END LOGIC
===================================================== */


/* =====================================================
   DEFAULT USER
===================================================== */

const defaultUser = {

    name: "Sahanaa",

    age: 20,

    state: "Tamil Nadu",

    occupation: "Student",

    lifeEvent: "Started college"

};


let user =
    JSON.parse(
        localStorage.getItem(
            "schemeBuddyUser"
        )
    ) || defaultUser;


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadUser();

        updateDocumentReadiness();

        setupLanguage();

    }
);


/* =====================================================
   LOAD USER
===================================================== */

function loadUser() {

    document.getElementById(
        "dashboardGreeting"
    ).textContent =
        `Welcome, ${user.name}`;


    document.getElementById(
        "avatarLetter"
    ).textContent =
        getInitial(user.name);


    document.getElementById(
        "passportAvatar"
    ).textContent =
        getInitial(user.name);


    document.getElementById(
        "passportName"
    ).textContent =
        user.name;


    document.getElementById(
        "passportAge"
    ).textContent =
        user.age;


    document.getElementById(
        "passportState"
    ).textContent =
        user.state;


    document.getElementById(
        "passportOccupation"
    ).textContent =
        user.occupation;


    document.getElementById(
        "passportLifeEvent"
    ).textContent =
        user.lifeEvent;

}


function getInitial(name) {

    if (!name)
        return "S";

    return name
        .charAt(0)
        .toUpperCase();

}


/* =====================================================
   SAVE USER
===================================================== */

function saveProfile() {

    const name =
        document
            .getElementById("editName")
            .value
            .trim();


    const age =
        Number(
            document
                .getElementById("editAge")
                .value
        );


    const state =
        document
            .getElementById("editState")
            .value;


    const occupation =
        document
            .getElementById("editOccupation")
            .value;


    const lifeEvent =
        document
            .getElementById("editLifeEvent")
            .value;


    user = {

        name:
            name || "User",

        age:
            age || 18,

        state,

        occupation,

        lifeEvent

    };


    localStorage.setItem(
        "schemeBuddyUser",
        JSON.stringify(user)
    );


    loadUser();

    closeProfileModal();


    showToast(
        "Benefit Passport updated ✓"
    );

}


/* =====================================================
   EDIT PROFILE
===================================================== */

function editProfile() {

    document.getElementById(
        "editName"
    ).value =
        user.name;


    document.getElementById(
        "editAge"
    ).value =
        user.age;


    document.getElementById(
        "editState"
    ).value =
        user.state;


    document.getElementById(
        "editOccupation"
    ).value =
        user.occupation;


    document.getElementById(
        "editLifeEvent"
    ).value =
        user.lifeEvent;


    document.getElementById(
        "profileModal"
    ).classList.remove(
        "hidden"
    );

}


function closeProfileModal() {

    document.getElementById(
        "profileModal"
    ).classList.add(
        "hidden"
    );

}


/* =====================================================
   SIDEBAR
===================================================== */

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("open");

}


/* =====================================================
   SCROLL
===================================================== */

function scrollToSection(id) {

    const section =
        document.getElementById(id);


    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }


    document
        .getElementById("sidebar")
        .classList.remove("open");

}


/* =====================================================
   LIFE EVENT
===================================================== */

function triggerLifeEvent(eventName) {

    user.lifeEvent =
        eventName;


    localStorage.setItem(
        "schemeBuddyUser",
        JSON.stringify(user)
    );


    document.getElementById(
        "passportLifeEvent"
    ).textContent =
        eventName;


    showToast(
        `Benefit Radar updated for: ${eventName}`
    );


    updateRadarForLifeEvent(
        eventName
    );

}


function updateRadarForLifeEvent(
    eventName
) {

    const messageMap = {

        "Started college":
            "Education and student-support areas highlighted.",

        "Looking for work":
            "Employment and skill-development areas highlighted.",

        "Starting a business":
            "Entrepreneurship and business-support areas highlighted.",

        "Income changed":
            "Social welfare and income-sensitive areas highlighted."

    };


    const message =
        messageMap[eventName] ||
        "Your Benefit Radar has been refreshed.";


    showToast(message);

}


/* =====================================================
   BENEFIT RADAR
===================================================== */

function showOpportunity(type) {

    const messages = {

        education:
            "Education support selected. Verify current scholarships, eligibility and application requirements on the relevant official government portal.",

        employment:
            "Employment support selected. Explore skill-development and employment-related government programmes through official sources.",

        business:
            "Entrepreneurship support selected. Explore relevant government business-support programmes and verify their current eligibility rules."

    };


    showInfoModal(
        "Benefit Radar",
        messages[type]
    );

}


/* =====================================================
   FAMILY MAP
===================================================== */

function addFamilyMember() {

    const name =
        prompt(
            "Enter the family member's name:"
        );


    if (!name)
        return;


    const relation =
        prompt(
            "Enter their relationship:"
        ) || "Family member";


    const container =
        document.getElementById(
            "familyMembers"
        );


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "family-card";


    card.innerHTML = `

        <div class="family-avatar">
            👤
        </div>

        <div>

            <strong>
                ${escapeHTML(name)}
            </strong>

            <span>
                ${escapeHTML(relation)}
            </span>

            <small>
                Benefit areas to explore
            </small>

        </div>

        <button
            onclick="viewFamilyMember('${escapeHTML(name)}')"
        >
            View →
        </button>

    `;


    container.appendChild(
        card
    );


    showToast(
        `${name} added to your Family Benefit Map.`
    );

}


function viewFamilyMember(name) {

    showInfoModal(

        "Family Benefit Map",

        `${name}'s profile can be used to explore relevant benefit categories. Final eligibility must be verified against official scheme rules.`

    );

}


/* =====================================================
   DOCUMENT READINESS
===================================================== */

function updateDocumentReadiness() {

    const documents =
        [
            ...document.querySelectorAll(
                "[data-document]"
            )
        ];


    if (!documents.length)
        return;


    const completed =
        documents.filter(
            item =>
                item.checked
        ).length;


    const percentage =
        Math.round(
            (
                completed /
                documents.length
            ) * 100
        );


    document.getElementById(
        "documentScore"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "documentCircle"
    ).textContent =
        percentage;


    const message =
        document.getElementById(
            "documentMessage"
        );


    if (percentage === 100) {

        message.textContent =
            "Your demo checklist is complete. Verify the exact scheme requirements before applying.";

    }

    else if (percentage >= 70) {

        message.textContent =
            "Almost ready. Check the remaining requirements.";

    }

    else if (percentage >= 40) {

        message.textContent =
            "Some preparation may still be needed.";

    }

    else {

        message.textContent =
            "Start preparing the documents that may be required.";

    }


    const missing =
        documents.length -
        completed;


    document.getElementById(
        "missingCount"
    ).textContent =
        missing;


    updateMainReadiness(
        percentage
    );

}


/* Attach document listeners */

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target.matches(
                "[data-document]"
            )
        ) {

            updateDocumentReadiness();

        }

    }
);


/* =====================================================
   MAIN READINESS
===================================================== */

function updateMainReadiness(
    documentPercentage
) {

    let score =
        55;


    if (
        user.name &&
        user.age &&
        user.state
    ) {

        score += 15;

    }


    if (
        user.occupation
    ) {

        score += 10;

    }


    if (
        user.lifeEvent &&
        user.lifeEvent !== "None"
    ) {

        score += 5;

    }


    score +=
        Math.round(
            documentPercentage * .15
        );


    score =
        Math.min(
            score,
            100
        );


    document.getElementById(
        "mainReadiness"
    ).textContent =
        score;


    document.getElementById(
        "mainReadinessCircle"
    ).style.background =

        `conic-gradient(
            #aaa3ff ${score}%,
            #3c4058 ${score}%
        )`;

}


/* =====================================================
   WHY NOT ME
===================================================== */

function showWhyNotMe() {

    showInfoModal(

        "Why Not Me?",

        "SchemeBuddy breaks down the conditions into simple explanations. A profile match does not equal official eligibility. The final decision belongs to the relevant government authority."

    );

}


/* =====================================================
   CHATBOT
===================================================== */

function openChat() {

    document
        .getElementById("chatModal")
        .classList.remove(
            "hidden"
        );

}


function closeChat() {

    document
        .getElementById("chatModal")
        .classList.add(
            "hidden"
        );

}


function askQuick(question) {

    const input =
        document.getElementById(
            "chatInput"
        );


    input.value =
        question;


    document
        .getElementById("chatForm")
        .dispatchEvent(
            new Event("submit")
        );

}


/* =====================================================
   CHAT FORM
===================================================== */

document
    .getElementById("chatForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "chatInput"
                );


            const question =
                input.value.trim();


            if (!question)
                return;


            addChatMessage(
                question,
                "user"
            );


            input.value = "";


            setTimeout(

                function() {

                    const answer =
                        generateAIResponse(
                            question
                        );


                    addChatMessage(
                        answer,
                        "bot"
                    );

                },

                450

            );

        }
    );


/* =====================================================
   CHAT MESSAGE
===================================================== */

function addChatMessage(
    text,
    type
) {

    const container =
        document.getElementById(
            "chatMessages"
        );


    const message =
        document.createElement(
            "div"
        );


    message.className =
        type === "user"
            ? "user-message"
            : "bot-message";


    message.textContent =
        text;


    container.appendChild(
        message
    );


    container.scrollTop =
        container.scrollHeight;

}


/* =====================================================
   AI RESPONSE
===================================================== */

function generateAIResponse(
    question
) {

    const q =
        question.toLowerCase();


    if (
        q.includes("scheme") ||
        q.includes("find")
    ) {

        return (

            "SchemeBuddy can help identify benefit areas based on your profile. For current scheme information, use the official myScheme portal and verify the scheme details there."

        );

    }


    if (
        q.includes("document") ||
        q.includes("paper")
    ) {

        return (

            "I can help organise a document checklist. The exact documents depend on the specific scheme, so please verify the current requirements on its official government page."

        );

    }


    if (
        q.includes("eligible") ||
        q.includes("eligibility")
    ) {

        return (

            "I can explain eligibility conditions in simple language, but I cannot make an official eligibility decision. The relevant government authority determines final eligibility."

        );

    }


    if (
        q.includes("apply") ||
        q.includes("portal")
    ) {

        return (

            "SchemeBuddy should route you to the official application portal rather than collect your application itself. Start with the relevant official government scheme page."

        );

    }


    if (
        q.includes("deadline") ||
        q.includes("date")
    ) {

        return (

            "Deadlines can change. Treat any deadline shown in SchemeBuddy as a reminder until you verify it on the official government source."

        );

    }


    if (
        q.includes("family")
    ) {

        return (

            "The Family Benefit Map lets you organise possible benefit areas for different household members. Each member's actual eligibility must be checked separately."

        );

    }


    if (
        q.includes("language") ||
        q.includes("tamil") ||
        q.includes("hindi")
    ) {

        return (

            "SchemeBuddy is designed for multilingual access. The current prototype supports English, Tamil and Hindi UI text."

        );

    }


    return (

        "I can help with scheme discovery, documents, eligibility explanations, deadlines, life events and official application routes. What would you like to explore?"

    );

}


/* =====================================================
   LANGUAGE
===================================================== */

const translations = {

    en: {

        greeting:
            "Welcome",

        radar:
            "Benefit Radar"

    },


    ta: {

        greeting:
            "வரவேற்கிறோம்",

        radar:
            "நலத்திட்ட வழிகாட்டி"

    },


    hi: {

        greeting:
            "स्वागत है",

        radar:
            "लाभ रडार"

    }

};


function setupLanguage() {

    document
        .getElementById(
            "languageSelect"
        )
        .addEventListener(
            "change",
            function(event) {

                changeLanguage(
                    event.target.value
                );

            }
        );

}


function changeLanguage(
    language
) {

    const t =
        translations[
            language
        ];


    if (!t)
        return;


    document
        .getElementById(
            "dashboardGreeting"
        )
        .textContent =
        `${t.greeting}, ${user.name}`;


    showToast(
        language === "ta"
            ? "மொழி மாற்றப்பட்டது ✓"
            : language === "hi"
                ? "भाषा बदल दी गई ✓"
                : "Language changed ✓"
    );

}


/* =====================================================
   INFO MODAL
===================================================== */

function showInfoModal(
    title,
    message
) {

    const existing =
        document.getElementById(
            "dynamicInfoModal"
        );


    if (existing)
        existing.remove();


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "dynamicInfoModal";


    modal.className =
        "modal";


    modal.innerHTML = `

        <div
            style="
                background:white;
                padding:28px;
                border-radius:18px;
                max-width:450px;
                width:100%;
            "
        >

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:20px;
                "
            >

                <h2>
                    ${escapeHTML(title)}
                </h2>

                <button
                    onclick="document.getElementById('dynamicInfoModal').remove()"
                    style="
                        border:none;
                        background:none;
                        font-size:24px;
                        cursor:pointer;
                    "
                >
                    ×
                </button>

            </div>


            <p
                style="
                    color:#737b8e;
                    font-size:13px;
                    line-height:1.7;
                "
            >
                ${escapeHTML(message)}
            </p>


            <button
                class="primary-button"
                onclick="document.getElementById('dynamicInfoModal').remove()"
            >
                Got it
            </button>

        </div>

    `;


    document.body.appendChild(
        modal
    );

}


/* =====================================================
   TOAST
===================================================== */

function showToast(
    message
) {

    const oldToast =
        document.getElementById(
            "schemeToast"
        );


    if (oldToast)
        oldToast.remove();


    const toast =
        document.createElement(
            "div"
        );


    toast.id =
        "schemeToast";


    toast.textContent =
        message;


    toast.style.position =
        "fixed";


    toast.style.bottom =
        "25px";


    toast.style.left =
        "50%";


    toast.style.transform =
        "translateX(-50%)";


    toast.style.background =
        "#171d35";


    toast.style.color =
        "white";


    toast.style.padding =
        "12px 18px";


    toast.style.borderRadius =
        "10px";


    toast.style.fontSize =
        "12px";


    toast.style.fontWeight =
        "700";


    toast.style.zIndex =
        "1000";


    document.body.appendChild(
        toast
    );


    setTimeout(
        () => toast.remove(),
        2800
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(
    value
) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeChat();

            closeProfileModal();

            const info =
                document.getElementById(
                    "dynamicInfoModal"
                );

            if (info)
                info.remove();

        }

    }
);
