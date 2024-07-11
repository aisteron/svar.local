import { load_toast, qs, qsa } from "../libs"

export function Pages(){
	
	// слайдер на главной
	index_page_swiper()

	// слайдер на странице продукта
	prod_page_swiper()

	// открытие / закрытие формы заказа
	dialog_open_close()

	// отправка формы
	dialog_form_send()
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
		
		await new Promise(resolve => setTimeout(()=>resolve(), 100))
		
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

function dialog_form_send(){
	let form = qs('#formOrder form')

	// prefill form on dev mode 
	if(process.env.NODE_ENV == 'development'){
		qs('[name="name"]',form).value = 'name'
		qs('[name="phone"]',form).value = '666'
		qs('[name="email"]',form).value = 'test@email.net'
		qs('[name="message"]',form).value = 'message from textarea'
	}

	
	
	form?.listen("submit",async e => {
		e.preventDefault()

		let obj = {
			name: qs('[name="name"]',form).value,
			phone: qs('[name="phone"]',form).value,
			email: qs('[name="email"]',form).value,
			message: qs('[name="message"]',form).value,
			action: 'callback'
		}
		
		let path = process.env.NODE_ENV == 'development' ? 'http://test.local/api.php' : '/api/'

		let response = await fetch(path,{
			method:'POST',
			headers: { "Content-Type": "application/json"},
			body: JSON.stringify(obj),
		})

		if(!response.ok){
			await load_toast()
			new Snackbar('Ошибка сервера');
			return;
		}

		try {
			response = await response.json()
		} catch(e){
			console.log(e)
			await load_toast()
			new Snackbar('Ошибка сервера. Чтение json');
			return;

		}

		if(response.success){
			await load_toast()
			new Snackbar('Успешно отправлено!');
			form.reset()
		} else {
			await load_toast()
			new Snackbar(response.message || 'Ошибка сервера undefined');
		}


	})
}