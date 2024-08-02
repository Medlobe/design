import { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickeer = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject, event) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji); // Corrected property reference
  };

  const handleInputFocus = (e) => {
    setShowEmojiPicker(false);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="ChatInputContainer">
      <div className="chat-input">
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
          <input
            type="text"
            placeholder="type your message here"
            value={msg}
            onFocus={handleInputFocus}
            onChange={(e) => setMsg(e.target.value)}
          />
          <div className="button-container">
            <div className="emoji">
              <BsEmojiSmileFill onClick={handleEmojiPickeer} />
              {showEmojiPicker && (
                <Picker
                  className="emoji-picker-react"
                  onEmojiClick={handleEmojiClick}
                />
              )}
            </div>
          </div>
          {msg.length >= 1 ? (
            <button className="submit">
              <IoMdSend />
            </button>
          ) : (
            <button className="notSubmit">
              <IoMdSend />
            </button>
          )}
        </form>
        <div className="pin-sendimage">
          <i className="fas fa-paperclip"></i>
        </div>
      </div>
    </div>
  );
}

// Styled component for Emoji Picker
const StyledEmojiPicker = styled(Picker)`
  position: absolute;
  top: -460px;
  left:450px
  background-color: #080420;
 


  .emoji-categories button {
    filter: contrast(0);
  }

  .emoji-search {
    background-color: transparent;
    border-color: #9186f3;
  }

  .emoji-group::before {
    background: #080420;
  }
`;
