import { useState } from "react";

interface PurchaseModalProps {
  open: boolean;
  vehicleName: string;
  onClose: () => void;
  onConfirm: (
    quantity: number
  ) => Promise<boolean>;
}

function PurchaseModal({
  open,
  vehicleName,
  onClose,
  onConfirm,
}: PurchaseModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handlePurchase = async () => {
    setLoading(true);

    const success = await onConfirm(quantity);

    setLoading(false);

    if (success) {
      setQuantity(1);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Purchase Vehicle
        </h2>

        <p className="mb-4">
          <strong>{vehicleName}</strong>
        </p>

        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
          className="mb-6 w-full rounded border p-3"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handlePurchase}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {loading
              ? "Purchasing..."
              : "Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseModal;