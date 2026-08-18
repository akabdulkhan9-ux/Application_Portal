import * as React from "react";
import { createPortal } from "react-dom";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import styles from "./MeetOurTeam.module.scss";
import { teamMembersService, ITeamMember } from "../../services/TeamMembersService";
import { TeamMemberPopup } from "./TeamMemberPopup";
import { isPnPjsInitialized } from "../../services/pnpjsConfig";

export interface IMeetOurTeamProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  context?: WebPartContext;
  maxHeight?: string;
  showSearch?: boolean;
}

export const MeetOurTeam: React.FC<IMeetOurTeamProps> = (props) => {
  const { maxHeight = '465px', showSearch = true } = props;
  
  const [members, setMembers] = React.useState<ITeamMember[]>([]);
  const [query, setQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [hoveredMember, setHoveredMember] = React.useState<ITeamMember | null>(null);
  const [popupPosition, setPopupPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const loadMembers = async (): Promise<void> => {
      try {
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 10) {
          await new Promise(resolve => setTimeout(resolve, 500));
          retries++;
        }
        const data = await teamMembersService.getTeamMembers(props.context);
        setMembers(data);
      } catch (error) {
        console.warn('[MeetOurTeam] Error loading members:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMembers().catch((): void => undefined);
  }, [props.context]);

  const handleMouseEnter = (member: ITeamMember, event: React.MouseEvent): void => {
    setHoveredMember(member);
    setPopupPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = (): void => {
    setHoveredMember(null);
  };

  const handleMouseMove = (event: React.MouseEvent): void => {
    if (hoveredMember) {
      setPopupPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const filtered = members.filter((m: ITeamMember) =>
    m.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  if (isLoading) {
    return (
      <div className={styles.card}>
        <h3 className={styles.title}>MEET OUR LEADERS</h3>
        <div className={styles.loadingState}>Loading team members...</div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>MEET OUR LEADERS</h3>

      {showSearch && (
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            aria-label="Search team members"
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
      )}

      <div 
        className={styles.listContainer}
        style={{ maxHeight: maxHeight }}
      >
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            {query ? 'No members found matching your search.' : 'No team members available.'}
          </div>
        ) : (
          <ul className={styles.list}>
            {filtered.map((m: ITeamMember) => (
              <li
                key={m.id}
                className={styles.item}
                onMouseEnter={(e: React.MouseEvent) => handleMouseEnter(m, e)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                <div className={styles.avatar}>
                  {m.thumbnailUrl ? (
                    <img src={m.thumbnailUrl} alt={m.name} />
                  ) : (
                    <span className={styles.avatarInitial}>
                      {m.name && m.name !== "Unknown" ? m.name.charAt(0).toUpperCase() : '?'}
                    </span>
                  )}
                </div>
                <div className={styles.meta}>
                  <div className={styles.name}>{m.name !== "Unknown" ? m.name : 'No Name'}</div>
                  <div className={styles.role}>{m.role || 'No Role'}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.memberCount}>
        {filtered.length} {filtered.length === 1 ? 'member' : 'members'}
      </div>

      {hoveredMember && typeof document !== 'undefined' && createPortal(
        <TeamMemberPopup
          name={hoveredMember.name}
          role={hoveredMember.role}
          email={hoveredMember.email || ''}
          phone={hoveredMember.phone || ''}
          department={hoveredMember.department || ''}
          avatarUrl={hoveredMember.popupImageUrl || hoveredMember.profileImageUrl}
          position={popupPosition}
        />,
        document.body
      )}
    </div>
  );
};

export default MeetOurTeam;