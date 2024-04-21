export const header = document.createElement("header");
export const user = document.createElement("span");
export const appName = document.createElement("span");
export const logOutButton = document.createElement("button");
appName.innerText = "Fun Chat";
logOutButton.innerText = "Log Out";
header.append(user, appName, logOutButton);

export const chatContainer = document.createElement("div");
export const userListContainer = document.createElement("div");
export const messageContainer = document.createElement("div");
chatContainer.append(userListContainer, messageContainer);

export const footer = document.createElement("footer");
export const school = document.createElement("span");
school.innerText = "RSSchool";
export const github = document.createElement("span");
github.innerText = "kaliganoff";
export const year = document.createElement("span");
year.innerHTML = "2024";
footer.append(school, github, year);
