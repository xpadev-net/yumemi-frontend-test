import { useState } from "react";

import { ApiKeyModal } from "@/components/api-key-modal";
import { PopulationGraph } from "@/components/population-graph";
import { PrefecturePicker } from "@/components/prefecture-picker";

import styles from "./app.module.scss";

function App() {
  const [selectedPrefectureIds, setSelectedPrefectureIds] = useState<string[]>(
    [],
  );

  return (
    <div className={styles.wrapper}>
      <ApiKeyModal />
      <PrefecturePicker
        selectedPrefectureIds={selectedPrefectureIds}
        onChange={setSelectedPrefectureIds}
      />
      {selectedPrefectureIds.length > 0 && (
        <PopulationGraph selectedPrefIds={selectedPrefectureIds.map(Number)} />
      )}
    </div>
  );
}

export default App;
