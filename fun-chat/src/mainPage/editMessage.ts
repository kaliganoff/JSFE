import ws from "../ws";
import { chatInput, messageContainer, sendButton } from "./consts";

export default function editMessage(id: string, text: string) {
  chatInput.value = text;
  sendButton.hidden = true;
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  messageContainer.append(editButton);
  editButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (chatInput.value)
      ws.send(
        JSON.stringify({
          id: "7",
          type: "MSG_EDIT",
          payload: {
            message: {
              id,
              text: chatInput.value,
            },
          },
        }),
      );
    editButton.hidden = true;
    sendButton.hidden = false;
    chatInput.value = "";
  });
}
