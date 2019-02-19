import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="my-flex-container">
      <div className="my-flex-innercontainer">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <h5 className="mt-2">Kraunasi...</h5>
        </div>
      </div>
    </div>
  );
}
