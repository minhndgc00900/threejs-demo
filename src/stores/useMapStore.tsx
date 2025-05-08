import * as THREE from "three";
import { create } from "zustand";

interface MapState {
	cameraPosition: THREE.Vector3;
	activeMesh?: string | null;
	setCameraPosition: (payload: { activeMesh?: string | null }) => void;
	isResetCamera: boolean;
	resetCamera: (payload: boolean) => void;
}

const useMapStore = create<MapState>((set) => ({
	cameraPosition: new THREE.Vector3(
		1.0959887504577637,
		0.005898133385926485,
		0.19488362967967987
	),
	activeMesh: null,
	setCameraPosition: (payload) => {
		set(() => ({
			activeMesh: payload.activeMesh,
		}));
	},
	isResetCamera: false,
	resetCamera: (payload) => {
		set(() => ({ isResetCamera: payload }));
	},
}));

export default useMapStore;
