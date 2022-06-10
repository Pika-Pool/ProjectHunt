import classNames from 'classnames';
import type { ImgHTMLAttributes } from 'react';
import { FaTimes } from 'react-icons/fa';
import Slider, { Settings as SliderSettings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import fileListToObjectURL from '../lib/fileListToObjectUrl';
import { isBrowserFile } from '../lib/typeGuards/FileAndFileList';

const defaultSliderSettings: SliderSettings = {
	dots: false,
	infinite: false,
	speed: 200,
	lazyLoad: 'progressive',
	variableWidth: true,
	cssEase: 'ease',
	adaptiveHeight: true,
};

type CarouselImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
	src: string | File;
	imageId?: string | number;
};
interface ScreenShotCarouselProps extends SliderSettings {
	images: CarouselImageProps[];
	onImgDelete?: (src: string | File) => void;
}

export default function ScreenShotCarousel({
	images: imgProps,
	onImgDelete,
	...sliderSettings
}: ScreenShotCarouselProps) {
	return (
		<div className='bg-gray-200'>
			<Slider {...defaultSliderSettings} {...sliderSettings}>
				{imgProps.map(({ className, src, alt, imageId, ...props }, index) => {
					const srcToUse = isBrowserFile(src) ? fileListToObjectURL(src) : src;

					if (srcToUse === '') return null;
					return (
						<div
							key={imageId ?? srcToUse}
							className='h-[220px] ml-2 rounded mt-2 group relative'
						>
							<button
								className='hidden group-hover:flex absolute top-1 left-3 w-8 h-8 rounded-full bg-gray-900 justify-center items-center'
								title='delete'
								type='button'
								onClick={() => onImgDelete?.(src)}
							>
								<FaTimes className='text-red-500' size='1.5rem' />
							</button>

							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								className={classNames('h-full rounded', className)}
								src={srcToUse}
								alt={alt || `carousel-img-${index}`}
								{...props}
							/>
						</div>
					);
				})}
			</Slider>

			<style jsx global>{`
				.slick-list {
					min-height: calc(220px + 1rem); // py-[0.5rem]
				}

				.slick-arrow.slick-prev:before,
				.slick-arrow.slick-next:before {
					color: black !important;
				}
			`}</style>
		</div>
	);
}
