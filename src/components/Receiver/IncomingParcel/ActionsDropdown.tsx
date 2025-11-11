// import type { Parcel } from "@/types/parcel";
// import { Edit, Info, MoreVertical } from "lucide-react";
// import { useEffect, useRef, useState, type FC } from "react";

// interface ActionsDropdownProps {
//   onViewDetails: () => void;
//   onUpdateStatus: () => void;
//   parcel: Parcel
// }
// export const ActionsDropdown: FC<ActionsDropdownProps> = ({
//   onViewDetails,
//   onUpdateStatus,
//   parcel
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownPosition, setDropdownPosition] = useState<{
//       top: number;
//       left: number;
//       placement: "up" | "down";
//     } | null>(null);

//     const buttonRef = useRef<HTMLButtonElement>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//    // Toggle dropdown 
//   const handleToggle = () => {
//     if (buttonRef.current) {
//       const rect = buttonRef.current.getBoundingClientRect();
//       const dropdownHeight = 120;
//       const isBottomCutOff = rect.bottom + dropdownHeight > window.innerHeight;

//       setDropdownPosition({
//         top: isBottomCutOff
//           ? rect.top + window.scrollY - dropdownHeight - 8
//           : rect.bottom + window.scrollY + 4,
//         left: rect.left + window.scrollX - 140,
//         placement: isBottomCutOff ? "up" : "down",
//       });
//     }
//     setIsOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative inline-block text-left" ref={dropdownRef}>
//       <button
//       ref={buttonRef}
//         onClick={handleToggle}
//         className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//       >
//         <MoreVertical size={20} />
//       </button>
//       {isOpen &&
//         dropdownPosition && (
//         <div className="absolute bg-white dark:bg-gray-800 shadow-xl rounded-md w-48 z-[9999] border border-gray-200 dark:border-gray-700"
//             style={{
//               top: dropdownPosition.top,
//               left: dropdownPosition.left,
//             }}>
//           <div
//             className="py-1"
//             role="menu"
//             aria-orientation="vertical"
//             aria-labelledby="options-menu"
//           >
//             <a
//               href="#"
//               onClick={e => {
//                 e.preventDefault();
//                 onViewDetails();
//                 setIsOpen(false);
//               }}
//               className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//               role="menuitem"
//             >
//               <Info size={16} />
//               View Details
//             </a>
//             {parcel?.currentStatus === 'DELIVERED' && (
//               <a
//                 href="#"
//                 onClick={e => {
//                   e.preventDefault();
//                   onUpdateStatus();
//                   setIsOpen(false);
//                 }}
//                 className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 role="menuitem"
//               >
//                 <Edit size={16} />
//                 Update Status
//               </a>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Parcel } from "@/types/parcel";
import { Edit, Info, MoreVertical } from "lucide-react";
import { useEffect, useRef, useState, type FC } from "react";
import { createPortal } from "react-dom";


interface ActionsDropdownProps {
   onViewDetails: () => void;
  onUpdateStatus: () => void;
  parcel: Parcel
}

export const ActionsDropdown: FC<ActionsDropdownProps> = ({
   onViewDetails,
  onUpdateStatus,
  parcel
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    placement: "up" | "down";
  } | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  

  // Toggle dropdown 
  const handleToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 56;
      const isBottomCutOff = rect.bottom + dropdownHeight > window.innerHeight;

      setDropdownPosition({
        top: isBottomCutOff
          ? rect.top + window.scrollY - dropdownHeight - 8
          : rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX - 140,
        placement: isBottomCutOff ? "up" : "down",
      });
    }
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left">
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        <MoreVertical size={20} className="text-black dark:text-white" />
      </button>

      {/* Dropdown (rendered with portal for correct positioning) */}
      {isOpen &&
        dropdownPosition &&
        createPortal(
          <div
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute bg-white dark:bg-gray-900 shadow-xl rounded-md w-48 z-[9999] border border-gray-200 dark:border-gray-700"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
          >
            <div
              className="py-1 flex flex-col"
              role="menu"
              aria-orientation="vertical"
            >
              <button
                onClick={() => {
                  onViewDetails();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
               
              >
                <Info size={16} /> View Details
              </button>


              {parcel?.currentStatus === 'DELIVERED' && (
                <button
                  onClick={() => {
                    onUpdateStatus();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit size={16} /> Update Status
                </button>
              )}

            
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
