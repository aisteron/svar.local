import { qs, qsa } from "../libs"

export function Pages(){
	
	// слайдер на главной
	index_page_swiper()

	// слайдер на странице продукта
	prod_page_swiper()

	// открытие / закрытие формы заказа
	dialog_open_close()
}

function index_page_swiper(){
	const iswiper = qs('.index.swiper')
	if(!iswiper) return

	document.listen('swiper_loaded', async e => {
		
		await new Promise(resolve => setTimeout(()=>resolve(), 2000))
		
		qsa('.index.swiper .swiper-slide.hidden').forEach(el=> el.classList.remove('hidden'))
		
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

function prod_page_swiper(){
	const iswiper = qs('.prod.swiper')
	if(!iswiper) return

	document.listen('swiper_loaded', async e => {
		
		await new Promise(resolve => setTimeout(()=>resolve(), 2000))
		
		qsa('.prod.swiper .swiper-slide.hidden').forEach(el=> el.classList.remove('hidden'))
		
		const options = {
			spaceBetween: 30,
			navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
			pagination: {
        el: ".swiper-pagination",
      }
			
		}
		new Swiper(iswiper, options)
	})
}

function dialog_open_close(){
	const arr = []
	const dialog = qs('dialog#formOrder')
	
	qs('.index-page') && arr.push(qs('.content button.Primary'))
	qs('.prod-page') && arr.push(qs('.row .Primary'))

	qsa('.orderModal').forEach(el => arr.push(el))

	arr.forEach(el => {
		el?.listen("click", e => {
			dialog.showModal()
		})
	})

	// close
	qs('.close', dialog).listen("click", e => dialog.close())
}