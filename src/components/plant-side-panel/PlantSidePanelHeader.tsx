import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faXmark } from "@fortawesome/free-solid-svg-icons";

interface PlantSidePanelHeaderProps {
  onToggle: () => void;
}

export const PlantSidePanelHeader = ({
  onToggle,
}: PlantSidePanelHeaderProps) => {
  return (
    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <FontAwesomeIcon icon={faSeedling} className="text-green-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Plants</h2>
      </div>

      <button
        onClick={onToggle}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <FontAwesomeIcon size="sm" icon={faXmark} className="text-gray-500" />
      </button>
    </div>
  );
};
