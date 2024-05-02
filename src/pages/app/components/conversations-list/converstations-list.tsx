import styles from './conversations-list.module.scss';
import { ConversationModel } from '../../../../models/conversations.ts';
import React from 'react';

export const ConversationsList = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
}: {
  conversations: ConversationModel[];
  selectedConversation: ConversationModel | null;
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<ConversationModel | null>
  >;
}) => {
  return (
    <div className={styles.container}>
      {conversations?.map((conversation) => {
        const isSelected = selectedConversation?.id === conversation.id; // Assuming both have 'id' property

        return (
          <button
            className={`${styles.conversationButton} ${isSelected ? styles.active : ''}`}
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation)}
          >
            {conversation.name}
          </button>
        );
      })}
    </div>
  );
};
