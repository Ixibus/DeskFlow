import "./customTimeSlotInput.css";

interface CustomTimeSlotInputProps {
  date: string;          // Format "YYYY-MM-DD"
  startTime: string;     // Format "HH:mm"
  endTime: string;       // Format "HH:mm"
  onDateChange: (val: string) => void;
  onStartTimeChange: (val: string) => void;
  onEndTimeChange: (val: string) => void;
}

export default function CustomTimeSlotInput({
  date,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: CustomTimeSlotInputProps) {
  return (
    <div className="timeslot-wrapper">
      {/* Date du coworking */}
      <div className="timeslot-field">
        <label className="timeslot-label typo-body">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="timeslot-input"
        />
      </div>

      {/* Heure de début (bloquée sur les heures pleines via step="3600") */}
      <div className="timeslot-field">
        <label className="timeslot-label typo-body">Arrivée</label>
        <input
          type="time"
          step="3600"
          value={startTime}
          onChange={(e) => onStartTimeChange(e.target.value)}
          className="timeslot-input"
        />
      </div>

      {/* Heure de fin (bloquée sur les heures pleines via step="3600") */}
      <div className="timeslot-field">
        <label className="timeslot-label typo-body">Départ</label>
        <input
          type="time"
          step="3600"
          value={endTime}
          onChange={(e) => onEndTimeChange(e.target.value)}
          className="timeslot-input"
        />
      </div>
    </div>
  );
}