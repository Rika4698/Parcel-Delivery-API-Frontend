/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteParcelMutation } from "@/redux/features/parcel/parcel.api";
import type { Parcel } from "@/types/parcel";
import { Edit, Info, MoreVertical, Package, Trash } from "lucide-react";
import { useEffect, useRef, useState, type FC } from "react";
import { createPortal } from "react-dom";
import Swal from 'sweetalert2';
import { toast } from 'sonner';

interface ActionsDropdownProps {
  onViewDetails: () => void;
  onUpdateParcel: () => void;
  onUpdateStatus: () => void;
  parcel: Parcel;
}

export const ActionsDropdown: FC<ActionsDropdownProps> = ({
  onViewDetails,
  onUpdateParcel,
  onUpdateStatus,
  parcel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    placement: "up" | "down";
  } | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

   const [deleteParcel] = useDeleteParcelMutation();
  
    // SweetAlert Delete Logic
    const DeleteParcel = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            const res = await deleteParcel(parcel._id).unwrap();
            if (res.success) {
              toast.success('Parcel deleted successfully');
            }
          } catch (error: any) {
            toast.error(error.data?.message || 'Failed to delete parcel');
          }
        }
      });
    };

  // Toggle dropdown 
  const handleToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 120;
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
            className="absolute bg-white dark:bg-gray-800 shadow-xl rounded-md w-48 z-[9999] border border-gray-200 dark:border-gray-700"
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

              {parcel?.currentStatus === "PENDING" && (
                <button
                  onClick={() => {
                    onUpdateParcel();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Package size={16} /> Update Parcel
                </button>
              )}

              {parcel?.currentStatus === "PENDING" && (
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

               <button
                              onClick={() => {
                                DeleteParcel();
                                setIsOpen(false);
                              }}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Trash size={16} /> Delete Parcel
                            </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
