import { BetterSystemStyleObject } from "@primer/react/lib/sx";
import React from "react";

export interface IBaseComponentProps {
    children?: React.ReactNode,
    style?: BetterSystemStyleObject | React.CSSProperties,
    className?: string
}