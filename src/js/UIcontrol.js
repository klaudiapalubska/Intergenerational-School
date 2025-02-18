import { lessonsData } from "./data.js";

const cancelBackground = document.querySelector(".details-window__background");
const detailsWindow = document.querySelector(".details-window");

// ----- Data Manipulation ----- //
function createPanelsForLessons() {
  lessonsData.lessons.forEach((lesson) => {
    // Tworzymy ID w formacie "day-month" np. "3-3" dla 3 marca
    const dayId = `${lesson.day}-${lesson.month}`;
    const dzien = document.getElementById(dayId); // Szukamy odpowiedniego dnia w kalendarzu

    if (!dzien) return;

    let panel = dzien.querySelector(".panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.classList.add("panel");
      dzien.appendChild(panel);
    }

    const lessonDiv = document.createElement("div");
    lessonDiv.classList.add("panel__lesson");
    lessonDiv.dataset.lessonId = lesson.id;

    const lessonSpan = document.createElement("span");
    lessonSpan.classList.add("span--3");
    lessonSpan.textContent = `Lekcja ${lesson.number}`;

    lessonDiv.appendChild(lessonSpan);
    panel.appendChild(lessonDiv);
  });
}

// ----- User view ----- //
function updateDetailsWindow(lesson) {
  document.querySelector(".lesson-number").textContent = lesson.number;
  document.querySelector(".lesson-title").textContent = lesson.title;
  document.querySelector(".lesson-time").textContent = lesson.time;

  detailsWindow.classList.remove("hidden");
  cancelBackground.classList.remove("hidden");
}

document.addEventListener("click", (event) => {
  if (
    event.target.closest(".details-window__cancel, .details-window__background")
  ) {
    detailsWindow.classList.add("hidden");
    cancelBackground.classList.add("hidden");
  }

  const lessonElement = event.target.closest(".panel__lesson");
  if (lessonElement) {
    const lessonId = lessonElement.dataset.lessonId;
    const lesson = lessonsData.lessons.find(
      (lesson) => lesson.id === parseInt(lessonId)
    );
    if (lesson) {
      updateDetailsWindow(lesson);
    }
  }
});

createPanelsForLessons();
