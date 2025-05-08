// import useColorFilterStore from "../../../stores/useColorFilterStore";
import { COLOR_THRESHOLDS } from "../../../utils/constant";

interface ColorThreshold {
	color: string;
	threshold: number;
}

const ColorIndicator = () => {
	// const { activeFilter, setActiveFilter } = useColorFilterStore();

	// const handleColorClick = (color: string, threshold: number) => {
	// 	if (activeFilter?.color === color) {
	// 		setActiveFilter(null);
	// 	} else {
	// 		setActiveFilter({ color, threshold });
	// 	}
	// };

	// const getTooltipText = (currentIndex: number): string => {
	// 	if (currentIndex < 0 || currentIndex >= COLOR_THRESHOLDS.length) {
	// 		return "";
	// 	}

	// 	const currentThreshold = COLOR_THRESHOLDS[currentIndex];
	// 	if (!currentThreshold) return "";
		
	// 	if (activeFilter?.color === currentThreshold.color) {
	// 		return "Show all";
	// 	}

	// 	// Nếu là màu đầu tiên (threshold cao nhất)
	// 	if (currentIndex === 0) {
	// 		return `Show cases ≥ ${currentThreshold.threshold}`;
	// 	}
		
	// 	// Nếu là màu cuối cùng
	// 	if (currentIndex === COLOR_THRESHOLDS.length - 1) {
	// 		const previousThreshold = COLOR_THRESHOLDS[currentIndex - 1];
	// 		if (!previousThreshold) return "";
	// 		return `Show cases < ${previousThreshold.threshold}`;
	// 	}
		
	// 	// Các màu ở giữa
	// 	const previousThreshold = COLOR_THRESHOLDS[currentIndex - 1];
	// 	if (!previousThreshold) return "";
	// 	return `Show cases ${currentThreshold.threshold}-${previousThreshold.threshold}`;
	// };

	return (
		<div className="w-80 bg-white/80 py-1 px-4 rounded-md shadow-md">
			<div className="text-sm text-gray-600 mt-2">Daily Pollution Level</div>
			<div className="flex flex-col gap-2">
				<div className="flex h-5">
					{/* {COLOR_THRESHOLDS.map(({ color, threshold }: ColorThreshold, index: number) => (
						<Tooltip 
							key={color}
							title={getTooltipText(index)}
							arrow
						>
							<div
								className="color-indicator"
								style={{
									width: `${100 / COLOR_THRESHOLDS.length}%`,
									backgroundColor: color,
									borderRadius:
										index === 0
											? "3px 0 0 3px"
											: index === COLOR_THRESHOLDS.length - 1
												? "0 3px 3px 0"
												: "0",
									cursor: 'pointer',
									opacity: activeFilter?.color === color ? 1 : 0.5,
								}}
								onClick={() => handleColorClick(color, threshold)}
							/>
						</Tooltip>
					))} */}
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
