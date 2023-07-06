"use client";

import React, { FC } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";

import styles from "@/styles/components/ui/SelectDropdown.module.scss";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

interface SelectDropdownProps {
  items: any;
  onChange: (value: string) => void;
  defaultValue: string;
}

interface SelectDropdownItemProps extends Select.SelectItemProps {
  children: React.ReactNode;
  className?: string;
}

const SelectDropdown: FC<SelectDropdownProps> = ({
  items,
  onChange,
  defaultValue,
}) => {
  return (
    <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
      <Select.Trigger
        className={styles.SelectTrigger}
        aria-label="Select Region"
      >
        <Select.Value />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={styles.SelectContent}
          position="popper"
          align="start"
          sideOffset={10}
        >
          <Select.ScrollUpButton className={styles.SelectScrollButton}>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className={styles.SelectViewport}>
            {items.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.displayName}
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={styles.SelectScrollButton}>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  SelectDropdownItemProps
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={classnames(styles.SelectItem, className)}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});

SelectItem.displayName = "SelectItem";

export default SelectDropdown;
