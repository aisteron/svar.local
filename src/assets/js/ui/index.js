import { qs, qsa } from "../libs"

export function Ui(){
	
	// открытие / закрытие меню
	open_mobile_menu()

	// красим пункт меню "Услуги" для Hugo
	colorize_service_menu_item()
}

function open_mobile_menu(){
	let menu = qs('ul.nav.main')
	qs('#nav-icon1').listen("click", e => {
		e.target.classList.toggle('open')
		menu.classList.toggle('open')
		

	})
}


function colorize_service_menu_item(){
	if(!qs('.services-page')) return

	qsa('.nav.main li a').forEach(a => {
		a.innerHTML == 'Услуги' && a.closest('li').classList.add('active')
	})

}