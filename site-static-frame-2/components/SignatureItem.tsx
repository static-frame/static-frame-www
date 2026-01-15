import { CodeBlock, SigLabel } from "./CodeBlock";
import {
  IconDocument,
  IconCode,
  IconClass,
  IconGroup,
  IconLink,
} from "./Icons";
import {
  colorSearchButton,
  colorAccentOrange,
  CNButton,
  CNButtonActive,
  CNButtonHover,
  CNToolTipLeft,
  renderIconButton,
} from "./Common";

interface SignatureItemProps {
  value: string;
  index: number;
  sigToGroup: Map<string, string>;
  sigToSigFull: Map<string, string>;
  sigToDoc: Map<string, string>;
  sigToEx: Map<string, string[]>;
  docDisplay: Map<string, boolean>;
  exDisplay: Map<string, boolean>;
  setFullSigSearch: (value: boolean) => void;
  setRESearch: (value: boolean) => void;
  setSigsDisplay: (sigs: string[]) => void;
  setDocDisplay: (display: Map<string, boolean>) => void;
  setExDisplay: (display: Map<string, boolean>) => void;
  clearInputOnly: () => void;
}

export function SignatureItem({
  value,
  index,
  sigToGroup,
  sigToSigFull,
  sigToDoc,
  sigToEx,
  docDisplay,
  exDisplay,
  setFullSigSearch,
  setRESearch,
  setSigsDisplay,
  setDocDisplay,
  setExDisplay,
  clearInputOnly,
}: SignatureItemProps) {
  const className = value.split(".")[0];
  const groupName = sigToGroup.get(value);
  const sigFull = sigToSigFull.get(value);

  function onClickTagClass() {
    setFullSigSearch(false);
    setRESearch(false);
    const sigsFiltered: string[] = [];
    sigToGroup.forEach((_value, key) => {
      if (key.split(".")[0] === className) {
        sigsFiltered.push(key);
      }
    });
    setSigsDisplay(sigsFiltered);
    clearInputOnly();
  }

  function onClickTagGroup() {
    setFullSigSearch(false);
    setRESearch(false);
    const sigsFiltered: string[] = [];
    sigToGroup.forEach((value, key) => {
      if (key.split(".")[0] === className && value === groupName) {
        sigsFiltered.push(key);
      }
    });
    setSigsDisplay(sigsFiltered);
    clearInputOnly();
  }

  function onClickToggleDoc() {
    if (docDisplay.has(value)) {
      docDisplay.set(value, !docDisplay.get(value));
    } else {
      docDisplay.set(value, true);
    }
    setDocDisplay(new Map<string, boolean>(docDisplay));
  }

  function onClickToggleEx() {
    if (exDisplay.has(value)) {
      exDisplay.set(value, !exDisplay.get(value));
    } else {
      exDisplay.set(value, true);
    }
    setExDisplay(new Map<string, boolean>(exDisplay));
  }

  const buttonClass = renderIconButton(
    `Display all ${className} methods`,
    IconClass,
    colorSearchButton,
    onClickTagClass,
    () => CNButtonHover,
  );

  const buttonGroup = renderIconButton(
    `Display all ${className} ${groupName} methods`,
    IconGroup,
    colorSearchButton,
    onClickTagGroup,
    () => CNButtonHover,
  );

  const buttonDoc = renderIconButton(
    "Show documentation",
    IconDocument,
    colorAccentOrange,
    onClickToggleDoc,
    () => (docDisplay.get(value) ? CNButtonActive : CNButton),
  );

  const buttonEx = renderIconButton(
    "Show example",
    IconCode,
    colorAccentOrange,
    onClickToggleEx,
    () => (exDisplay.get(value) ? CNButtonActive : CNButton),
  );

  const buttonLink = (
    <span className="group relative">
      <a
        href={`/sig/${encodeURIComponent(value)}`}
        aria-label="View signature details"
        className={`${CNButtonHover} inline-flex items-center justify-center`}
      >
        <IconLink fill={colorSearchButton} />
      </a>
      <span className={CNToolTipLeft}>View signature details</span>
    </span>
  );

  const cnRow =
    index % 2
      ? "px-2 py-1 bg-zinc-800/80 rounded-sm"
      : "px-2 py-1 bg-zinc-800/60 rounded-sm";

  // Get doc and example content
  const doc = docDisplay.get(value) ? sigToDoc.get(value) : null;
  const ex = exDisplay.get(value) ? sigToEx.get(value)?.join("\n") : null;

  return (
    <li className={cnRow} key={value}>
      <div className="flex">
        <span className="w-4/6 my-1">
          <SigLabel sigFull={sigFull} />
        </span>
        <span className="w-2/6 text-right">
          {buttonLink}
          {buttonClass}
          {buttonGroup}
          {buttonDoc}
          {buttonEx}
        </span>
      </div>
      <div className="w-full">
        {doc && <div className="py-2 font-sans text-slate-400">{doc}</div>}
        {ex && (
          <div className="overflow-x-auto">
            <CodeBlock code={ex} />
          </div>
        )}
      </div>
    </li>
  );
}
