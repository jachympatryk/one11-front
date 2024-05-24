import { useState } from 'react';
import { useQuery } from 'react-query';
import { ConversationModel } from '../../../../models/conversations.ts';
import { getConversationsByTeam } from '../../../../server/conversations/conversations.server.ts';
import styles from './chat.module.scss';
import { getMessagesByConversationId } from '../../../../server/messages/messages.server.ts';
import { ConversationsList } from '../../components/conversations-list/converstations-list.tsx';
import { Messages } from '../../components/messages/messages.tsx';
import { MessageModel } from '../../../../models/messages.ts';

export const Chat = () => {
  return null;
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationModel | null>(null);
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const { data: conversations } = useQuery<ConversationModel[] | null>(
    ['conversations', userSelectedFunctionality?.teamId],
    () => getConversationsByTeam(userSelectedFunctionality?.teamId as number),
    {
      enabled: !!userSelectedFunctionality?.teamId,
      onSuccess: (data) => {
        if (data?.length) {
          setSelectedConversation(data[0]);
        }
      },
    }
  );

  useQuery<MessageModel[] | null>(
    ['messages', selectedConversation?.id],
    () => getMessagesByConversationId(selectedConversation?.id as number),
    {
      enabled: !!selectedConversation?.id,
      onSuccess: (data) => {
        setMessages(data || []);
      },
    }
  );

  // Real-time messages subscription
  // useEffect(() => {
  //   const channelA = supabase.channel('messages');
  //
  //   channelA
  //     .on('broadcast', { event: 'Message' }, (payload) =>
  //       messageReceived(payload)
  //     )
  //     .subscribe((status, err) => {
  //       console.log('ChannelA:', status, err);
  //     });
  // }, [selectedConversation]);

  return (
    <div className={styles.wrapper}>
      {conversations && conversations.length && (
        <div className={styles.container}>
          <ConversationsList
            conversations={conversations}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />

          {selectedConversation && (
            <Messages
              selectedConversation={selectedConversation}
              messages={messages}
            />
          )}
        </div>
      )}
    </div>
  );
};
