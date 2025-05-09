// import useColorFilterStore from "../../../stores/useColorFilterStore";
import { COLOR_THRESHOLDS } from "@utils/constant";

interface ColorThreshold {
	color: string;
	threshold: number;
}

const ColorIndicator = () => {
	return (
		<div className="w-80 bg-white/80 py-1 px-4 rounded-md shadow-md">
			<div className="text-sm text-gray-600 mt-2">Daily Pollution Level</div>
			<div className="flex flex-col gap-2">
				<div className="flex h-5">
				</div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					{COLOR_THRESHOLDS.map(({ threshold }: ColorThreshold) => (
						<span
							key={threshold}
							style={{
								fontSize: "12px",
								color: "#333",
							}}
						>
							{threshold}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default ColorIndicator;
