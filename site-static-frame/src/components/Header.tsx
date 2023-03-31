
import {
    // colorIconShowAll,
    // colorIconHideAll,
    // colorSearchButton,
    // colorAccentOrange,
    // cnCol1FlexCol,
    // cnColFieldGradient,
    cnHeaderButton
  } from "./Common";

import {Link} from './Link';

export function Header() {
    return (
    <div className="absolute z-50 left-0 right-0 flex h-10 w-full bg-black/80">
    {/* not sure why this is not centered, but need to shift more to left */}
    <div className="max-w-5xl mx-auto pr-5 pl-3 flex-1">
        <div className="pt-2 space-x-1 flex justify-end">
            <button className={cnHeaderButton}>
              <Link label='Code' url='https://github.com/InvestmentSystems/static-frame' />
            </button>
            <button className={cnHeaderButton}>
              <Link label='Docs' url='https://static-frame.readthedocs.io/en/latest/' />
            </button>
        </div>
    </div>
    </div>
)}
