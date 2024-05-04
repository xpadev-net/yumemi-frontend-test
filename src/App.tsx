import "@/App.css";

import { useState } from "react";

import { ApiKeyModal } from "@/components/api-key-modal/api-key-modal.tsx";
import { PopulationGraph } from "@/components/population-graph/population-graph.tsx";
import { PrefecturePicker } from "@/components/prefecture-picker/prefecture-picker.tsx";

function App() {
  const [selectedPrefectureIds, setSelectedPrefectureIds] = useState<string[]>(
    [],
  );

  return (
    <>
      <ApiKeyModal />
      <PrefecturePicker
        selectedPrefectureIds={selectedPrefectureIds}
        onChange={setSelectedPrefectureIds}
      />
      {selectedPrefectureIds.length > 0 && (
        <PopulationGraph selectedPrefIds={selectedPrefectureIds.map(Number)} />
      )}
    </>
  );
}

export default App;
