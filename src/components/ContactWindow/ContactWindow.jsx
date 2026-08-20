import { useState } from "react";

import Window from "../Window/Window";
import { contactLinks } from "../../data/contactLinks";

import styles from "./ContactWindow.module.css";

const ContactWindow = ({ 
  preview= false,

  onClose, 
  onMinimize,
  onMaximize, 

  minimized,
  maximized,

  onFocus, 
  onMove,
  
  width,
  height,

  x, 
  y,

  zIndex,
}) => {
  const [message, setMessage] = useState("");
  const [mobilePanel, setMobilePanel] = useState("chat");

  const emailContact = contactLinks.find(
    (link) => link.type === "email"
  );

  const handleLinkClick = (link) => {
    if (!link.href) return;
    
    if (link.type === "email") {
      window.location.assign(link.href);
      return;
    }

    window.open(
      link.href,
      "_blank",
      "noopener, noreferrer"
    );
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;
    if (!emailContact?.href) return;

    const emailAddress = emailContact.href.replace(
      /^mailto:/,
      ""
    );

    const subject = encodeURIComponent(
      "Message from yemOS Portfolio"
    );

    const body = encodeURIComponent(
      [
        "Hi Yem,",
        "",
        trimmedMessage,
        "",
        "Sent from the yemOS Contact app",
      ].join("\n")
    );

    window.location.href =
    `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  }

  return (
    <Window
        title="Contact"
        theme="dotTheme"
        titleAlign="left"
        titlePadding={20}

        contentSurface={false}
        preview={preview}

        canClose={true}
        canMinimize={true}
        canMaximize={true}

        x={x}
        y={y}

        width={width}
        height={height}

        zIndex={zIndex}

        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}

        minimized={minimized}
        maximized={maximized}

        onFocus={onFocus}
        onMove={onMove}

        rightControls={null}
    >
      <div className={styles.contactWindow}>
        <header className={styles.roomHeader}>
          <div className={styles.roomIdentity}>
            <div
              className={styles.statusIndicator}
              aria-hidden="true"
            />

            <div>
              <h2 className={styles.heading}>
                yemOS Chat
              </h2>

              <p className={styles.subheading}>
                Room: Portfolio Lobby
              </p>
            </div>
          </div>

          <div className={styles.connectionStatus}>
            Connected as yemGuest
          </div>
        </header>

        <nav className={styles.mobileChatNav}>
          <button 
            type="button"
            className={`${styles.mobileChatTab} ${mobilePanel === "chat"
              ? styles.mobileChatTabActive
              : ""
            }`}
            onClick={() => setMobilePanel("chat")}
            >
              Chat
            </button>

            <button
              type="button"
              className={`${styles.mobileChatTab} ${mobilePanel === "channels"
                ? styles.mobileChatTabActive
                : ""
              }`}
              onClick={() => setMobilePanel("channels")}
              >
                Channels
              </button>

              <button
                type="button"
                className={`${styles.mobileChatTab} ${mobilePanel === "people"
                  ? styles.mobileChatTabActive
                  : ""
                }`}
                onClick={() => setMobilePanel("people")}
              >
                People
              </button>

              <button
                type="button"
                className={`${styles.mobileChatTab} ${mobilePanel === "contact"
                  ? styles.mobileChatTabActive
                  : ""
                }`}
                onClick={() => setMobilePanel("contact")}
              >
                Contact
              </button>
        </nav>

        <div className={styles.chatWorkspace}>
          <aside 
            className={`${styles.channelPanel} ${mobilePanel === "channels" || mobilePanel === "contact"
              ? styles.mobilePanelVisible
              : styles.mobilePanelHidden
            }`}
          >

            <div
              className={
                mobilePanel === "contact"
                  ? styles.mobileSectionHidden
                  : ""
              }
            >
              <div className={styles.panelHeading}>
                Channels
              </div>

              <button 
                type="button"
                className={`${styles.channelItem} ${styles.activeChannel}`}
              >
                Portfolio Lobby
              </button>
            </div>

            <div
              className={
                mobilePanel === "channels"
                  ? styles.mobileSectionHidden
                  : ""
              }
            >

              <div className={styles.panelHeading}>
                Contact
              </div>

              {contactLinks.map((link) => (
                <button 
                  key={link.id}
                  type="button"
                  className={styles.channelItem}
                  onClick={() => handleLinkClick(link)}
                >
                  {link.label ?? link.type}
                </button>
              ))}
            </div>
          </aside>

          <main 
            className={`${styles.chatPanel} ${mobilePanel === "chat"
              ? styles.mobilePanelVisible
              : styles.mobilePanelHidden
            }`}
          >
            <div className={styles.transcript}>
              <div className={styles.systemMessage}>
                <span className={styles.systemName}>
                  System: 
                </span>

                <span>
                  Welcome to the yemOS Portfolio Lobby.
                </span>
              </div>

              <div className={styles.systemMessage}>
                <span className={styles.systemName}>
                  System:
                </span>

                <span>
                  yemDev has entered the room.
                </span>
              </div>

              <div className={styles.chatMessage}>
                <span className={styles.userName}>
                  yemDev:
                </span>

                <span>
                  Hi! Thanks for visiting my portfolio.
                </span>
              </div>

              <div className={styles.chatMessage}>
                <span className={styles.userName}>
                  yemDev:
                </span>

                <span>
                  You can reach me through one of the available contact channels.
                </span>
              </div>

              <div className={styles.chatMessage}>
                <span className={styles.guestName}>
                  yemGuest:
                </span>

                <span className={styles.typingCursor}>
                  _
                </span>
              </div>
            </div>

            <form 
              className={styles.composer}
              onSubmit={(event) => {
                event.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                className={styles.messageInput}
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Type a message..."
                aria-label="Chat message"
              />

              <button
                type="submit"
                className={styles.sendButton}
                disabled={!message.trim()}
              >
                Send
              </button>
            </form>
          </main>

          <aside 
            className={`${styles.memberPanel} ${mobilePanel === "people"
              ? styles.mobilePanelVisible
              : styles.mobilePanelHidden
            }`}
          >
            <div className={styles.panelHeading}>
              People Here
            </div>

            <div className={styles.memberItem}>
              <span className={styles.memberStatus} />
              yemDev
            </div>

            <div className={styles.memberItem}>
              <span className={styles.memberStatus} />
              yemGuest
            </div>

            <div className={styles.panelHeading}>
              Status
            </div>

            <div className={styles.roomInformation}>
              <span>2 members</span>
              <span>Public room</span>
              <span>Secure connection</span>
            </div>
          </aside>
        </div>

        <footer className={styles.footer}>
          <span>
            Room: Portfolio Lobby
          </span>

          <span>
            {contactLinks.length} contact methods
          </span>
        </footer>
      </div>

       
    </Window>
  );
};

export default ContactWindow;