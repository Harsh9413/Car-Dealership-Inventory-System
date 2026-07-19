import { useState } from "react";
import "./PurchaseModal.css";

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
    <div className="purchase-overlay">
      <div className="purchase-modal">
        <div className="purchase-icon">
          🚗
        </div>

        <h2 className="purchase-title">
          Purchase Vehicle
        </h2>

        <p className="purchase-subtitle">
          Confirm purchase for
        </p>

        <div className="purchase-vehicle">
          {vehicleName}
        </div>

        <div className="purchase-field">
          <label>Quantity</label>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="purchase-input"
          />
        </div>

        <div className="purchase-actions">
          <button
            onClick={onClose}
            className="purchase-cancel"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handlePurchase}
            className="purchase-confirm"
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