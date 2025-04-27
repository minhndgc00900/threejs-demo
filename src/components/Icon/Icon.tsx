import { lazy, Suspense, useMemo } from 'react';
import { IconOwnProps } from './Icon.types';

const Icon = ({ name, size = 24, color, style }: IconOwnProps) => {
	 
	const Component = useMemo(() => {
		switch (name) {
			case 'dashboard':
				return lazy(() => import('./assets/Dashboard'));
			case 'location':
				return lazy(() => import('./assets/Location'));
			default:
				return lazy(() => import('./assets/Dashboard'));
		}
	}, [name]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Component sx={{ width: size, height: size, color: color, ...style }} />
		</Suspense>
	);
};

export default Icon;
