import { SVGProps } from 'react';
import { IconSvgOwnProps } from '@components/Icon/Icon.types';

const Dashboard = ({ sx: { width, height } }: SVGProps<SVGSVGElement> & IconSvgOwnProps) => (
	<svg
		width={width || 24}
		height={height || 24}
		viewBox="0 0 20 20"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g>
			<path d="M16.4814 3.5186V5.37045H12.7777V3.5186H16.4814ZM7.22218 3.5186V9.07416H3.51848V3.5186H7.22218ZM16.4814 10.926V16.4816H12.7777V10.926H16.4814ZM7.22218 14.6297V16.4816H3.51848V14.6297H7.22218ZM18.3333 1.66675H10.9259V7.2223H18.3333V1.66675ZM9.07403 1.66675H1.66663V10.926H9.07403V1.66675ZM18.3333 9.07416H10.9259V18.3334H18.3333V9.07416ZM9.07403 12.7779H1.66663V18.3334H9.07403V12.7779Z" />
		</g>
	</svg>
);

export default Dashboard;
