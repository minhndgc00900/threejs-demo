import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import useMapStore from "../../../../stores/useMapStore";

interface TextGenerateProps {
	text: React.ReactNode;
	hovered: boolean;
	position: THREE.Vector3;
	animate: boolean;
	color: string;
	name: string;
	textAlign?: "left" | "center" | "right";
}
const TextGenerate = ({
	text,
	hovered,
	position,
	animate,
	color,
	name,
	textAlign = "left",
}: TextGenerateProps) => {
	const ref = useRef<THREE.Mesh>(null);

	const textProps = {
		fontSize: 0.015,
		font: "/fonts/Roboto-MediumItalic.ttf",
		textAlign,
	};

	const activeMesh = useMapStore((state) => state.activeMesh);

	useFrame(() => {
		if (animate && ref.current) {
			ref.current.position.y = THREE.MathUtils.lerp(
				ref.current.position.y,
				activeMesh === name || hovered ? 0.05 : 0,
				0.08
			);
		}
	});
	return (
		<Text
			ref={ref}
			position={position}
			material-toneMapped={false}
			color={color}
			{...textProps}
		>
			{!animate ? text : (activeMesh === name || hovered) && text}
		</Text>
	);
};

export default TextGenerate;
