import React, { useEffect } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

const NotificationModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Close modal after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white shadow-md rounded-lg p-4 flex items-center">
      <CheckCircleOutlined className="text-green-500 mr-2" />
      <p className="text-green-500">{message}</p>
    </div>
  );
};

export default NotificationModal;
