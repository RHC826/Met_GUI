import { useState } from "react";
import "./App.css";
import { MetObjectData, MetResponse, ValidMetMuseumApiRL } from "./MetTypes";

export function App() {
  console.log("App.tsx")
  const [hits, setHits] = useState<MetResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("sunflowers");
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [Collection_MetObjectData, setCollection_MetObjectData] = useState<
    MetObjectData[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const apiUrlMet: ValidMetMuseumApiRL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchQuery}`;

  const fetchArtMetResponse = async (apiUrl: string) => {
    try {
      const response = await fetch(apiUrl);
      const data: MetResponse = await response.json();
      setHits(data);
      setCurrentPage(0); // ページをリセット
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchArtWorks = async () => {
    try {
      if (!hits) return;

      setIsWorking(true);

      const maxCount: number = 20;
      const startIndex: number = currentPage * maxCount;
      const endIndex: number = startIndex + maxCount;
      const objectIDs: number[] = hits.objectIDs.slice(startIndex, endIndex);

      const fetchedData: MetObjectData[] = await Promise.all(
        objectIDs.map((objectID) => fetchArtworkDetails(objectID))
      );

      setCollection_MetObjectData([
        ...Collection_MetObjectData,
        ...fetchedData,
      ]);
      setCurrentPage(currentPage + 1);
      setIsWorking(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsWorking(false);
    }
  };

  const fetchArtworkDetails = async (
    objectID: number
  ): Promise<MetObjectData> => {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      );
      const data: MetObjectData = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching artwork details:", error);
      return {} as MetObjectData;
    }
  };

  const handleSearch = async () => {
    try {
      setIsWorking(true);
      await fetchArtMetResponse(apiUrlMet);
      setIsWorking(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsWorking(false);
    }
  };

  return (
    <>
      <div className="card">
        <h2>
          {isWorking
            ? "[実行中...]"
            : `[準備中...] ${searchQuery} [${
                hits?.total ?? "NO DATA"
              }/${currentPage}]`}
        </h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Query"
        />
        <button
          className="button"
          onClick={() => {
            setCollection_MetObjectData([]);
            return handleSearch();
          }}
        >
          Click Me!
        </button>
        <button className="button" onClick={fetchArtWorks}>
          次のページ
        </button>
      </div>
      <div className="response">
        <ul>
          {Collection_MetObjectData.map((artwork, index) => (
            <li key={index}>
              <img src={artwork.primaryImageSmall} alt={artwork.title ?? "Untitled"} />
              <a
                href={`https://www.metmuseum.org/art/collection/search/${artwork.objectID}`}
              >
                {artwork.title ?? "Error"}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
