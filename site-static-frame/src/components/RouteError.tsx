import { useRouteError,
    isRouteErrorResponse,
 } from "react-router-dom";

import {
    cnCol1FlexCol,
    cnColFieldGradient,
    cnMaxWidthCentered,
  } from "./Common";

  import {SFBanner} from './SFBanner';
  import {Header} from './Header';
  import {Footer} from './Footer';


export default function RouteError() {
    const error = useRouteError();
    console.error(error);
    let msg = "Error";
    if (isRouteErrorResponse(error)) {
        msg = `${error.status} ${error.data}`;
    }
    return (
    <div>
    <Header />
    <div className="h-screen overflow-x-auto">
        <div className="h-6"></div>
        <div className={cnMaxWidthCentered}>

            <div className="flex flex-wrap px-2 py-2 my-4 bg-black rounded-md">
                <div className={cnCol1FlexCol}>
                  <div className={cnColFieldGradient}>
                    <SFBanner />
                  </div>
                </div>
            </div>

            <div className="flex flex-wrap px-4 py-2 bg-black rounded-md">
            <span className="text-2xl text-slate-400 text-bold">{msg}</span>

            </div>
            <Footer />

        </div>
    </div>
    </div>

)}