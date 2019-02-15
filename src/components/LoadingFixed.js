import React from "react";

export default function LoadingFixed() {
  return (
    <div>
      <div className="my-fixed-flex-container">
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
