'use client';

import Link from 'next/link';

type LogoProps = {
	setPendingNavigation?: (href: string) => void;
	mobileMenuOpen?: boolean;
};

export default function Logo({ setPendingNavigation, mobileMenuOpen }: LogoProps) {
	return (
		<div className="flex flex-grow items-center p-2.5 h-[70px] w-[250px] sm:col-start-1 sm:row-start-1 sm:items-center sm:justify-center sm:p-0 sm:h-auto">
			<Link
				href="/"
				className="grid grid-cols-[75px_115px] sm:grid-cols-[100px_150px] gap-[15px] w-[200px] h-[70px] sm:w-[250px] justify-center items-center"
				aria-label="Return to the homepage"
				onClick={() => {
					if (mobileMenuOpen && setPendingNavigation) setPendingNavigation('/');
				}}
			>
				<div className="flex justify-center items-center h-full w-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 361.64 293.5"
						className="h-full w-full"
						aria-hidden="true"
					>
						<g id="Layer_2" data-name="Layer 2">
							<g id="Layer_1-2" data-name="Layer 1">
								<path
									fill="#4e4d50"
									d="M361.64,146.75c0,81.05-81,146.75-180.82,146.75S0,227.8,0,146.75,81,0,180.82,0,361.64,65.7,361.64,146.75Z"
								/>
								<path
									fill="#231f20"
									d="M24.44,166.93c11,0,22-.56,32.22-4.27,11.84-4.29,17-.82,27.53,3.68,10.89,4.63,21.5-2.41,32.84,1.76s22.14,7.3,34.08,10.54a126.26,126.26,0,0,0,34,4.69c7.33,0,14.94-.49,22.15.57s15.72,6.15,22.84,5.29c19.68-2.39,38.64-36.15,60.36-23.61,5.2,3,6.42,5.44,12.88,5.45s9.44-3.49,15.1-6c8.94-4,23-2.79,22.39,9.55-.51,10.64-8.34,21.1-14.16,29.41-7.73,11-17.09,24.85-27.73,32.83-12,9-28.73,16.57-43.06,20.25-15.37,4-30.39,9.1-46.31,10.82-15.28,1.65-30.64,1.6-46.23,1.6-6.05,0-13,1-18.9,0-7.34-1.18-15.29-5.32-22.24-7.49-24-7.48-46.52-17.22-64.33-35.33-10.24-10.41-20.06-17.74-27.68-30.4a130.85,130.85,0,0,1-8-16.44A32.93,32.93,0,0,1,19.62,172c-.73-5.11-.78-4.63,3.65-5.7,2.57-.62,6.12,0,8.79,0"
								/>
								<path
									fill="#f3f3f5"
									d="M258.6,104.13c0,37.85-31.51,68.53-70.37,68.53S117.85,142,117.85,104.13s31.51-68.52,70.38-68.52S258.6,66.29,258.6,104.13Z"
								/>
								<rect
									fill="#808285"
									x="200.64"
									y="200.7"
									width="28.21"
									height="3.52"
									transform="translate(-42.9 58.5) rotate(-14.12)"
								/>
								<rect
									fill="#808285"
									x="240.48"
									y="189.21"
									width="3.52"
									height="29.28"
									transform="translate(-30.15 365.21) rotate(-70.72)"
								/>
								<rect
									fill="#808285"
									x="202.53"
									y="180.74"
									width="28.14"
									height="3.52"
									transform="translate(-61.41 128.38) rotate(-29.1)"
								/>
								<rect
									fill="#808285"
									x="239.38"
									y="168.48"
									width="3.52"
									height="28.04"
									transform="translate(-35.82 303.94) rotate(-60.8)"
								/>
								<rect
									fill="#808285"
									x="206.54"
									y="162.92"
									width="23.88"
									height="3.51"
									transform="translate(-49.79 110.98) rotate(-25.69)"
								/>
								<rect
									fill="#808285"
									x="237.79"
									y="151.94"
									width="3.52"
									height="25.64"
									transform="translate(-22.47 290.76) rotate(-60.2)"
								/>
								<rect
									fill="#808285"
									x="207.94"
									y="137.08"
									width="26.23"
									height="3.51"
									transform="translate(-33.74 195.62) rotate(-44.7)"
								/>
								<rect
									fill="#808285"
									x="237.33"
									y="125.77"
									width="3.51"
									height="23.61"
									transform="translate(-23.74 221.32) rotate(-47.59)"
								/>
								<rect
									fill="#808285"
									x="208.71"
									y="111.99"
									width="27.74"
									height="3.52"
									transform="translate(3.54 234.18) rotate(-55.87)"
								/>
								<rect
									fill="#808285"
									x="235.42"
									y="100.13"
									width="3.52"
									height="23.73"
									transform="matrix(0.82, -0.57, 0.57, 0.82, -21.33, 156.39)"
								/>
								<rect
									fill="#808285"
									x="196.21"
									y="220.6"
									width="32.2"
									height="3.52"
									transform="translate(-43.82 52.31) rotate(-12.74)"
								/>
								<rect
									fill="#808285"
									x="241.48"
									y="206.73"
									width="3.51"
									height="31.25"
									transform="translate(-28.59 408.69) rotate(-76.86)"
								/>
								<rect
									fill="#414042"
									x="139.69"
									y="144.16"
									width="177.46"
									height="9.61"
									transform="translate(74.52 374.1) rotate(-88.75)"
								/>
								<path
									fill="#414042"
									d="M233,239.58l-13.13-.28,4-180.94,13.12.29Zm-9.54-3.72,6.1.13,3.79-173.91-6.1-.13Z"
								/>
								<path
									fill="#8ec73f"
									d="M136.68,266.55l-21.09-7V178.09s-15.82-2.93-16.41-25.19c0-4.29,0-8.59,0-12.88,0-8.48-1.68-19.13,3.1-26.72,1.89-3,5.9-8.81,9.66-5.68,7,5.79,6,16.65,6,24.75,0,4.47,0,8.94,0,13.41,0,1.54-.72,5.11,0,6.54,0,0,4.1,8.2,7,0,0,0,2.34-74.87,2.34-75,.09-2.79,4.42-9,6.88-10,8.1-3,9.63,10.46,9.88,14.92.41,7.51.28,15,.23,22.56-.13,18,0,36,0,54.07,0,.63-.12,12.73,0,12.74s12.3.58,15.23-17.58c0-6.08.14-12.17,0-18.25-.15-7.12-3-16.24,4-21.18,1.74-1.22,4.12-2.35,6.26-1.67,2.62.82,6.81,6.83,6.68,9.47-.68,14.55-1.67,29.13-2.17,43.67-.56,16.51-19.65,34.43-36.49,29.56Z"
								/>
								<path
									fill="#698f3c"
									d="M80.44,243.11l8.64,3.66-.38-38.32s6.19-1.15,6.42-9.87c.09-3.39,1-9.22,0-12.39,0,0-4.13-12.86-7.34,0v12.16s-1.61,3.21-2.75,0q-.32-9.66-.6-19.32c-.1-3.05,1.33-12.74-3-13.92-7.51-2-2.44,40.74-4,40.82,0,0-4.82.22-6-6.89-.62-3.89,1.67-11.17-.4-14.44a3.41,3.41,0,0,0-6.25,2c.4,8.5-.7,33.28,15.15,28.69Z"
								/>
								<path
									fill="#ffffff"
									d="M182.37,281.78c-92.06,0-167-61.23-167-136.5S90.31,8.79,182.37,8.79s167,61.23,167,136.49S274.43,281.78,182.37,281.78Zm0-262.45C96.12,19.33,26,75.83,26,145.28s70.17,126,156.42,126,156.42-56.5,156.42-126S268.62,19.33,182.37,19.33Z"
								/>
								<rect
									fill="#808285"
									x="143.39"
									y="164.76"
									width="171.39"
									height="3.52"
									transform="translate(57.95 392.19) rotate(-88.84)"
								/>
								<rect
									fill="#808285"
									x="132.4"
									y="153.12"
									width="155.23"
									height="3.51"
									transform="translate(21.16 334.95) rotate(-80.04)"
								/>
								<rect
									fill="#808285"
									x="247.32"
									y="80.1"
									width="3.51"
									height="156.59"
									transform="translate(-19.41 35.75) rotate(-7.9)"
								/>
								<rect
									fill="#808285"
									x="211.06"
									y="216.36"
									width="3.52"
									height="34.09"
									transform="translate(-96.01 299.74) rotate(-59.76)"
								/>
								<rect
									fill="#808285"
									x="225.58"
									y="232.19"
									width="34.84"
									height="3.51"
									transform="translate(-80.51 138.43) rotate(-27.46)"
								/>
								<rect
									fill="#808285"
									x="226.48"
									y="213.52"
									width="31.06"
									height="3.52"
									transform="translate(-68.62 123.49) rotate(-25.19)"
								/>
								<rect
									fill="#808285"
									x="213.03"
									y="197.52"
									width="3.52"
									height="31.48"
									transform="translate(-81.31 276) rotate(-56.76)"
								/>
								<rect
									fill="#808285"
									x="214.55"
									y="182.76"
									width="3.52"
									height="28.46"
									transform="translate(-66.05 273.56) rotate(-57.5)"
								/>
								<rect
									fill="#808285"
									x="226.16"
									y="195.23"
									width="29.37"
									height="3.52"
									transform="translate(-67.39 154.54) rotate(-31.44)"
								/>
								<rect
									fill="#808285"
									x="216.65"
									y="163.5"
									width="3.51"
									height="24.32"
									transform="translate(-40.19 283.77) rotate(-61.5)"
								/>
								<rect
									fill="#808285"
									x="227.63"
									y="173.9"
									width="24.51"
									height="3.51"
									transform="translate(-54.55 134.34) rotate(-28.23)"
								/>
								<rect
									fill="#808285"
									x="225.32"
									y="151.47"
									width="25.11"
									height="3.52"
									transform="translate(-43.98 178.14) rotate(-37.84)"
								/>
								<rect
									fill="#808285"
									x="218.73"
									y="142.46"
									width="3.52"
									height="21.52"
									transform="translate(-32.47 243.26) rotate(-54.39)"
								/>
								<rect
									fill="#808285"
									x="221.55"
									y="119.72"
									width="3.52"
									height="17.65"
									transform="translate(-2.58 252.5) rotate(-58.68)"
								/>
								<rect
									fill="#808285"
									x="227.77"
									y="125.66"
									width="18.23"
									height="3.52"
									transform="translate(-27.56 176.61) rotate(-38.81)"
								/>
								<rect
									fill="#808285"
									x="223.43"
									y="96.32"
									width="3.52"
									height="11.25"
									transform="translate(43.79 269.86) rotate(-67.15)"
								/>
								<rect
									fill="#808285"
									x="228.05"
									y="100.52"
									width="13.46"
									height="3.51"
									transform="translate(-19.09 68.62) rotate(-15.99)"
								/>
								<rect
									fill="#808285"
									x="217.55"
									y="69.42"
									width="26.59"
									height="11.42"
								/>
								<path
									fill="#808285"
									d="M245.9,82.6H215.8V67.66h30.1Zm-26.59-3.51h23.07V71.18H219.31Z"
								/>
							</g>
						</g>
					</svg>
				</div>
				<div className="flex flex-col justify-center items-center m-0 w-full">
					<p className="logo-top">DESERT</p>
					<p className="logo-bottom">DRILLING SUPPLY</p>
				</div>
			</Link>
		</div>
	);
}
