(function () {
  "use strict";

  const data = window.FINDER_DATA;
  const translations = window.TRANSLATIONS;
  const content = document.querySelector("#finder-content");
  const progressList = document.querySelector("#progress-list");
  const backButton = document.querySelector("#back-button");
  const languageSelect = document.querySelector("#language-select");
  const imageDialog = document.querySelector("#image-dialog");
  const imageDialogImage = document.querySelector("#image-dialog-image");
  const imageDialogCaption = document.querySelector("#image-dialog-caption");
  const imageDialogClose = document.querySelector("[data-dialog-close]");

  let language = detectLanguage();
  let state = readStateFromUrl();
  let depth = history.state?.finderDepth || 0;

  function detectLanguage() {
    const requested = new URLSearchParams(location.search).get("lang")?.toLowerCase();
    if (requested && translations.supportedLanguages[requested]) return requested;
    const browserLanguage = navigator.language?.split("-")[0].toLowerCase();
    return translations.supportedLanguages[browserLanguage] ? browserLanguage : "en";
  }

  function t(key) {
    return translations[language]?.[key] ?? translations.en[key] ?? key;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function openImage(image) {
    const cardTitle = image.closest(".choice-card")?.querySelector(".choice-copy strong")?.textContent;
    const caption = image.alt || cardTitle || "";
    imageDialogImage.src = image.currentSrc || image.src;
    imageDialogImage.alt = caption;
    imageDialogCaption.textContent = caption;
    imageDialog.showModal();
  }

  function readStateFromUrl() {
    const params = new URLSearchParams(location.search);
    const answers = {};
    params.forEach((value, key) => {
      if (key.startsWith("a_")) answers[key.slice(2)] = value;
    });

    return {
      manufacturer: params.get("make"),
      motor: params.get("motor"),
      answers,
      view: params.get("view") || "manufacturer"
    };
  }

  function stateUrl(nextState) {
    const url = new URL(location.href);
    [...url.searchParams.keys()].forEach((key) => {
      if (key === "make" || key === "motor" || key === "view" || key.startsWith("a_")) {
        url.searchParams.delete(key);
      }
    });
    url.searchParams.set("lang", language);
    if (nextState.manufacturer) url.searchParams.set("make", nextState.manufacturer);
    if (nextState.motor) url.searchParams.set("motor", nextState.motor);
    Object.entries(nextState.answers).forEach(([key, value]) => {
      url.searchParams.set(`a_${key}`, value);
    });
    if (nextState.view !== "manufacturer") url.searchParams.set("view", nextState.view);
    return `${url.pathname}?${url.searchParams.toString()}${url.hash}`;
  }

  function saveState(nextState, mode = "push") {
    state = nextState;
    if (mode === "push") depth += 1;
    history[mode === "replace" ? "replaceState" : "pushState"](
      { finderDepth: depth },
      "",
      stateUrl(state)
    );
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getMotor() {
    return data.motors.find((motor) => motor.id === state.motor);
  }

  function getManufacturer() {
    return data.manufacturers.find((manufacturer) => manufacturer.id === state.manufacturer);
  }

  function getMotorFlow(motor = getMotor()) {
    if (!motor) return { questions: [], results: [] };
    return motor.questionSet ? data.questionSets[motor.questionSet] : motor;
  }

  function matches(condition) {
    if (!condition) return true;
    if (condition.all) return condition.all.every(matches);
    if (condition.any) return condition.any.some(matches);

    const value = condition.answer
      ? state.answers[condition.answer]
      : condition.field
        ? state[condition.field]
        : undefined;

    if (Object.prototype.hasOwnProperty.call(condition, "equals")) {
      return value === condition.equals;
    }
    if (Object.prototype.hasOwnProperty.call(condition, "notEquals")) {
      return value !== undefined && value !== condition.notEquals;
    }
    if (condition.in) return value !== undefined && condition.in.includes(value);
    return false;
  }

  function visibleQuestions() {
    return (getMotorFlow().questions || []).filter((question) => matches(question.visibleWhen));
  }

  function matchingResult() {
    const motor = getMotor();
    if (!motor) return getManufacturer()?.result || null;
    if (motor.result) return motor.result;
    if (motor.unavailable) return data.fallbackResult;
    return (getMotorFlow().results || []).find((result) => matches(result.when)) || null;
  }

  function currentQuestion() {
    const questions = visibleQuestions();
    if (state.view.startsWith("question:")) {
      const requestedId = state.view.slice("question:".length);
      return questions.find((question) => question.id === requestedId) || questions[0];
    }
    return questions.find((question) => !state.answers[question.id]) || questions.at(-1);
  }

  function card(item, type) {
    const selected = type === "manufacturer"
      ? state.manufacturer === item.id
      : type === "motor"
        ? state.motor === item.id
        : state.answers[currentQuestion()?.id] === item.id;
    const media = item.image
      ? `<img src="${escapeHtml(item.image)}" alt="" loading="lazy">`
      : `<span class="choice-icon" aria-hidden="true">${escapeHtml(item.mark || "•")}</span>`;
    const note = item.note
      ? `<small>${escapeHtml(t(item.note))}</small>`
      : "";

    return `
      <button class="choice-card${selected ? " is-selected" : ""}${item.featured ? " is-featured" : ""}${item.imageFit === "contain" ? " image-contain" : ""}${item.imageFit === "small-contain" ? " image-small-contain" : ""}${item.imageZoom === false ? " no-image-zoom" : ""}${item.hideLabel ? " hide-label" : ""}${type === "manufacturer" && item.image ? " logo-card" : ""}" type="button"
        data-choice-type="${type}" data-choice-id="${escapeHtml(item.id)}">
        ${media}
        <span class="choice-copy">
          <strong${item.hideLabel ? ' class="sr-only"' : ""}>${escapeHtml(t(item.label))}</strong>
          ${note}
        </span>
        <span class="choice-arrow" aria-hidden="true">›</span>
      </button>`;
  }

  function stepHeading(eyebrow, title, lead) {
    return `
      <p class="eyebrow">${escapeHtml(t(eyebrow))}</p>
      <h1>${escapeHtml(t(title))}</h1>
      ${lead ? `<p class="lead">${escapeHtml(t(lead))}</p>` : ""}`;
  }

  function renderManufacturer() {
    return `
      <div class="step">
        ${stepHeading("step.manufacturer.eyebrow", "step.manufacturer.title", "step.manufacturer.lead")}
        <div class="card-grid">
          ${data.manufacturers.map((manufacturer) => card(manufacturer, "manufacturer")).join("")}
        </div>
      </div>`;
  }

  function renderMotors() {
    const motors = data.motors
      .filter((motor) => motor.manufacturer === state.manufacturer)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return `
      <div class="step">
        ${stepHeading("step.motor.eyebrow", "step.motor.title", "step.motor.lead")}
        <div class="card-grid motor-grid">
          ${motors.map((motor) => card(motor, "motor")).join("")}
        </div>
      </div>`;
  }

  function renderQuestion() {
    const question = currentQuestion();
    if (!question) return renderResult(data.fallbackResult);
    return `
      <div class="step">
        ${stepHeading("step.question.eyebrow", question.title, question.help)}
        ${question.image ? `
          <div class="question-visual">
            <img src="${escapeHtml(question.image)}" alt="${escapeHtml(t(question.title))}">
          </div>` : ""}
        <div class="card-grid">
          ${question.options.map((option) => card(option, "answer")).join("")}
        </div>
      </div>`;
  }

  function renderResult(result) {
    const compatible = Boolean(result?.compatible && result.product);
    const product = result?.product;
    const action = compatible && product.url
      ? { label: "actions.product", url: product.url }
      : result?.action;
    const resultImage = compatible ? product.image : result?.image;
    const resultImageAlt = compatible ? product.name : result?.title;
    const description = compatible
      ? product.description
      : result?.reason;
    const warnings = compatible
      ? (product.warnings || []).filter((warning) => matches(warning.when))
      : [];

    return `
      <div class="step">
        <p class="eyebrow">${escapeHtml(t("step.result.eyebrow"))}</p>
        <div class="result-card">
          ${resultImage ? `
            <div class="result-visual">
              <img src="${escapeHtml(resultImage)}" alt="${escapeHtml(t(resultImageAlt || "result.unsupported.title"))}">
            </div>` : ""}
          <div class="result-copy">
            <div class="status${compatible ? "" : " incompatible"}">
              <span aria-hidden="true">${compatible ? "✓" : "×"}</span>
              ${escapeHtml(t(compatible ? "result.compatible" : "result.incompatible"))}
            </div>
            <h1>${escapeHtml(t(compatible ? product.name : result?.title || "result.unsupported.title"))}</h1>
            ${description ? `<p>${escapeHtml(t(description))}</p>` : ""}
            ${warnings.length ? `
              <ul class="warning-list">
                ${warnings.map((warning) => `<li>${escapeHtml(t(warning.text))}</li>`).join("")}
              </ul>` : ""}
            <div class="actions">
              ${action ? `
                <a class="primary-button" href="${escapeHtml(action.url)}" target="_blank" rel="noopener">
                  ${escapeHtml(t(action.label))}
                </a>` : ""}
              <button class="secondary-button" type="button" data-action="restart">
                ${escapeHtml(t("actions.restart"))}
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderProgress() {
    const steps = [
      ["manufacturer", "progress.manufacturer"],
      ["motor", "progress.motor"],
      ["details", "progress.details"],
      ["result", "progress.result"]
    ];
    const current = state.view === "manufacturer"
      ? 0
      : state.view === "motor"
        ? 1
        : state.view === "result"
          ? 3
          : 2;

    progressList.innerHTML = steps.map(([, label], index) => {
      const isComplete = state.view === "result" && !state.motor
        ? index === 0
        : index < current;
      return `
        <li class="${index === current ? "is-active" : isComplete ? "is-complete" : ""}">
          <span class="step-dot">${isComplete ? "✓" : index + 1}</span>
          <span>${escapeHtml(t(label))}</span>
        </li>`;
    }).join("");
  }

  function render() {
    document.documentElement.lang = language;
    document.title = t("page.title");
    imageDialogClose.setAttribute("aria-label", t("actions.close"));
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });

    renderProgress();
    backButton.hidden = state.view === "manufacturer";

    if (state.view === "manufacturer") content.innerHTML = renderManufacturer();
    else if (state.view === "motor") content.innerHTML = renderMotors();
    else if (state.view === "result") content.innerHTML = renderResult(matchingResult() || data.fallbackResult);
    else content.innerHTML = renderQuestion();
  }

  function selectManufacturer(id) {
    const manufacturer = data.manufacturers.find((item) => item.id === id);
    if (!manufacturer) return;
    saveState({
      manufacturer: id,
      motor: null,
      answers: {},
      view: manufacturer.result ? "result" : "motor"
    });
  }

  function selectMotor(id) {
    const motor = data.motors.find((item) => item.id === id);
    if (!motor) return;
    const firstQuestion = getMotorFlow(motor).questions?.[0];
    saveState({
      manufacturer: motor.manufacturer,
      motor: id,
      answers: {},
      view: motor.unavailable || !firstQuestion ? "result" : `question:${firstQuestion.id}`
    });
  }

  function selectAnswer(id) {
    const question = currentQuestion();
    if (!question) return;
    const option = question.options.find((item) => item.id === id);
    if (option?.targetMotor) return selectMotor(option.targetMotor);

    const questions = visibleQuestions();
    const currentIndex = questions.findIndex((item) => item.id === question.id);
    const answers = { ...state.answers, [question.id]: id };

    questions.slice(currentIndex + 1).forEach((laterQuestion) => {
      delete answers[laterQuestion.id];
    });

    state = { ...state, answers };
    const result = matchingResult();
    const nextQuestion = visibleQuestions().find((item, index) => index > currentIndex && !answers[item.id]);

    saveState({
      ...state,
      view: result ? "result" : nextQuestion ? `question:${nextQuestion.id}` : "result"
    });
  }

  function previousState() {
    if (state.view === "result") {
      if (!state.motor) {
        return { manufacturer: null, motor: null, answers: {}, view: "manufacturer" };
      }
      const questions = visibleQuestions();
      const lastAnswered = [...questions].reverse().find((question) => state.answers[question.id]);
      if (lastAnswered) return { ...state, view: `question:${lastAnswered.id}` };
      return { ...state, view: "motor" };
    }

    if (state.view.startsWith("question:")) {
      const questions = visibleQuestions();
      const currentIndex = questions.findIndex((question) => `question:${question.id}` === state.view);
      if (currentIndex > 0) return { ...state, view: `question:${questions[currentIndex - 1].id}` };
      return { ...state, answers: {}, view: "motor" };
    }

    if (state.view === "motor") {
      return { manufacturer: null, motor: null, answers: {}, view: "manufacturer" };
    }

    return state;
  }

  function goBack() {
    if (depth > 0) {
      history.back();
    } else {
      saveState(previousState());
    }
  }

  function restart() {
    saveState({ manufacturer: null, motor: null, answers: {}, view: "manufacturer" });
  }

  function setupLanguageSelect() {
    languageSelect.innerHTML = Object.entries(translations.supportedLanguages)
      .map(([code, label]) => `<option value="${code}">${escapeHtml(label)}</option>`)
      .join("");
    languageSelect.value = language;
    languageSelect.addEventListener("change", () => {
      language = languageSelect.value;
      history.replaceState({ finderDepth: depth }, "", stateUrl(state));
      render();
    });
  }

  content.addEventListener("click", (event) => {
    const zoomImage = event.target.closest(".choice-card:not(.no-image-zoom) img, .result-visual img");
    if (zoomImage) return openImage(zoomImage);

    const choice = event.target.closest("[data-choice-type]");
    const action = event.target.closest("[data-action]");
    if (action?.dataset.action === "restart") return restart();
    if (!choice) return;

    const { choiceType, choiceId } = choice.dataset;
    if (choiceType === "manufacturer") selectManufacturer(choiceId);
    if (choiceType === "motor") selectMotor(choiceId);
    if (choiceType === "answer") selectAnswer(choiceId);
  });

  backButton.addEventListener("click", goBack);
  imageDialogClose.addEventListener("click", () => imageDialog.close());
  imageDialog.addEventListener("click", (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });
  window.addEventListener("popstate", (event) => {
    language = detectLanguage();
    languageSelect.value = language;
    state = readStateFromUrl();
    depth = event.state?.finderDepth || 0;
    render();
  });

  setupLanguageSelect();
  history.replaceState({ finderDepth: depth }, "", stateUrl(state));
  render();
})();
