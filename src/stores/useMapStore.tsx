import * as THREE from "three";
import { create } from "zustand";
import { GlobalCameraPosition, InitialCameraPosition } from "@utils/constant";
import { CameraProps } from "@react-three/fiber";

interface MapState {
	cameraPosition: THREE.Vector3;
	globalCameraPosition: CameraProps;
	activeMesh?: string | null;
	setCameraPosition: (payload: { activeMesh?: string | null }) => void;
	isResetCamera: boolean;
	resetCamera: (payload?: { x?: number, y?: number, z?: number }) => void;
	resetGlobalCamera: () => void;
}

const useMapStore = create<MapState>((set) => ({
	cameraPosition: new THREE.Vector3(
		InitialCameraPosition.X,
		InitialCameraPosition.Y,
		InitialCameraPosition.Z
	),
	globalCameraPosition: {
		position: [GlobalCameraPosition.X, GlobalCameraPosition.Y, GlobalCameraPosition.Z],
		fov: 45,
	},
	activeMesh: null,
	setCameraPosition: (payload) => {
		set(() => ({
			activeMesh: payload.activeMesh,
		}));
	},
	
	isResetCamera: false,
	resetGlobalCamera: () => {
		set(() => ({ globalCameraPosition: {
			position: [GlobalCameraPosition.X, GlobalCameraPosition.Y, GlobalCameraPosition.Z],
			fov: 45,
		} }));
	},
	resetCamera: () => {
		set(() => ({ cameraPosition: new THREE.Vector3(
			InitialCameraPosition.X,
			InitialCameraPosition.Y,
			InitialCameraPosition.Z
		) }));
	},
}));

export default useMapStore;
