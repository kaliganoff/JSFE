export const mainPageContainer: HTMLDivElement = document.createElement("div");
mainPageContainer.className = "main-page-container";
export const header: HTMLElement = document.createElement("header");
header.className = "header";
export const user: HTMLSpanElement = document.createElement("span");
export const appName: HTMLSpanElement = document.createElement("span");
export const logOutButton: HTMLButtonElement = document.createElement("button");
logOutButton.className = "hover";
appName.innerText = "Fun Chat";
logOutButton.innerText = "Log Out";
header.append(user, appName, logOutButton);

export const chatContainer: HTMLDivElement = document.createElement("div");
chatContainer.className = "chat-container";
export const userListContainer: HTMLDivElement = document.createElement("div");
export const messagerContainer: HTMLDivElement = document.createElement("div");
messagerContainer.className = "messager";
export const speakerContainer: HTMLDivElement = document.createElement("div");
export const dialogueContainerWrapper: HTMLDivElement =
  document.createElement("div");
export const dialogueContainer: HTMLDivElement = document.createElement("div");
dialogueContainerWrapper.append(dialogueContainer);
dialogueContainer.className = "dialogue";
dialogueContainer.innerText = "Please, select a user";
dialogueContainerWrapper.className = "dialogue-wrapper";
export const messageContainer: HTMLFormElement = document.createElement("form");
export const chatInput: HTMLInputElement = document.createElement("input");
export const sendButton: HTMLButtonElement = document.createElement("button");
sendButton.innerText = "Send";
sendButton.disabled = true;
sendButton.className = "hover";
chatInput.disabled = true;
messageContainer.append(chatInput, sendButton);
messagerContainer.append(
  speakerContainer,
  dialogueContainerWrapper,
  messageContainer,
);
chatContainer.append(userListContainer, messagerContainer);

export const footer: HTMLElement = document.createElement("footer");
footer.className = "footer";
export const school: HTMLSpanElement = document.createElement("span");
school.innerText = "RSSchool";
const RSLogo: HTMLImageElement = document.createElement("img");
RSLogo.src = "./logo-rsschool3.png";
RSLogo.style.height = "1em";
school.prepend(RSLogo);
export const github: HTMLSpanElement = document.createElement("span");
github.innerText = "Nikolai Kaliganov";
const githubLink: HTMLAnchorElement = document.createElement("a");
githubLink.href = "https://github.com/kaliganoff";
githubLink.innerText = "GitHub";
github.append(githubLink);
export const year: HTMLSpanElement = document.createElement("span");
year.innerHTML = "2024";
footer.append(school, github, year);
