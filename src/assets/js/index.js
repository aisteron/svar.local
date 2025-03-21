import { load_toast, sw } from "./libs";
import { Ui } from "./ui";
import { Pages } from "./pages";

document.readyState !== 'loading' ? init() : document.addEventListener('DOMContentLoaded', init);

function init(){
	Ui()
	Pages()
	bootstrap()

}

async function bootstrap(){
	await load_toast()
	await sw.load()
}