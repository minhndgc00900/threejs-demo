/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import useMapStore from "@stores/useMapStore";

const CameraControl = () => {
	const activeMesh = useMapStore((state) => state.activeMesh);
	const [activeCameraMesh, setActiveCameraMesh] = useState("");

	useFrame(({ camera, scene }) => {
		const target = new THREE.Vector3();
		if (activeCameraMesh !== activeMesh && activeMesh) {
			scene.getObjectByName(activeMesh)?.getWorldPosition(target);

			const cameraPosition = {
				x: target.x,
				y: target.y + 3,
				z: target.z + 7,
			};

			camera.position.lerp(cameraPosition, 0.05);

			(scene as any).orbitControls?.target.lerp(target, 0.05);
			(scene as any).orbitControls?.update();

			const diff = camera.position.clone().sub(cameraPosition).length();

			if (diff < 1) setActiveCameraMesh(activeMesh);
		}
	});
	return null;
};

export default CameraControl;
