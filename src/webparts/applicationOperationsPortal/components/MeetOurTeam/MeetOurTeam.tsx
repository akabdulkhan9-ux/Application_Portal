// import * as React from "react";
// import styles from "./MeetOurTeam.module.scss";

// // Internal interface - replace with import from models folder later
// interface ITeamMember {
//   id: string;
//   name: string;
//   role: string;
//   avatarUrl?: string;
// }

// export interface IMeetOurTeamProps {
//   isDarkTheme?: boolean;
//   hasTeamsContext?: boolean;
//   userDisplayName?: string;
// }

// export const MeetOurTeam: React.FC<IMeetOurTeamProps> = () => {
//   const [members, setMembers] = React.useState<ITeamMember[]>([]);
//   const [query, setQuery] = React.useState("");

//   // Mock data - replace with intranetService.getTeamMembers()
//   const getMockMembers = (): Promise<ITeamMember[]> => {
//     return Promise.resolve([
//       { id: "1", name: "Hassan Al-Zahrani", role: "Associate Analyst", avatarUrl: "" },
//       { id: "2", name: "Mousa Al-Shammari", role: "Associate Analyst", avatarUrl: "" },
//       { id: "3", name: "Shahha Al Kaabi", role: "Associate Analyst", avatarUrl: "" },
//       { id: "4", name: "Mansour bin Zayed", role: "Associate Analyst", avatarUrl: "" },
//       { id: "5", name: "Amina Shawar", role: "Associate Analyst", avatarUrl: "" },
//       { id: "6", name: "Maryam Al Tunajji", role: "Associate Analyst", avatarUrl: "" },
//       { id: "7", name: "Amina Shomar", role: "Associate Analyst", avatarUrl: "" },
//       { id: "8", name: "Musabbar Al-Farisi", role: "Associate Analyst", avatarUrl: "" },
//     ]);
//   };

//   React.useEffect(() => {
//     getMockMembers().then(setMembers).catch(console.error);
//   }, []);

//   // Using indexOf() instead of includes() for ES5 compatibility
//   const filtered = members.filter((m) =>
//     m.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
//   );

//   return (
//     <div className={styles.card}>
//       <h3 className={styles.title}>MEET OUR TEAM</h3>
      
//       <div className={styles.searchWrapper}>
//         <input
//           type="text"
//           className={styles.search}
//           placeholder="Search"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <span className={styles.searchIcon}>🔍</span>
//       </div>
      
//       <ul className={styles.list}>
//         {filtered.map((m) => (
//           <li key={m.id} className={styles.item}>
//             <div className={styles.avatar}>
//               {m.avatarUrl ? (
//                 <img src={m.avatarUrl} alt={m.name} />
//               ) : (
//                 <span className={styles.avatarInitial}>
//                   {m.name.charAt(0).toUpperCase()}
//                 </span>
//               )}
//             </div>
//             <div className={styles.meta}>
//               <div className={styles.name}>{m.name}</div>
//               <div className={styles.role}>{m.role}</div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


import * as React from "react";
import styles from "./MeetOurTeam.module.scss";
import { teamMembersService, ITeamMember } from "../../services/TeamMembersService";
import { TeamMemberPopup } from "./TeamMemberPopup";
import { isPnPjsInitialized } from "../../services/pnpjsConfig";

export interface IMeetOurTeamProps {
  isDarkTheme?: boolean;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
}

export const MeetOurTeam: React.FC<IMeetOurTeamProps> = () => {
  const [members, setMembers] = React.useState<ITeamMember[]>([]);
  const [query, setQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [hoveredMember, setHoveredMember] = React.useState<ITeamMember | null>(null);
  const [popupPosition, setPopupPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const loadMembers = async () => {
      try {
        // Wait for PnPjs to initialize
        let retries = 0;
        while (!isPnPjsInitialized() && retries < 10) {
          await new Promise(resolve => setTimeout(resolve, 500));
          retries++;
        }

        const data = await teamMembersService.getTeamMembers();
        setMembers(data);
      } catch (error) {
        console.error("Error loading team members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  // Handle mouse enter on member
  const handleMouseEnter = (member: ITeamMember, event: React.MouseEvent) => {
    setHoveredMember(member);
    setPopupPosition({ x: event.clientX, y: event.clientY });
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredMember(null);
  };

  // Update popup position on mouse move
  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredMember) {
      setPopupPosition({ x: event.clientX, y: event.clientY });
    }
  };

  // Filter members based on search query
  const filtered = members.filter((m) =>
    m.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  if (isLoading) {
    return (
      <div className={styles.card}>
        <h3 className={styles.title}>MEET OUR TEAM</h3>
        <div className={styles.loadingState}>Loading team members...</div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>MEET OUR TEAM</h3>
      
      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>
      
      <ul className={styles.list}>
        {filtered.map((m) => (
          <li 
            key={m.id} 
            className={styles.item}
            onMouseEnter={(e) => handleMouseEnter(m, e)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.avatar}>
              {m.avatarUrl ? (
                <img src={m.avatarUrl} alt={m.name} />
              ) : (
                <span className={styles.avatarInitial}>
                  {m.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className={styles.meta}>
              <div className={styles.name}>{m.name}</div>
              <div className={styles.role}>{m.role}</div>
            </div>
          </li>
        ))}
      </ul>

      {/* Hover Popup */}
      {hoveredMember && (
        <TeamMemberPopup
          name={hoveredMember.name}
          role={hoveredMember.role}
          email={hoveredMember.email}
          phone={hoveredMember.phone}
          department={hoveredMember.department}
          avatarUrl={hoveredMember.avatarUrl}
          position={popupPosition}
        />
      )}
    </div>
  );
};