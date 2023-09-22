const mainDivElement = document.getElementById("ft_list");
let divCount = 1;

function loadCookie() {
    const cookies = document.cookie.split(';');
    let ftListCookie = null;

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith('ft_list=')) {
            ftListCookie = cookie;
            break;
        }
    }

    if (ftListCookie) {
        const ftListValue = decodeURIComponent(ftListCookie.substring('ft_list='.length));
        mainDivElement.innerHTML = ftListValue;

        const listItems = mainDivElement.getElementsByTagName('li');
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].addEventListener("click", function() {
                const todoDivName = listItems[i].innerHTML;
                const shouldDelete = confirm(`Delete the current to-do list [${todoDivName}]?`);

                if (shouldDelete) {
                    mainDivElement.removeChild(listItems[i]);
                    if (mainDivElement.innerHTML.trim() === '') {
                        document.cookie = 'ft_list=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                    } else {
                        document.cookie = `ft_list=${encodeURIComponent(mainDivElement.innerHTML)};`;
                    }
                }
            });
        }
    }
}
loadCookie();

function createTask() {
    const todoDiv = document.createElement("li");
    const todoInput = window.prompt("Add ? to ft_list/to-do list");

    if (todoInput == null || todoInput === ''){
        return
    }

    todoDiv.innerHTML = todoInput;

    todoDiv.addEventListener("click", function() {
        const todoDivName = todoDiv.innerHTML
        const shouldDelete = confirm(`Delete the current to-do list [${todoDivName}]?`);

        if (shouldDelete) {
            mainDivElement.removeChild(todoDiv);
            if (mainDivElement.innerHTML.trim() === '') {
                document.cookie = 'ft_list=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            } else {
                document.cookie = `ft_list=${encodeURIComponent(mainDivElement.innerHTML)};`;
            }
        }
    });

    mainDivElement.prepend(todoDiv);
    document.cookie = `ft_list=${encodeURIComponent(mainDivElement.innerHTML)};`;
}