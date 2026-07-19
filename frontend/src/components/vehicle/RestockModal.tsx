import { useState } from "react";
import "./RestockModal.css";

interface RestockModalProps {
  open: boolean;
  vehicleName: string;
  onClose: () => void;
  onConfirm: (quantity: number) => Promise<boolean>;
}

function RestockModal({
  open,
  vehicleName,
  onClose,
  onConfirm,
}: RestockModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleRestock = async () => {
    setLoading(true);

    const success = await onConfirm(quantity);

    setLoading(false);

    if (success) {
      setQuantity(1);
      onClose();
    }
  };

  return (
    <div className="restock-overlay">
      <div className="restock-modal">
        <div className="restock-icon">
          📦
        </div>

        <h2 className="restock-title">
          Restock Vehicle
        </h2>

        <p className="restock-subtitle">
          Add stock for
        </p>

        <div className="restock-vehicle">
          {vehicleName}
        </div>

        <div className="restock-field">
          <label>Quantity</label>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="restock-input"
          />
        </div>

        <div className="restock-actions">
          <button
            onClick={onClose}
            className="restock-cancel"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleRestock}
            className="restock-confirm"
          >
            {loading
              ? "Restocking..."
              : "Restock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestockModal;