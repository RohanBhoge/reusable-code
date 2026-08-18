"use client";

import React, { useState } from "react";
import CommonModal from "./CommonModal";

const CommonModalWithTrigger = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="btn btn-dark px-4 py-2 rounded-3 font-medium text-sm"
      >
        Pop Up
      </button>

      <CommonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Basic Modal"
      >
        <div className="text-secondary text-sm">
          <p className="mb-0">This is an empty modal ready for your content!</p>
        </div>
      </CommonModal>
    </div>
  );
};

export default CommonModalWithTrigger;
