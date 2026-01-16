// Centralized API data loading and transformation
// This module is evaluated once and cached, so all imports share the same data

import sigsInitial from "../sf-api/sigs.json";
import sigToDocJSON from "../sf-api/sig_to_doc.json";
import sigToExJSON from "../sf-api/sig_to_example.json";
import sigToGroupJSON from "../sf-api/sig_to_group.json";
import methodToSigJSON from "../sf-api/method_to_sig.json";
import sigFullToSigJSON from "../sf-api/sig_full_to_sig.json";
import metadataJSON from "../sf-api/metadata.json";

// Export raw data
export { sigsInitial };
export const versionAPI = metadataJSON.version;

// Create and export Maps
export const sigToDoc = new Map<string, string>(Object.entries(sigToDocJSON));
export const sigToEx = new Map<string, string[]>(Object.entries(sigToExJSON));
export const sigToGroup = new Map<string, string>(
  Object.entries(sigToGroupJSON),
);
export const methodToSig = new Map<string, string[]>(
  Object.entries(methodToSigJSON),
);
export const sigFullToSig = new Map<string, string>(
  Object.entries(sigFullToSigJSON),
);

// Create reverse mapping: sig -> sigFull
export const sigToSigFull = new Map<string, string>();
sigFullToSig.forEach((sig, sigFull) => {
  sigToSigFull.set(sig, sigFull);
});

// Export empty array constant
export const sigsEmpty: string[] = [];
