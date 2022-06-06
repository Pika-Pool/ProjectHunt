import classNames from 'classnames';
import type { ImgHTMLAttributes } from 'react';
import Slider, { Settings as SliderSettings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const defaultSliderSettings: SliderSettings = {
	dots: false,
	infinite: false,
	speed: 200,
	lazyLoad: 'progressive',
	variableWidth: true,
	cssEase: 'ease',
};

interface ScreenShotCarouselProps extends SliderSettings {
	images: (ImgHTMLAttributes<HTMLImageElement> & {
		alt: string;
		src: string;
	})[];
}

export default function ScreenShotCarousel({
	images: imgProps,
	...sliderSettings
}: ScreenShotCarouselProps) {
	return (
		<Slider {...defaultSliderSettings} {...sliderSettings}>
			{imgProps.map(({ className, ...imgProps }) => (
				<div key={imgProps.src} className='h-[220px] pl-2 rounded'>
					{/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
					<img
						className={classNames('h-full rounded', className)}
						{...imgProps}
					/>
				</div>
			))}
		</Slider>
	);
}
