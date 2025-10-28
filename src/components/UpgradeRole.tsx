
import { X } from 'lucide-react';
import type { FC } from 'react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  userRole: string
}

export const UpgradeRole: FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  userRole,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000058] z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Upgrade to Receiver
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          You are currently a {userRole}. Upgrade to Receiver to access
          receiver-only features.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onUpgrade}
            className="px-4 py-2 cursor-pointer active:scale-105 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};
