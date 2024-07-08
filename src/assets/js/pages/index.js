import { qs } from "../libs"

export function Pages(){
	
	// слайдер на главной
	index_page_swiper()
}

function index_page_swiper(){
	const iswiper = qs('.index.swiper')
	if(!iswiper) return

	document.listen('swiper_loaded', e => {
		const options = {
			spaceBetween: 30,
			centeredSlides: true,
			effect: "fade",
			fadeEffect: {
				crossFade: true
			},
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			speed: 4000,
		}
		new Swiper(iswiper, options)
	})
	
}