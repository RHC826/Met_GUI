//AI に作らせた型情報
export interface MetObjectMeasurements {
    Depth?: number;
    Height?: number;
    Width?: number;
}

export interface MetElementMeasurements {
    elementName: string;
    elementDescription: string | null;
    elementMeasurements: MetObjectMeasurements;
}

export interface MetObjectData {
    objectID: number;
    isHighlight: boolean;
    accessionNumber: string;
    accessionYear: string;
    isPublicDomain: boolean;
    primaryImage: string;
    primaryImageSmall: string;
    additionalImages: string[];
    constituents: null | MetObjectData[]; // You may want to define this interface if you have information about it
    department: string;
    objectName: string;
    title: string;
    culture: string;
    period: string;
    dynasty: string;
    reign: string;
    portfolio: string;
    artistRole: string;
    artistPrefix: string;
    artistDisplayName: string;
    artistDisplayBio: string;
    artistSuffix: string;
    artistAlphaSort: string;
    artistNationality: string;
    artistBeginDate: string;
    artistEndDate: string;
    artistGender: string;
    artistWikidata_URL: string;
    artistULAN_URL: string;
    objectDate: string;
    objectBeginDate: number;
    objectEndDate: number;
    medium: string;
    dimensions: string;
    measurements: [];
    creditLine: string;
    geographyType: string;
    city: string;
    state: string;
    county: string;
    country: string;
    region: string;
    subregion: string;
    locale: string;
    locus: string;
    excavation: string;
    river: string;
    classification: string;
    rightsAndReproduction: string;
    linkResource: string;
    metadataDate: string;
    repository: string;
    objectURL: string;
    tags: { term: string; AAT_URL: string; Wikidata_URL: string }[];
    objectWikidata_URL: string;
    isTimelineWork: boolean;
    GalleryNumber: string;
}

export interface MetResponse {
    total: number;
    objectIDs: number[];
}

export   type ValidMetMuseumApiRL = `${"https://collectionapi.metmuseum.org/public/collection/v1/"}${string}`;
