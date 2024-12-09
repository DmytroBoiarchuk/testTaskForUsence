import classes from "./Error.module.scss";
import { useState } from "react";

const Error = ({ error }: { error: Error }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <dialog className={classes.errorDialog} open={isOpen}>
      <div className={classes.error}>
        <h1>OoPs!! Something went wrong</h1>
        <p>{error.message}</p>
        <button onClick={() => setIsOpen(false)}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default Error;
