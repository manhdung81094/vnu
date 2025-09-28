import { Dialog, DialogProps } from "@primer/react/drafts";
import React from "react";
interface IMyModalProps extends DialogProps {
  children?: React.ReactNode;
  titleComponent?: React.ReactNode;
  onClose: () => void;
  width?: "small" | "medium" | "large" | "xlarge" | any;
  isOpen?: boolean;
}
const MyModal = (props: IMyModalProps) => {
  return (
    <>
      {props.isOpen && (
        <Dialog
          title={props.title ? props.title?.toString() : props.titleComponent}
          subtitle={props.subtitle ? props.subtitle?.toString() : undefined}
          width={props.width}
          height={props.height}
          sx={props.sx}
          onClose={(gesture) => {
            if (gesture === "close-button") {
              props.onClose();
            } 
          }}
          renderHeader={props.renderHeader}
          renderFooter={props.renderFooter}
        >
          {props.children}
        </Dialog>
      )}
    </>
  );
};

export default MyModal;
