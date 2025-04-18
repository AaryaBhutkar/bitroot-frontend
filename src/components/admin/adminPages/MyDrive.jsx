import React from "react";

const MyDrive = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-grow" style={{ height: "calc(100vh - 80px)" }}>
        <iframe
          src="https://mydrive.lovable.app/"
          title="My Drive"
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MyDrive;
