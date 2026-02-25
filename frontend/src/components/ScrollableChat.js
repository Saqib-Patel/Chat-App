import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  const formatMsgTime = (dateStr) => {
    const d = new Date(dateStr);
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const h = hours % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="xs"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                    border="2px solid rgba(37, 211, 102, 0.2)"
                  />
                </Tooltip>
              )}
            <span
              style={{
                background:
                  m.sender._id === user._id
                    ? "#005C4B"
                    : "#202C33",
                color: "#E9EDEF",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 2 : 8,
                borderRadius:
                  m.sender._id === user._id
                    ? "8px 8px 0 8px"
                    : "8px 8px 8px 0",
                padding: "6px 10px 4px",
                maxWidth: "65%",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.13)",
                fontSize: "14px",
                lineHeight: "1.45",
                wordBreak: "break-word",
                position: "relative",
              }}
            >
              {m.content}
              {/* Timestamp inside bubble */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "11px",
                  color: "rgba(255, 255, 255, 0.45)",
                  float: "right",
                  marginTop: "4px",
                  marginLeft: "8px",
                  lineHeight: "1",
                }}
              >
                {formatMsgTime(m.createdAt)}
                {/* Tick icons for sent messages */}
                {m.sender._id === user._id && (
                  <span style={{ color: "#53BDEB", fontSize: "13px", marginLeft: "2px" }}>
                    ✓✓
                  </span>
                )}
              </span>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
