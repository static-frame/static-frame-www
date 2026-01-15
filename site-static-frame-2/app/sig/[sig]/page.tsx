'use client';

import { use } from 'react';

import {SFBanner} from '../../../components/SFBanner';
import {Header} from '../../../components/Header';
import {Footer} from '../../../components/Footer';
import {CodeBlock, SigLabel} from '../../../components/CodeBlock';

import {
    cnCol1FlexCol,
    cnColFieldGradient,
    cnMaxWidthCentered,
} from "../../../components/Common";

import {
    sigToDoc,
    sigToEx,
    sigToSigFull,
} from '../../../lib/apiData';

interface SigPageProps {
    params: Promise<{ sig: string }>;
}

export default function SigPage({ params }: SigPageProps) {
    const { sig } = use(params);
    const decodedSig = decodeURIComponent(sig);

    // Get the full signature with parameters
    const sigFull = sigToSigFull.get(decodedSig);
    const doc = sigToDoc.get(decodedSig);
    const example = sigToEx.get(decodedSig);

    // Check if signature exists
    const sigExists = sigToSigFull.has(decodedSig);

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

                <div className="flex flex-wrap p-2 bg-black rounded-sm text-md">
                    <div className={cnCol1FlexCol}>
                        {sigExists ? (
                            <div className="x-2 p-2 bg-zinc-800/60 rounded-sm">
                                    <SigLabel sigFull={sigFull} fallbackText={decodedSig} textClassName="text-md" />

                                {doc && (
                                        <div className="py-2 font-sans text-slate-400">{doc}</div>
                                )}

                                {example && (
                                        <div className="overflow-x-auto">
                                            <CodeBlock code={example.join('\n')} />
                                        </div>
                                )}

                                {/* Back to search link */}
                                <div className="px-2">
                                    <a
                                        href={`/search/${encodeURIComponent(decodedSig.split('.').pop() || decodedSig)}`}
                                        className="text-zinc-500 hover:text-zinc-400 font-sans"
                                    >
                                        ← Similar methods
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="px-4 text-center">
                                <div className="text-zinc-400 font-sans">
                                    Signature not found: <span className="font-mono">{decodedSig}</span>
                                </div>
                                <div className="">
                                    <a href="/" className="text-zinc-500 hover:text-zinc-400 font-sans text-sm">
                                        ← Back to search
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />

            </div>
        </div>
    </div>
    );
}
