import { Timeline } from "../components/Timeline";
import { experiences } from "../components/constants";

function Experiences() {
  return (
    <div className="w-full">
      <Timeline data={experiences} />
    </div>
  );
}

export default Experiences;
