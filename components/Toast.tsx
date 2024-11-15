import * as Toast from "@radix-ui/react-toast";
import { useEffect, useState } from "react";

const ToastDemo = ({
  title,
  code,
  description,
  open,
}: {
  title: string;
  code: string;
  description: string;
  open: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root className="ToastRoot" open={isOpen} onOpenChange={setIsOpen}>
        <Toast.Title className="ToastTitle">{title}</Toast.Title>
        <Toast.Description>{description}</Toast.Description>
        <Toast.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <p className="Button small green">{code}</p>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default ToastDemo;
