import { qs } from "../libs"

export function Ui(){
	
	// открытие / закрытие меню
	open_mobile_menu()
}

function open_mobile_menu(){
	let menu = qs('ul.nav.main')
	qs('#nav-icon1').listen("click", e => {
		e.target.classList.toggle('open')
		menu.classList.toggle('open')
		

	})
}