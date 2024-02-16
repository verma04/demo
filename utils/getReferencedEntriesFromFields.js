import {collectReferencedIds, collectReferencedIdsFromArray} from "./collectReferenceIds.js";
import client from "./contentfulClient.js";

export const getReferencedEntriesFromFields = async (items) => {
    let allReferencedIds = [];
    items.forEach(component => {
        allReferencedIds = allReferencedIds.concat(collectReferencedIds(component.fields));
    });

    // Deduplicate IDs
    allReferencedIds = [...new Set(allReferencedIds)];

    // Fetch all referenced entries in a batch if there are any
    let referencedEntries = [];
    if (allReferencedIds.length > 0) {
        const referencesResponse = await client.getEntries({
            'sys.id[in]': allReferencedIds.join(',')
        });
        referencedEntries = referencesResponse.items;
    }
    return referencedEntries
}
export const getReferencedEntriesItems = async (items) => {
    let allReferencedIds = collectReferencedIdsFromArray(items)

    // Deduplicate IDs
    allReferencedIds = [...new Set(allReferencedIds)];

    // Fetch all referenced entries in a batch if there are any
    let referencedEntries = [];
    if (allReferencedIds.length > 0) {
        const referencesResponse = await client.getEntries({
            'sys.id[in]': allReferencedIds.join(',')
        });
        referencedEntries = referencesResponse.items;
    }
    return referencedEntries
}