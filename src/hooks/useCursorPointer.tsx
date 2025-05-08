import { useEffect } from "react";

export const useCursorPointer = (hovered: boolean) => {
	useEffect(() => {
		if (hovered) {
			return () => {
				document.body.style.cursor = "pointer";
			};
		}
		return () => {
			document.body.style.cursor = "auto";
		};
	}, [hovered]);
};
