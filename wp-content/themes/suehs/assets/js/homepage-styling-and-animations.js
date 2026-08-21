//action button hover styling
document.querySelectorAll(".action-btn").forEach((action_button) => {
  const act_btn_title = action_button.querySelector(".action-btn__title");
  const act_btn_subtitle = action_button.querySelector(".action-btn__subtitle");
  const act_btn_icon = action_button.querySelector(".action-btn__icon");

  action_button.addEventListener("mouseover", () => {
    action_button.classList.add("action-btn--dark");
    act_btn_title?.classList.add("action-btn__title--white");
    act_btn_subtitle?.classList.add("action-btn__subtitle--white");
    act_btn_icon?.classList.add("action-btn__icon--white");
  });

  action_button.addEventListener("mouseout", () => {
    action_button.classList.remove("action-btn--dark");
    act_btn_title?.classList.remove("action-btn__title--white");
    act_btn_subtitle?.classList.remove("action-btn__subtitle--white");
    act_btn_icon?.classList.remove("action-btn__icon--white");
  });
});

//news card hover styling
document.querySelectorAll(".news-card").forEach((news_card) => {
  const news_card_title = news_card.querySelector(".news-card__title");
  const news_card_icon = news_card.querySelector(".news-card__icon");

  news_card.addEventListener("mouseover", () => {
    news_card.classList.add("news-card--dark");
    news_card_title?.classList.add("news-card__title--bigger");
    news_card_icon?.classList.add("news-card__icon--show");
  });

  news_card.addEventListener("mouseout", () => {
    news_card.classList.remove("news-card--dark");
    news_card_title?.classList.remove("news-card__title--bigger");
    news_card_icon?.classList.remove("news-card__icon--show");
  });
});

//video card hover styling
document.querySelectorAll(".learning-card").forEach((learning_card) => {
  learning_card.addEventListener("mouseover", () => {
    learning_card.classList.add("learning-card--float");
  });

  learning_card.addEventListener("mouseout", () => {
    learning_card.classList.remove("learning-card--float");
  });
});

//dropdown hyperlink behavior

document
  .getElementById("other-popular-actions")
  .addEventListener("change", function () {
    const url = this.value;
    if (url) {
      window.location.href = url;
    }
  });
