import React, { FC, HtmlHTMLAttributes, MouseEvent } from "react";
import classNames from "classnames";
import * as style from "./Elements.module.scss";

type MenuTogglerProps = {
  opened: boolean;
  onToggled: (opened: boolean) => void;
};

const MenuToggler: FC<MenuTogglerProps & HtmlHTMLAttributes<Element>> = ({
  opened,
  onToggled,
  className,
}) => {
  const onMenuToggled = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onToggled(!opened);
  };
  return (
    <button
      className={classNames(
        style.menuToggler,
        { [style.open]: opened },
        className
      )}
      onClick={onMenuToggled}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default MenuToggler;
