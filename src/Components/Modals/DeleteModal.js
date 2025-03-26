import { OctagonAlert } from "lucide-react"
import { useModalContext } from "../../Functions/Context/ModalContext"
import { useRef } from 'react'
import useClickOutSide from "../../Functions/Hooks/useClickOutSide"

export default function DeleteModal({ name }) {
  const { selectedItem, setSelectedItem, setActiveModal, setRowIndex } = useModalContext()

  const resetModal = () => {
    setActiveModal(null)
    setSelectedItem(null)
    setRowIndex(null)
  }
  const popoverRef = useRef(null);
  // Close popup when clicking outside
  useClickOutSide(resetModal, popoverRef)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <div ref={popoverRef} className="relative rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-5 flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-red-50 dark:bg-red-900/20">
              <OctagonAlert size={32} className="text-red-500 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Delete {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Are you sure you want to delete {selectedItem?.fullName || selectedItem?.libel}? This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              onClick={resetModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Delete {name}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}