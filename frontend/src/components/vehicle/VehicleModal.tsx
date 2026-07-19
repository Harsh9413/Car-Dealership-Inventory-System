import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ReactNode } from "react";
import "./VehicleModal.css";

interface VehicleModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

function VehicleModal({
  open,
  title,
  onClose,
  children,
}: VehicleModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="vehicle-modal"
    >
      <DialogBackdrop className="vehicle-backdrop" />

      <div className="vehicle-modal-wrapper">
        <DialogPanel className="vehicle-modal-panel">
          <div className="vehicle-modal-header">
            <DialogTitle className="vehicle-modal-title">
              {title}
            </DialogTitle>

            <button
              type="button"
              onClick={onClose}
              className="vehicle-modal-close"
            >
              ×
            </button>
          </div>

          <div className="vehicle-modal-body">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default VehicleModal;