import createRouter from './router.js';
import createPages from './container.js';

const container = document.querySelector('main');

const pages = createPages(container);

const router = createRouter();

router.addRoute('/', pages.home)
    .addRoute('/list', pages.list)
    .addRoute('/list/:id', pages.detail)
    .setNotFound(pages.notFound)
    .start();

const NAV_BTN_SELECTOR = 'a[data-navigate]'

document
    .body
    .addEventListener('click', e => {
        const { target } = e
        if (target.matches(NAV_BTN_SELECTOR)) {
            e.preventDefault();
            router.navigate(target.href)
        }
    })