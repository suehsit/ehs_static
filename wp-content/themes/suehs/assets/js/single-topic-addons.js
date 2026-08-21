//TODO: if this page is not a single topic exit
document.querySelectorAll(".timeline-block").forEach((block) => {
  const content = block.querySelector(".timeline-block__content");
  const title = block.querySelector(".timeline-block__title");

  const toggleContent = () => {
    if (content.classList.contains("timeline-block__content--expanded")) {
      content.classList.remove("timeline-block__content--expanded");
      content.classList.add("timeline-block__content--collapsed");

      title.classList.remove("timeline-block__title--expanded");
      title.classList.add("timeline-block__title--collapsed");
    } else {
      content.classList.remove("timeline-block__content--collapsed");
      content.classList.add("timeline-block__content--expanded");

      title.classList.remove("timeline-block__title--expanded");
      title.classList.add("timeline-block__title--expanded");
    }
  };

  // click
  block.addEventListener("click", toggleContent);

  // keyboard
  block.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleContent();
    }
  });
});
