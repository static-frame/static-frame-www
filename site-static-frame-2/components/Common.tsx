import React from "react";
import { IconProps } from "./Icons";

export const versionSite = "2.0.0";

export const colorIconShowAll = "#4ade80";
export const colorIconHideAll = "#ef4444";
export const colorSearchButton = "#64748b";
export const colorAccentOrange = "#fdba74";

export const cnCol1FlexCol = "w-full flex flex-col py-2 px-2 sm:w-1/1 lg:w-1/1";
// export const cnCol2FlexCol = 'w-full flex flex-col py-2 px-2 sm:w-1/2 lg:w-1/2'
// export const cnCol3FlexColShrinkable = "w-1/3 flex flex-col py-2 px-2 sm:w-1/3 lg:w-1/3"

export const cnColFieldGradient =
  "px-4 py-2 rounded-sm shadow-md bg-gradient-to-b from-zinc-700 to-zinc-900";
export const cnHeaderButton = "bg-zinc-800/40 hover:bg-zinc-700/60 rounded-sm px-6 transition-colors";

export const CNButtonCommon = "ml-1 my-1 p-2 w-8 rounded-sm";
export const CNButton = `${CNButtonCommon} bg-gradient-to-b from-zinc-600 to-zinc-700`;
export const CNButtonActive = `${CNButtonCommon} bg-gradient-to-b from-zinc-700 to-zinc-600`;
export const CNButtonHover =
  "ml-1 my-1 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-sm text-base text-zinc-400 font-sans";
export const CNToolTipLeft =
  "pointer-events-none absolute opacity-0 bg-slate-600 rounded-sm w-max p-2 -top-14 right-0 font-sans text-slate-100 text-right transition-opacity delay-500 group-hover:opacity-80";

export const cnMaxWidthCentered = "max-w-5xl mx-auto px-4 pt-4";

export function renderIconButton(
  toolTip: string,
  Icon: React.FC<IconProps>,
  iconFill: string,
  onClick: () => void,
  className: () => string,
) {
  return (
    <span className="group relative">
      <button aria-label={toolTip} onClick={onClick} className={className()}>
        <Icon fill={iconFill} />
      </button>
      <span className={CNToolTipLeft}>{toolTip}</span>
    </span>
  );
}
