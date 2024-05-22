import styles from './messages.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addMessage } from '../../../../server/messages/messages.server.ts';
import { useApp } from '../../app.context.tsx';
import { useDetails } from '../../details.context.tsx';
import { MessageModel } from '../../../../models/messages.ts';
import { ConversationModel } from '../../../../models/conversations.ts';

export const Messages = ({
  messages,
  selectedConversation,
}: {
  messages: MessageModel[];
  selectedConversation: ConversationModel;
}) => {
  const queryClient = useQueryClient();
  const [text, setText] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const { userSelectedFunctionality } = useApp();
  const { isUserPlayer } = useDetails();

  const messageMutation = useMutation(
    () =>
      addMessage(
        selectedConversation?.id,
        text,
        isUserPlayer,
        userSelectedFunctionality?.id as number
      ),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(['messages', selectedConversation?.id])
          .then();
        setText('');
      },
      onError: () => {
        console.error('Error sending message');
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim() && selectedConversation?.id) {
      messageMutation.mutate();
    }
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
              : 'Nieznany autor'; // Domyślny autor, jeśli nie ma ani functionary, ani player

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
          className={styles.sendButton}
          disabled={!text.trim() || messageMutation.isLoading}
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
