export const mainPageContainer = document.createElement("div");
mainPageContainer.className = "main-page-container";
export const header = document.createElement("header");
header.className = "header";
export const user = document.createElement("span");
export const appName = document.createElement("span");
export const logOutButton = document.createElement("button");
appName.innerText = "Fun Chat";
logOutButton.innerText = "Log Out";
header.append(user, appName, logOutButton);

export const chatContainer = document.createElement("div");
chatContainer.className = "chat-container";
export const userListContainer = document.createElement("div");
export const messagerContainer = document.createElement("div");
messagerContainer.className = "messager";
export const speakerContainer = document.createElement("div");
export const dialogueContainerWrapper = document.createElement("div");
export const dialogueContainer = document.createElement("div");
dialogueContainerWrapper.append(dialogueContainer);
dialogueContainer.className = "dialogue";
dialogueContainerWrapper.className = "dialogue-wrapper";
export const messageContainer = document.createElement("form");
export const chatInput = document.createElement("input");
export const sendButton = document.createElement("button");
sendButton.innerText = "Send";
messageContainer.append(chatInput, sendButton);
messagerContainer.append(
  speakerContainer,
  dialogueContainerWrapper,
  messageContainer,
);
chatContainer.append(userListContainer, messagerContainer);

export const footer = document.createElement("footer");
footer.className = "footer";
export const school = document.createElement("span");
school.innerText = "RSSchool";
export const github = document.createElement("span");
github.innerText = "kaliganoff";
export const year = document.createElement("span");
year.innerHTML = "2024";
footer.append(school, github, year);
