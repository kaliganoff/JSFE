const aboutPage = document.createElement("div");
aboutPage.className = "about-page";

export default function drawAboutPage() {
  const window = document.createElement("div");
  const heading = document.createElement("h1");
  const goBackButton = document.createElement("button");
  goBackButton.innerText = "That's cool! Go back!";
  heading.innerText = "Fun Chat by kaliganoff";
  const text = document.createElement("p");
  text.innerText = "This page was made in 2024 as a part of RSSchool course.";
  window.append(heading, text, goBackButton);
  aboutPage.append(window);
  document.body.append(aboutPage);
  aboutPage.style.display = "flex";

  goBackButton.addEventListener("click", () => {
    aboutPage.innerHTML = "";
    aboutPage.style.display = "none";
  });
}
