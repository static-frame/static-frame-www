import {SFIconSVG} from './IconSFInf';
import {SFTitleSVG} from './IconSFTitle';

import {
    // colorIconShowAll,
    // colorIconHideAll,
    // colorSearchButton,
    colorAccentOrange,
  } from "./Common";

export function SFBanner() {
    return (
        <div className="flex ">
            <div className="justify-right items-right">
            <SFIconSVG ring='#27272a' infinity='#3f3f46' frame={colorAccentOrange} size={80} />
            </div>
            <div className="px-2 pt-1 h-20">
            <SFTitleSVG />
            </div>
        </div>
    )
}




// function Description() {
//     return (
//         <div className='p-2'>
//         <p className={CNTextSmall}>StaticFrame: A Python library of immutable and grow-only Pandas-like DataFrames with a more explicit and consistent interface.
//         </p>
//         </div>
//     )
// }

