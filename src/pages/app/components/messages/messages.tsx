import styles from './messages.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { MessageModel } from '../../../../models/messages.ts';
import { ConversationModel } from '../../../../models/conversations.ts';
import { useSendMessageMutation } from '../../../../services/messagesApi/messagesApi.ts';
import { useUser } from '../../../../hooks/userUser.ts';

export const Messages = ({
  messages,
  selectedConversation,
  refetchMessages,
}: {
  messages: MessageModel[];
  selectedConversation: ConversationModel;
  refetchMessages: () => void;
}) => {
  const [text, setText] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [sendMessage, { isLoading }] = useSendMessageMutation(); // Use the mutation hook

  const { selectedFunctionary, isUserPlayer } = useUser();

  const functionaryId = isUserPlayer ? null : selectedFunctionary?.id;
  const playerFunctionaryId = isUserPlayer ? selectedFunctionary?.id : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    await sendMessage({
      conversationId: selectedConversation.id,
      content: text,
      functionaryId,
      playerId: playerFunctionaryId,
    }).then(() => refetchMessages());

    setText('');
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.messagesWrapper}>
        {messages.map((message) => {
          const author = message.functionary
            ? `${message.functionary.name} ${message.functionary.surname}`
            : message.player
              ? `${message.player.name} ${message.player.surname}`
              : 'Nieznany autor';

          return (
            <div className={styles.message} key={message.id}>
              <strong>{author}</strong>
              <p>{message.content}</p>
            </div>
          );
        })}

        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles.messageForm}>
        <input
          className={styles.messageInput}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Napisz swoją wiadomość..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className={styles.sendButton}
        >
          Wyślij
        </button>
      </form>
      {/*{messageMutation.isError && (*/}
      {/*  <div className={styles.errorMessage}>Error sending message.</div>*/}
      {/*)}*/}
      {/*{messageMutation.isLoading && (*/}
      {/*  <div className={styles.loadingMessage}>Sending...</div>*/}
      {/*)}*/}
    </div>
  );
};
