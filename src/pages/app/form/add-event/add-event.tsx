import { useState } from 'react';
import styles from './add-event.module.scss';
import { EventModel, EventType } from '../../../../models/event.ts';
import { MatchEventForm } from './forms/match-event-form/match-event-form.tsx';
import { TrainingEventForm } from './forms/training-event-form/training-event-form.tsx';
import { MeetingEventForm } from './forms/meeting-event-form/meeting-event-form.tsx';
import { OtherEventForm } from './forms/other-event-form/other-event-form.tsx';

export const AddEvent = ({
  closeModal,
  eventToEdit,
}: {
  closeModal: () => void;
  eventToEdit?: EventModel;
}) => {
  const [selectedEventType, setSelectedEventType] = useState<EventType | ''>(
    eventToEdit ? eventToEdit.event_type : 'MATCH'
  );

  const handleEventTypeSelect = (eventType: EventType) => {
    setSelectedEventType(eventType);
  };

  const renderEventForm = () => {
    switch (selectedEventType) {
      case 'MATCH':
        return (
          <MatchEventForm closeModal={closeModal} eventToEdit={eventToEdit} />
        );
      case 'TRAINING':
        return (
          <TrainingEventForm
            closeModal={closeModal}
            eventToEdit={eventToEdit}
          />
        );
      case 'MEETING':
        return (
          <MeetingEventForm closeModal={closeModal} eventToEdit={eventToEdit} />
        );
      case 'OTHER':
        return (
          <OtherEventForm closeModal={closeModal} eventToEdit={eventToEdit} />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {!eventToEdit && (
        <div className={styles.eventTypeButtons}>
          <button
            type="button"
            data-type={selectedEventType === 'MATCH' ? 'MATCH' : undefined}
            className={`${styles.button} ${selectedEventType === 'MATCH' ? styles.active : ''}`}
            onClick={() => handleEventTypeSelect('MATCH')}
          >
            Mecz
          </button>
          <button
            type="button"
            data-type={
              selectedEventType === 'TRAINING' ? 'TRAINING' : undefined
            }
            className={`${styles.button} ${selectedEventType === 'TRAINING' ? styles.active : ''}`}
            onClick={() => handleEventTypeSelect('TRAINING')}
          >
            Trening
          </button>
          <button
            type="button"
            data-type={selectedEventType === 'MEETING' ? 'MEETING' : undefined}
            className={`${styles.button} ${selectedEventType === 'MEETING' ? styles.active : ''}`}
            onClick={() => handleEventTypeSelect('MEETING')}
          >
            Spotkanie
          </button>
          <button
            type="button"
            data-type={selectedEventType === 'OTHER' ? 'OTHER' : undefined}
            className={`${styles.button} ${selectedEventType === 'OTHER' ? styles.active : ''}`}
            onClick={() => handleEventTypeSelect('OTHER')}
          >
            Inne
          </button>
        </div>
      )}
      {renderEventForm()}
    </div>
  );
};
