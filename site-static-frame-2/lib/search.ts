// Core search functionality for StaticFrame API signatures
// Used by both the UI component and MCP endpoints

import { sigsInitial, sigFullToSig } from "./apiData";

export interface SearchOptions {
  fullSigSearch?: boolean; // Include parameter names in search
  reSearch?: boolean; // Use regular expression matching
}

export interface SearchResult {
  signatures: string[];
  count: number;
}

/**
 * Search StaticFrame API signatures
 *
 * @param query - The search query string
 * @param options - Search options (fullSigSearch, reSearch)
 * @returns SearchResult with matching signatures and count
 */
export function searchSignatures(
  query: string,
  options: SearchOptions = {},
): SearchResult {
  const { fullSigSearch = false, reSearch = false } = options;
  const lowerTarget = query.toLowerCase().trim();

  if (!lowerTarget) {
    return { signatures: [], count: 0 };
  }

  let sigsFiltered: string[] = [];

  if (fullSigSearch) {
    // Search including parameter names
    if (reSearch) {
      try {
        const re = new RegExp(lowerTarget);
        sigFullToSig.forEach((value, key) => {
          if (re.test(key.toLowerCase())) {
            sigsFiltered.push(value);
          }
        });
      } catch {
        // Invalid regex, return empty results
        return { signatures: [], count: 0 };
      }
    } else {
      sigFullToSig.forEach((value, key) => {
        if (key.toLowerCase().indexOf(lowerTarget) > -1) {
          sigsFiltered.push(value);
        }
      });
    }
  } else {
    // Search signature names only
    if (reSearch) {
      try {
        const re = new RegExp(lowerTarget);
        sigsFiltered = sigsInitial.filter((row) => {
          return re.test(row.toLowerCase());
        });
      } catch {
        // Invalid regex, return empty results
        return { signatures: [], count: 0 };
      }
    } else {
      sigsFiltered = sigsInitial.filter((row) => {
        return row.toLowerCase().indexOf(lowerTarget) > -1;
      });
    }
  }

  return {
    signatures: sigsFiltered,
    count: sigsFiltered.length,
  };
}
