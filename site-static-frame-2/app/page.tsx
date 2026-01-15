import { SFBanner } from "../components/SFBanner";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { APISearch } from "../components/APISearch";
import {
  cnCol1FlexCol,
  cnColFieldGradient,
  cnMaxWidthCentered,
} from "../components/Common";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="h-screen overflow-x-auto">
        <div className="h-6"></div>
        <div className={cnMaxWidthCentered}>
          <div className="flex flex-wrap px-2 py-2 my-4 bg-black rounded-sm">
            <div className={cnCol1FlexCol}>
              <div className={cnColFieldGradient}>
                <SFBanner />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap px-2 pt-2 bg-black rounded-sm">
            <div className={cnCol1FlexCol}>
              <APISearch />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
