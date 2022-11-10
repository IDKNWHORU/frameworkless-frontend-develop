export default container => {
    const home = () => {
        container.textContent = 'This is Home Page';
    }

    const list = () => {
        container.textContent = 'This is List Page';
    }

    const notFound = () => {
        container.textContent = 'Page Not Found!';
    }

    const detail = (params) => {
        const { id } = params;
        container.textContent = `This is Detail Page with ID ${id}`
    }
    return {
        home,
        list,
        notFound,
        detail
    }
}