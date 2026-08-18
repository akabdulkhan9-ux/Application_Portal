import * as React from 'react';
import styles from './TeamMemberPopup.module.scss';

export interface ITeamMemberPopupProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  avatarUrl?: string;
  position: { x: number; y: number };
}

export const TeamMemberPopup: React.FC<ITeamMemberPopupProps> = (props) => {
  return (
    <div 
      className={styles.popup} 
      style={{ 
        top: props.position.y + 15, 
        left: props.position.x + 15 
      }}
    >
      <div className={styles.popupContent}>
        <div className={styles.popupHeader}>
          <div className={styles.popupAvatar}>
            {props.avatarUrl ? (
              <img 
                src={props.avatarUrl} 
                alt={props.name}
                loading="lazy"
              />
            ) : (
              <span>{props.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className={styles.popupTitle}>
            <div className={styles.popupName}>{props.name}</div>
            <div className={styles.popupRole}>{props.role}</div>
          </div>
        </div>
        <div className={styles.popupDetails}>
          {props.email && (
            <div className={styles.popupRow}>
              <span className={styles.popupIcon}>📧</span>
              <span>{props.email}</span>
            </div>
          )}
          {props.phone && (
            <div className={styles.popupRow}>
              <span className={styles.popupIcon}>📞</span>
              <span>{props.phone}</span>
            </div>
          )}
          {props.department && (
            <div className={styles.popupRow}>
              <span className={styles.popupIcon}>🏢</span>
              <span>{props.department}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};