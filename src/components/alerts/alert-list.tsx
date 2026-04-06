import { type Alert } from '../../types/alert';
import { AlertCard } from './alert-card';

interface AlertListProps {
  alerts: Alert[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  activeAlertId: string | null;
  onAlertClick: (alert: Alert) => void;
  onAcknowledge: (id: string) => void;
  onEscalate: (id: string) => void;
  onDismiss: (id: string) => void;
  onFalsePositive: (id: string) => void;
}

export function AlertList({ alerts, selectedIds, onToggleSelect, activeAlertId, onAlertClick, onAcknowledge, onEscalate, onDismiss, onFalsePositive }: AlertListProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {alerts.map(alert => (
        <AlertCard 
          key={alert.id}
          alert={alert}
          isSelected={selectedIds.has(alert.id)}
          isActive={activeAlertId === alert.id}
          onToggleSelect={() => onToggleSelect(alert.id)}
          onClick={() => onAlertClick(alert)}
          onAcknowledge={() => onAcknowledge(alert.id)}
          onEscalate={() => onEscalate(alert.id)}
          onDismiss={() => onDismiss(alert.id)}
          onFalsePositive={() => onFalsePositive(alert.id)}
        />
      ))}
    </div>
  );
}
