import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { ReactNode } from "react";

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
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
          <DialogTitle className="mb-6 text-2xl font-bold">
            {title}
          </DialogTitle>

          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default VehicleModal;