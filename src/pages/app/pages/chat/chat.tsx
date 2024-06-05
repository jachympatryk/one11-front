import { useEffect, useState } from 'react';
import { ConversationModel } from '../../../../models/conversations.ts';
import styles from './chat.module.scss';
import { ConversationsList } from '../../components/conversations-list/converstations-list.tsx';
import { Messages } from '../../components/messages/messages.tsx';
import { useGetTeamConversationsQuery } from '../../../../services/conversations/conversationsApi.ts';
import { useUser } from '../../../../hooks/userUser.ts';
import { useGetMessagesByConversationIdQuery } from '../../../../services/messagesApi/messagesApi.ts';
import { Loader } from '../../components/loader/loader.tsx';

export const Chat = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationModel | null>(null);

  const { selectedFunctionary } = useUser();
  const userTeamId = selectedFunctionary?.teamId;

  const {
    data: conversations,
    isSuccess,
    isError,
    isLoading,
  } = useGetTeamConversationsQuery(userTeamId as number, {
    skip: !userTeamId,
  });

  const { data: messages = [], refetch: refetchMessages } =
    useGetMessagesByConversationIdQuery(selectedConversation?.id as number, {
      skip: !selectedConversation?.id,
    });

  useEffect(() => {
    if (conversations && conversations.length) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversations]);

  if (isLoading) return <Loader />;
  if (isError) return <div className={styles.wrapper}>Wystąpił błąd</div>;
  if (!isSuccess || !conversations || conversations.length === 0)
    return <div className={styles.wrapper}>Brak chatów</div>;

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
      {conversations && conversations.length !== 0 && (
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
              refetchMessages={refetchMessages}
            />
          )}
        </div>
      )}
    </div>
  );
};
