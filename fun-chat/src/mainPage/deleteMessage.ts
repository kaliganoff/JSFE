import ws from "../ws";

export default function deleteMessage(id: string) {
  ws.send(
    JSON.stringify({
      id: "5",
      type: "MSG_DELETE",
      payload: {
        message: {
          id,
        },
      },
    }),
  );
}
