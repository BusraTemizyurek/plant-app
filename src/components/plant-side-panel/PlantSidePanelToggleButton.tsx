import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface PlantSidePanelToggleButtonProps {
  onToggle: () => void;
}

export const PlantSidePanelToggleButton = ({
  onToggle,
}: PlantSidePanelToggleButtonProps) => {
  return (
    <div>
      <button
        onClick={onToggle}
        className="h-10 w-10 m-2 p-2 rounded-md transition-colors bg-gray-200 hover:bg-gray-300"
      >
        <FontAwesomeIcon size="lg" icon={faBars} className="text-black" />
      </button>
    </div>
  );
};
